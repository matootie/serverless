#!/usr/bin/env node
import * as cdk from "aws-cdk-lib"
import { CdkStack } from "../lib/cdk.stack"

const app = new cdk.App()
new CdkStack(app, "ServerlessDemoStack", {
  description:
    "This stack is used to demonstrate a full stack web application deployed to a serverless AWS environment",
  env: {
    region: "us-east-1",
  },
})
