const express = require("express");
const mongoose = require("mongoose");
const config = require("config");

const app = express();
const PORT = config.get('serverPort');

if (!PORT) {
    console.error("Server port is not defined in the configuration");
    process.exit(1);
}

const start = () => {
    console.log("Starting server...");
    try {
        app.listen(PORT, () => {
            console.log('Server started on port ', PORT);
        });
    } catch (error) {
        console.error("Error starting the server: ", error);
    }
};

start();
