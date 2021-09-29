data "aws_iam_policy_document" "aws_iam_policy_document_doc" {
  statement {
    sid    = ""
    effect = "Allow"

    resources = ["*"]

    actions = [
      "ecr:GetAuthorizationToken",
      "ecr:BatchCheckLayerAvailability",
      "ecr:GetDownloadUrlForLayer",
      "ecr:GetRepositoryPolicy",
      "ecr:DescribeRepositories",
      "ecr:ListImages",
      "ecr:DescribeImages",
      "ecr:BatchGetImage",
      "ecr:GetLifecyclePolicy",
      "ecr:GetLifecyclePolicyPreview",
      "ecr:ListTagsForResource",
      "ecr:DescribeImageScanFindings"
    ]
  }

  statement {
    effect = "Allow"

    resources = ["*"]

    actions = [
      "cloudwatch:PutMetricData",
      "ec2:DescribeVolumes",
      "ec2:DescribeTags",
      "logs:PutLogEvents",
      "logs:DescribeLogStreams",
      "logs:DescribeLogGroups",
      "logs:CreateLogStream",
      "logs:CreateLogGroup"
    ]
  }
  
  statement {
    effect = "Allow"

    resources = ["arn:aws:ssm:*:*:parameter/AmazonCloudWatch-*"]

    actions = [
      "ssm:GetParameter"
    ]
  }

  statement {
    effect = "Allow"

    resources = ["*"]

    actions = [
      "s3:*"
    ]
  }
  

}

data "aws_iam_policy_document" "data_aws_iam_policy_doc" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ec2.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "aws_iam_role" {
  name = "aws_iam_role-${var.name}"

  assume_role_policy = data.aws_iam_policy_document.data_aws_iam_policy_doc.json
}

resource "aws_iam_instance_profile" "aws_iam_instance_profile" {
  name = "aws_iam_instance_profile-${var.name}"
  role = aws_iam_role.aws_iam_role.id
}

resource "aws_iam_role_policy" "aws_iam_role_policy" {
  name = "aws_iam_role_policy-${var.name}"
  role = aws_iam_role.aws_iam_role.id

  policy = data.aws_iam_policy_document.aws_iam_policy_document_doc.json
}
