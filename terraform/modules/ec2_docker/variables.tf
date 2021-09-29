variable "name" {
  type = string
}
variable "repo" {
  type = string
}

variable "key_name" {
  type    = string
  default = "ec2_key"
}

variable "git_token" {
  type    = string
}

variable "branch_name" {
  type = string
}

variable "cloud_watch_name" {
  type = string
}

variable "target_group_arn" {
  type = string
}
