/**
 * config.js
 * Express Example. Created by Aditya Gannavarapu (https://github.com/aditya-67)
 */

"use strict";

// Load environment variables from the `.env` file.
require("dotenv").config();

module.exports = {
  // Server port.
  port: process.env.PORT || 3000,
  SANDBOX_API_URL: process.env.SANDBOX_API_URL,
  PROD_API_URL: process.env.PROD_API_URL,
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
};
