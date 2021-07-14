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
    ".dockerconfigjson" = file("${path.module}/secrets/docker-registry.json")
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

          image_pull_policy = "Always"

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

resource "kubernetes_secret" "cert" {
  metadata {
    name      = "cert"
    namespace = kubernetes_namespace.this.metadata[0].name
  }

  type = "kubernetes.io/tls"

  data = {
    "tls.crt" = file("${path.module}/secrets/tls.crt")
    "tls.key" = file("${path.module}/secrets/tls.key")
  }
}

resource "kubernetes_ingress" "this" {
  wait_for_load_balancer = true

  metadata {
    name      = "midnabot"
    namespace = kubernetes_namespace.this.metadata[0].name
    annotations = {
      "kubernetes.io/ingress.class"                 = "public"
      "nginx.ingress.kubernetes.io/proxy-body-size" = "1024m"
    }
  }

  spec {
    tls {
      hosts       = ["midnabot.o0th.io"]
      secret_name = kubernetes_secret.cert.metadata[0].name
    }

    rule {
      host = "midnabot.o0th.io"
      http {
        path {
          path = "/"
          backend {
            service_name = "midnabot"
            service_port = var.service_port
          }
        }
      }
    }
  }
}

