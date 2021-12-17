import 'dotenv/config';

export default {
    "name": process.env.TYPEORM_NAME,
    "type": process.env.TYPE_CONNECTION,
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.NAME_DATABASE,
    "logging": process.env.TYPEORM_LOGGING,
    "uuidExtension": process.env.UUID_EXTENSION,
    "entities": [process.env.TYPEORM_ENTITIES],
    "migrations": [process.env.TYPEORM_MIGRATIONS],
    "cli": {
        "migrationsDir": process.env.TYPEORM_MIGRATIONS_DIR
    }
 }
