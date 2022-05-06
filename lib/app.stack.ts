/**
 * App AWS CDK stack.
 */

// External imports.
import { Stack, StackProps } from "aws-cdk-lib"
import { Construct } from "constructs"
import { Function, Runtime, Code } from "aws-cdk-lib/aws-lambda"
import { LambdaRestApi } from "aws-cdk-lib/aws-apigateway"
import {
  Attribute,
  AttributeType,
  BillingMode,
  GlobalSecondaryIndexProps,
  LocalSecondaryIndexProps,
  ProjectionType,
  Table,
} from "aws-cdk-lib/aws-dynamodb"
import {
  AttributeDefinition,
  GlobalSecondaryIndex,
  KeySchemaElement,
  LocalSecondaryIndex,
} from "@aws-sdk/client-dynamodb"

// Utility imports.
import { BaseTable } from "@utils/tables"

/**
 * The App stack.
 */
interface AppStackProps extends StackProps {
  codeZipLocation?: string
}
export class AppStack extends Stack {
  constructor(scope: Construct, id: string, props?: AppStackProps) {
    super(scope, id, props)

    // The DynamoDB Table.
    const table = new Table(this, "Table", {
      partitionKey: sdkToCdk({
        attributeDefinitions: BaseTable.options.AttributeDefinitions,
        keySchema: BaseTable.options.KeySchema,
        type: "HASH",
      }),
      sortKey: sdkToCdk({
        attributeDefinitions: BaseTable.options.AttributeDefinitions,
        keySchema: BaseTable.options.KeySchema,
        type: "RANGE",
      }),
      billingMode:
        BaseTable.options.BillingMode === "PROVISIONED"
          ? BillingMode.PROVISIONED
          : BillingMode.PAY_PER_REQUEST,
      readCapacity: BaseTable.options.ProvisionedThroughput?.ReadCapacityUnits,
      writeCapacity:
        BaseTable.options.ProvisionedThroughput?.WriteCapacityUnits,
    })
    // Add all Global Secondary Indexes.
    for (const gsi of sdkGlobalSecondaryIndexesToCdk({
      attributeDefinitions: BaseTable.options.AttributeDefinitions,
      indexes: BaseTable.options.GlobalSecondaryIndexes,
    })) {
      table.addGlobalSecondaryIndex(gsi)
    }
    // Add all Local Secondary Indexes.
    for (const lsi of sdkLocalSecondaryIndexesToCdk({
      attributeDefinitions: BaseTable.options.AttributeDefinitions,
      indexes: BaseTable.options.LocalSecondaryIndexes,
    })) {
      table.addLocalSecondaryIndex(lsi)
    }

    // The AWS Lambda function.
    const handler = new Function(this, "Function", {
      runtime: Runtime.NODEJS_14_X,
      code: Code.fromAsset(props?.codeZipLocation ?? "out/function.zip"),
      handler: "handler.handler",
      environment: {
        NODE_ENV: "production",
        DDB_TABLE_NAME: table.tableName,
        DDB_REGION: this.region,
      },
    })

    // Give the AWS Lambda function full access to the DynamoDB Table.
    table.grantFullAccess(handler)

    // The AWS API Gateway for the function.
    new LambdaRestApi(this, "Endpoint", {
      handler,
    })
  }
}

/**
 * Convert an SDK DynamoDB key to a CDK DynamoDB key.
 */
function sdkToCdk(input: {
  attributeDefinitions?: AttributeDefinition[]
  keySchema?: KeySchemaElement[]
  type: "HASH"
}): Attribute
function sdkToCdk(input: {
  attributeDefinitions?: AttributeDefinition[]
  keySchema?: KeySchemaElement[]
  type: "RANGE"
}): Attribute | undefined
function sdkToCdk(input: {
  attributeDefinitions?: AttributeDefinition[]
  keySchema?: KeySchemaElement[]
  type: "HASH" | "RANGE"
}): Attribute | undefined {
  const name = input.keySchema?.find(
    (x) => x.KeyType === input.type,
  )?.AttributeName
  const keyTypeString = input.attributeDefinitions?.find(
    (x) => x.AttributeName === name,
  )?.AttributeType
  let keyType: AttributeType | undefined
  if (keyTypeString === "S") {
    keyType = AttributeType.STRING
  } else if (keyTypeString === "N") {
    keyType = AttributeType.NUMBER
  } else if (keyTypeString === "B") {
    keyType = AttributeType.BINARY
  }
  if (input.type === "HASH") {
    if (!name || !keyType) {
      throw new Error("Missing key in table definition.")
    }
    return { name, type: keyType }
  } else {
    if (!name || !keyType) {
      return undefined
    }
    return { name, type: keyType }
  }
}

/**
 * List SDK Global Secondary Indexes in a CDK format.
 */
function sdkGlobalSecondaryIndexesToCdk(input: {
  attributeDefinitions?: AttributeDefinition[]
  indexes?: GlobalSecondaryIndex[]
}): GlobalSecondaryIndexProps[] {
  const results: GlobalSecondaryIndexProps[] = []
  for (const index of input.indexes || []) {
    const indexName = index.IndexName
    if (!indexName) continue
    const projectionTypeString = index.Projection?.ProjectionType
    let projectionType: ProjectionType
    if (projectionTypeString === "ALL") {
      projectionType = ProjectionType.ALL
    } else if (projectionTypeString === "KEYS_ONLY") {
      projectionType = ProjectionType.KEYS_ONLY
    } else if (projectionTypeString === "INCLUDE") {
      projectionType = ProjectionType.INCLUDE
    } else {
      continue
    }
    results.push({
      indexName,
      partitionKey: sdkToCdk({
        attributeDefinitions: input.attributeDefinitions,
        keySchema: index.KeySchema,
        type: "HASH",
      }),
      sortKey: sdkToCdk({
        attributeDefinitions: input.attributeDefinitions,
        keySchema: index.KeySchema,
        type: "RANGE",
      }),
      projectionType,
      nonKeyAttributes: index.Projection?.NonKeyAttributes,
      readCapacity: index.ProvisionedThroughput?.ReadCapacityUnits,
      writeCapacity: index.ProvisionedThroughput?.WriteCapacityUnits,
    })
  }
  return results
}

/**
 * List SDK Local Secondary Indexes in a CDK format.
 */
function sdkLocalSecondaryIndexesToCdk(input: {
  attributeDefinitions?: AttributeDefinition[]
  indexes?: LocalSecondaryIndex[]
}): LocalSecondaryIndexProps[] {
  const results: LocalSecondaryIndexProps[] = []
  for (const index of input.indexes || []) {
    const indexName = index.IndexName
    if (!indexName) continue
    const projectionTypeString = index.Projection?.ProjectionType
    let projectionType: ProjectionType
    if (projectionTypeString === "ALL") {
      projectionType = ProjectionType.ALL
    } else if (projectionTypeString === "KEYS_ONLY") {
      projectionType = ProjectionType.KEYS_ONLY
    } else if (projectionTypeString === "INCLUDE") {
      projectionType = ProjectionType.INCLUDE
    } else {
      continue
    }
    const sortKey = sdkToCdk({
      attributeDefinitions: input.attributeDefinitions,
      keySchema: index.KeySchema,
      type: "RANGE",
    })
    if (!sortKey) continue
    results.push({
      indexName,
      sortKey,
      projectionType,
      nonKeyAttributes: index.Projection?.NonKeyAttributes,
    })
  }
  return results
}
