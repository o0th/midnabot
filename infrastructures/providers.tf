terraform {
  backend "http" {}

  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "2.8.0"
    }
  }
}

provider "digitalocean" {
  token = var.digitalocean_token
}
