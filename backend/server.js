const express = require("express")
const app = express()
const dotenv = require("dotenv")
const cors = require("cors")

// Load environment variables from .env file
dotenv.config()

// Enable CORS
app.use(cors())

// Endpoint to serve Firebase config
app.get("/firebase-config", (req, res) => {
    res.json({
        apiKey: process.env.API_KEY,
        authDomain: process.env.AUTH_DOMAIN,
        databaseURL: process.env.DATABASE_URL,
        projectId: process.env.PROJECT_ID,
        storageBucket: process.env.STORAGE_BUCKET,
        messagingSenderId: process.env.MESSAGING_SENDER_ID,
        appId: process.env.APP_ID,
    })
})

// Start the server
const PORT = process.env.PORT || 3004
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
