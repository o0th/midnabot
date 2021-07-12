terraform {
  backend "remote" {
    organization = "o0th"

    workspaces {
      name = "midnabot"
    }
  }
}

provider "kubernetes" {
  config_path = "~/.kube/config"
}

resource "kubernetes_namespace" "this" {
  metadata {
    name = "midnabot"
  }
}

resource "kubernetes_secret" "this" {
  metadata {
    name      = "midnabot"
    namespace = kubernetes_namespace.this.metadata[0].name
  }

  type = "kubernetes.io/dockerconfigjson"

  data = {
    ".dockerconfigjson" = file("${path.module}/auth.json")
  }
}

resource "kubernetes_deployment" "this" {
  metadata {
    name      = "midnabot"
    namespace = kubernetes_namespace.this.metadata[0].name
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        "app" = "midnabot"
      }
    }

    template {
      metadata {
        labels = {
          "app" = "midnabot"
        }
      }

      spec {
        container {
          name  = "midnabot"
          image = var.image

          env {
            name  = "NODE_ENV"
            value = var.node_env
          }

          env {
            name  = "SERVICE_PORT"
            value = var.service_port
          }

          env {
            name  = "SERVICE_URL"
            value = var.service_url
          }

          env {
            name  = "TELEGRAM_TOKEN"
            value = var.telegram_token
          }

          port {
            name           = "https"
            container_port = var.service_port
          }
        }

        image_pull_secrets {
          name = kubernetes_secret.this.metadata[0].name
        }
      }
    }
  }
}

resource "kubernetes_service" "this" {
  metadata {
    name      = "midnabot"
    namespace = kubernetes_namespace.this.metadata[0].name

    labels = {
      "app" = "midnabot"
    }
  }

  spec {
    selector = {
      "app" = "midnabot"
    }

    port {
      name = "https"
      port = var.service_port
    }
  }
}

