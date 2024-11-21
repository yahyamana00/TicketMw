import { Client, Account, Databases, Storage } from 'appwrite';

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
export const BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!;

export const COLLECTIONS = {
  USERS: 'users',
  TICKETS: 'tickets',
  COMMENTS: 'comments'
} as const;