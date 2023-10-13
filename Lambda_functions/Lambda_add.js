
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";


const dynamoDBClient = new DynamoDBClient({ region: "eu-central-1" });
const tableName = "users";

export const handler = async (event) => {
  const { name, email, address,tel } = JSON.parse(event.body);

  
  function generateUniqueUserID() {
  const timestamp = Date.now().toString(36); 
  const randomChars = Math.random().toString(36).substring(2, 8); 
  return timestamp + randomChars;
}
const userId = generateUniqueUserID();

  const params = {
    TableName: tableName,
    Item: {
      "userId": { S: userId },
      "Name": { S: name },
      "Email": { S: email },
      "Address": { S: address },
      "Tel": { S: tel },
    },
  };

  try {
    const command = new PutItemCommand(params);
    await dynamoDBClient.send(command);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "User added successfully" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error adding user", error: error.message }),
    };
  }
};
