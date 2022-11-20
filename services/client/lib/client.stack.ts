import * as s3 from "aws-cdk-lib/aws-s3"
import * as s3deployment from "aws-cdk-lib/aws-s3-deployment"
import { Construct } from "constructs"

interface ClientConstructProps {
  zipFile: string
}
export class ClientConstruct extends Construct {
  bucket: s3.Bucket
  deployment: s3deployment.BucketDeployment
  constructor(scope: Construct, id: string, { zipFile }: ClientConstructProps) {
    super(scope, id)

    // Create the bucket
    this.bucket = new s3.Bucket(this, "ClientBucket", {
      publicReadAccess: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
    })

    // Create the bucket deployment
    this.deployment = new s3deployment.BucketDeployment(
      this,
      "ClientDeployment",
      {
        destinationBucket: this.bucket,
        sources: [s3deployment.Source.asset(zipFile)],
      }
    )
  }
}
