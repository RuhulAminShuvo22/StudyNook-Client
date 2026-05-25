

// import dns from "node:dns";
// dns.setServers(["8.8.8.8", "8.8.4.4"]);

// import { betterAuth } from "better-auth";
// import { MongoClient } from "mongodb";
// import { mongodbAdapter } from "better-auth/adapters/mongodb";

// const client = new MongoClient(process.env.MONGODB_URI);

// // 🔥 IMPORTANT
// await client.connect();

// const db = client.db("studynook");

// export const auth = betterAuth({
//   database: mongodbAdapter(db, {
//     client,
//   }),

//   emailAndPassword: {
//     enabled: true,
//   },
// });

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

  trustedOrigins: ["http://localhost:3000"],

  secret: process.env.BETTER_AUTH_SECRET,

  baseURL: process.env.BETTER_AUTH_URL,
});


// import dns from "node:dns";
// dns.setServers(["8.8.8.8", "8.8.4.4"]);

// import { betterAuth } from "better-auth";
// import { MongoClient } from "mongodb";
// import { mongodbAdapter } from "better-auth/adapters/mongodb";

// const uri = process.env.MONGODB_URI;

// if (!uri) {
//   throw new Error("অনুগ্রহ করে .env.local ফাইলে MONGODB_URI যুক্ত করুন।");
// }

// // Next.js ডেভেলপমেন্ট মোডে বারবার কানেকশন তৈরি হওয়া রোধ করতে গ্লোবাল ক্যাশ ব্যবহার করা হয়েছে
// let client;
// let clientPromise;

// if (process.env.NODE_ENV === "development") {
//   if (!global._mongoClientPromise) {
//     client = new MongoClient(uri);
//     global._mongoClientPromise = client.connect();
//   }
//   clientPromise = global._mongoClientPromise;
// } else {
//   client = new MongoClient(uri);
//   clientPromise = client.connect();
// }

// // ডাটাবেজ কানেকশন নিশ্চিত করা
// const connectedClient = await clientPromise;
// const db = connectedClient.db("studynook");

// export const auth = betterAuth({
//   database: mongodbAdapter(db),

//   emailAndPassword: {
//     enabled: true,
//   },

//   trustedOrigins: ["http://localhost:3000"],
//   secret: process.env.BETTER_AUTH_SECRET,
//   baseURL: process.env.BETTER_AUTH_URL,
// });
