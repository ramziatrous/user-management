import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";

const dynamoDBClient = new DynamoDBClient({ region: "eu-central-1" });
const tableName = "users";

export const handler = async (event) => {
  const params = {
    TableName: tableName,
  };

  try {
    const command = new ScanCommand(params);
    const { Items } = await dynamoDBClient.send(command);

    return {
      statusCode: 200,
      body: JSON.stringify(Items),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error fetching users", error: error.message }),
    };
  }
};
