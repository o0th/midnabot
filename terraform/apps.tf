resource "digitalocean_app" "midnabot" {
  spec {
    name   = "midnabot"
    region = "fra"

    service {
      name             = "midnabot-service"
      environment_slug = "node-js"

      instance_count     = 1
      instance_size_slug = "basic-xxs"

      run_command = "npm start"
      http_port   = 3000

      env {
        key   = "NODE_ENV"
        value = "production"
        scope = "RUN_TIME"
      }

      env {
        key   = "SERVICE_PORT"
        value = "$${_self.PRIVATE_PORT}"
        scope = "RUN_TIME"
      }

      env {
        key   = "SERVICE_URL"
        value = "$${_self.PUBLIC_URL}"
        scope = "RUN_TIME"
      }

      env {
        key   = "TELEGRAM_TOKEN"
        value = var.telegram_token
        scope = "RUN_TIME"
      }

      github {
        repo   = "o0th/midnabot"
        branch = "master"

        deploy_on_push = true
      }

      health_check {
        failure_threshold     = 0
        initial_delay_seconds = 0
        period_seconds        = 0
        success_threshold     = 0
        timeout_seconds       = 0
      }
    }
  }
}
