import { Client, Account } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://nyc.cloud.appwrite.io/v1") // NYC REGION
  .setProject("68754cd8000c46bd6c80"); // Project ID bạn đã cung cấp

export const account = new Account(client);
