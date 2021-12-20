import "dotenv/config";

export default {
  "type": process.env.TYPE_CONNECTION,
  "url": process.env.DATABASE_URL,
  "logging": process.env.TYPEORM_LOGGING,
  "logger": true,
  "synchronize": true,
  "uuidExtension": process.env.UUID_EXTENSION,
  "entities": [process.env.TYPEORM_ENTITIES],
  "migrations": [process.env.TYPEORM_MIGRATIONS],
  "cli": {
      "migrationsDir": process.env.TYPEORM_MIGRATIONS_DIR
  }
 }
