const sql = require("mssql");

const config = {
    user: "studentadmin",
    password: "Student@123",
    server: "127.0.0.1",
    port: 58419,
    database: "StudentDB",
    options: {
        trustServerCertificate: true
    }
};

async function connectDB() {
    try {
        await sql.connect(config);
        console.log("SQL Server Connected");
    } catch (err) {
        console.error("Database Connection Error:", err);
    }
}

module.exports = { sql, connectDB };