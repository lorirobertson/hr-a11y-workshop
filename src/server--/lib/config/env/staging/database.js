module.exports = {
    "default": {
        "settings": {
            "client": process.env.DATABASE_ClIENT || "mongodb",
            "username": process.env.DATABASE_USERNAME || "",
            "password": process.env.DATABASE_PASSWORD || "",
            "database": process.env.DATABASE_NAME || "",
            "host": process.env.DATABASE_HOST || "127.0.0.1",
            "port": process.env.DATABASE_PORT || "27017",
        },
        "options": {
            "authenticationDatabase": process.env.DATABASE_AUTHSOURCE || "admin",
            "ssl": process.env.DATABASE_SSL || false
        }
    }
};