resource "digitalocean_container_registry" "this" {
  name                   = "midnabot"
  subscription_tier_slug = "starter"
}
