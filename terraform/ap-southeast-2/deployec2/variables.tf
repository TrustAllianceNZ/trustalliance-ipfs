
variable "branch_name" {
  type = string
}

variable "name" {
  type    = string
  default = "trackback-ipfs"
}

variable "repo" {
  type    = string
  default = "trackback-blockchain/trackback-ipfs.git"
}

variable "key_name" {
  type    = string
  default = "ec2_key"
}

variable "git_token" {
  type    = string
  default = "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"
}

variable "cloud_watch_name" {
  type    = string
  default = "trackback-ipfs"
}

variable "target_group_arn" {
  type    = string
  default = "arn:aws:elasticloadbalancing:ap-southeast-2:533545012068:targetgroup/Issuer-TA/9b1440c495d198c7"
}
