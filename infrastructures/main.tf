resource "digitalocean_app" "midnabot" {
  spec {
    name   = "midnabot"
    region = "fra"

    service {
      name               = "midnabot"
      environment_slug   = "node-js"
      instance_size_slug = "basic-xxs"
      run_command        = "npm start"
      http_port          = 8080

      env {
        key   = "NODE_ENV"
        scope = "RUN_AND_BUILD_TIME"
        value = "production"
      }

      env {
        key   = "PORT"
        scope = "RUN_AND_BUILD_TIME"
        value = "$${midnabot.PRIVATE_PORT}"
      }

      env {
        key   = "PUBLIC_URL"
        scope = "RUN_AND_BUILD_TIME"
        value = "$${midnabot.PUBLIC_URL}"
      }

      env {
        key   = "TELEGRAM"
        scope = "RUN_AND_BUILD_TIME"
        value = var.telegram_token
        type  = "SECRET"
      }

      gitlab {
        repo           = "o0th/midnabot"
        branch         = "master"
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
