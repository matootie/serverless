/**
 * AWS Client utilities.
 */

// External imports.
import { DynamoDBClient, DynamoDBClientConfig } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb"

// Store DynamoDB configuration.
const config: DynamoDBClientConfig = {
  region: process.env.DDB_REGION || "ca-central-1",
}

// Export the table name to use in database request.
export const TableName = process.env.DDB_TABLE_NAME || "BaseTable"

// If working locally, setup config to connect to local DynamoDB instance.
if (process.env.NODE_ENV !== "production") {
  config.region = "localhost"
  config.credentials = {
    accessKeyId: "test",
    secretAccessKey: "test",
  }
  config.endpoint = process.env.DDB_ENDPOINT || "http://localhost:8000"
}

// Export DynamoDB client.
export const DynamoDB = new DynamoDBClient(config)

// Export DynamoDB document client.
export const DocumentDB = DynamoDBDocumentClient.from(DynamoDB, {
  marshallOptions: { removeUndefinedValues: true },
})
