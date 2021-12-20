module.exports = {
  "type": process.env.TYPE_CONNECTION,
  "url": process.env.DATABASE_URL,
  "logging": process.env.TYPEORM_LOGGING,
  "logger": true,
  "synchronize": true,
  "uuidExtension": process.env.UUID_EXTENSION,
  "entities": [process.env.TYPEORM_ENTITIES],
  "ssl": true,
  "extra": {
    "ssl": {
      "rejectUnauthorized": false
    }
  },
  "migrations": [process.env.TYPEORM_MIGRATIONS],
  "cli": {
      "migrationsDir": process.env.TYPEORM_MIGRATIONS_DIR
  }
 }
