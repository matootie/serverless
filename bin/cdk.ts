#!/usr/bin/env node
import { App } from "aws-cdk-lib"
import { AppStack } from "@lib/app.stack"

// Create the stack.
const app = new App()
new AppStack(app, "AppStack", {})
