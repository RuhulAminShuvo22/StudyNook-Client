

import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

// ✅ connect once
await client.connect();

const db = client.db("studynook");

export const auth = betterAuth({
  database: mongodbAdapter(db),

  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
        }, 
    },

  // trustedOrigins: ["http://localhost:3000"],

  // secret: process.env.BETTER_AUTH_SECRET,

  // baseURL: process.env.BETTER_AUTH_URL,
});


