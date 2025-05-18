// MongoDB initialization script
db = db.getSiblingDB("admin");

// Create application database
db = db.getSiblingDB("orbit");

// Create collections
db.createCollection("users");
db.createCollection("chats");

// Create indexes
db.users.createIndex({ email: 1 }, { unique: true });
db.chats.createIndex({ userId: 1 });

print("MongoDB initialization completed");
