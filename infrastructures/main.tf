resource "digitalocean_container_registry" "this" {
  name                   = "midnabot"
  subscription_tier_slug = "starter"
}

resource "digitalocean_droplet" "this" {
  image  = "registry.digitalocean.com/midnabot/midnabot:0.0.1"
  name   = "midnabot"
  region = "fra1"
  size   = "s-1vcpu-1gb"
}

resource "digitalocean_app" "this" {
  spec {
    name   = "midnabot"
    region = "fra1"
  }

}
