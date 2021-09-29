module "demo-infra" {
  source = "../../modules/ec2_docker"

  name             = var.name
  branch_name      = var.branch_name
  repo             = var.repo
  git_token        = var.git_token
  cloud_watch_name = var.cloud_watch_name
  target_group_arn = var.target_group_arn

}

output "info" {
  value = module.demo-infra
}
