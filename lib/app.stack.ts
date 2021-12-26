/**
 * App AWS CDK stack.
 */

// External imports.
import { Stack, StackProps, App } from "aws-cdk-lib"
import { Function, Runtime, Code } from "aws-cdk-lib/aws-lambda"
import { LambdaRestApi } from "aws-cdk-lib/aws-apigateway"

/**
 * The App stack.
 */
interface AppStackProps extends StackProps {
  codeZipLocation?: string
}
export class AppStack extends Stack {
  constructor(scope: App, id: string, props?: AppStackProps) {
    super(scope, id, props)

    // The AWS Lambda function.
    const handler = new Function(this, "Function", {
      runtime: Runtime.NODEJS_14_X,
      code: Code.fromAsset(props?.codeZipLocation ?? "out/function.zip"),
      handler: "handler.handler",
    })

    // The AWS API Gateway for the function.
    new LambdaRestApi(this, "Endpoint", {
      handler,
    })
  }
}
