import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb";

const dynamoDBClient = new DynamoDBClient({ region: "eu-central-1" });
const tableName = "users";

export const handler = async (event) => {
  const name = event.pathParameters.name; 

  const params = {
  TableName: tableName,
  IndexName: "NameIndex",
  KeyConditionExpression: "#name = :name",
  ExpressionAttributeNames: {
    "#name": "Name",
  },
  ExpressionAttributeValues: {
    ":name": { S: name },
  },
};



  try {
    const command = new QueryCommand(params);
    const { Items } = await dynamoDBClient.send(command);

    if (Items) {
      return {
        statusCode: 200,
        body: JSON.stringify(Items),
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "User not found" }),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error fetching user", error: error.message }),
    };
  }
};
