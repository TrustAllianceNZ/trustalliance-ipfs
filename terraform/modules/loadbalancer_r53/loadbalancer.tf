
locals {
  targetGroupSettings = {
    "80" : { port : "80", listenerPort : "443" },
    "5001" : { port : "5001", listenerPort : "5001" },
  }

}

resource "aws_security_group" "aws_sg_lb" {
  name = "${var.load_balancer_name} SG: 80 5001"

  ingress {
    description = "80 from the internet"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "5001 from the internet"
    from_port   = 5001
    to_port     = 5001
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

}


resource "aws_lb" "main" {
  name = var.load_balancer_name

  internal           = false
  load_balancer_type = "application"
  subnets            = ["subnet-ea47828c", "subnet-ece91fa4", "subnet-cd384f95"]

  security_groups = [aws_security_group.aws_sg_lb.id]
}

resource "aws_lb_target_group" "targetGroups" {

  for_each = local.targetGroupSettings
  name     = "${var.load_balancer_name}TG${each.value.port}"
  port     = each.value.port
  protocol = "HTTP"
  vpc_id   = "vpc-fa9f829d"

  health_check {
    enabled = true
    port    = 80
    path    = "/status"
  }
}


resource "aws_lb_listener" "listners" {

  for_each = {
    for tg in aws_lb_target_group.targetGroups : tg.name => {
      arn : tg.arn
      port : tg.port == 80 ? 443 : tg.port
    }
  }

  load_balancer_arn = aws_lb.main.arn
  port              = each.value.port
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-2016-08"
  certificate_arn   = var.certificate_arn

  default_action {
    type             = "forward"
    target_group_arn = each.value.arn
  }
}

output "targetGroups" {
  value = {
    for tg in aws_lb_target_group.targetGroups : tg.name => {
      arn : tg.arn
    }
  }
}
