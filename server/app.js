/**
 * app.js
 * Express Example. Created by Aditya Gannavarapu (https://github.com/aditya-67)
 */

// create an express app
const express = require("express");
const cors = require("cors");
const app = express();
var cron = require("node-cron");
const config = require("./config");
var axios = require("axios");
const localStorage = require("localStorage");

// UTILS
const partnerToken = require("./util/partnerToken");

// Constant mock data
const fd_body = {
  authToken: "",
  refreshToken: "",
  theme: {
    textColor: "#560CCE",
    bgColor: "#560CCE",
    logoUrl: "https://demo-fd.herokuapp.com/logo.png",
  },
  provider: "EQTS",
  prefills: {
    amount: 0,
    tenure: 0,
    kycParams: {
      email: "",
      pan: "ABCDE1234E",
      mobile: "",
    },
    personalParams: {
      mothersName: "Rhea",
      fathersName: "Kronos",
      maritalStatus: "MARRIED",
      spouseName: "Hera",
      qualification: "10TH",
      occupation: "SELF-EMPLOYED",
      designation: "SALARIED",
      communicationAddress: "6th main, Subhash Nagar, Tumkur",
      communicationPinCode: "560023",
      cityOfBirth: "New Delhi",
    },
    nomineeParams: {
      nomineeRelationship: "SON",
      nomineeName: "Suresh",
      nomineeDob: "1992-11-11",
      nomineeEmail: "suresh@xyz.com",
      nomineePincode: "560023",
    },
    maturityParams: {
      maturityIfsc: "SBIN0050432",
      maturityAccountNumber: "00112233445566",
    },
  },
};

// use the express-static middleware

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.use(express.static("public"));

// define the first route
app.get("/", function (req, res) {
  res.send("Hello from AA sample app");
});

// Cron job to fetch partner token for every 15 min
cron.schedule("0/15 * * * *", () => {
  partnerToken();
});

////// BOOK FD ENDPOINT

app.post("/book-fd", (req, res) => {
  var body = req.body;

  var data = JSON.stringify({
    email: body.email,
    userId: body.email.split("@")[0],
    userName: body.email.split("@")[0],
  });
  if (localStorage.getItem("partnerToken") === null) {
    console.log("No partner token");
    // Dummy placeholder
    localStorage.setItem(
      "partnerToken",
      JSON.stringify({
        accessToken:
          "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJQMmNLU05oQ1dIbHRyVjExRldMMHE0M3dzN1FJOWN2cExhdU1pQ3pOZ09vIn0.eyJleHAiOjE2NDI3NjI0MzIsImlhdCI6MTY0Mjc1ODgzMiwianRpIjoiMzg1ZTlkOGYtM2I1OS00OTlmLThmOTItZDcwNDg5MmMxZTgzIiwiaXNzIjoiaHR0cHM6Ly9hdXRoLWRldi5zZXR1LmNvL2F1dGgvcmVhbG1zL2ZkIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjVlMGVlZGIwLWQyZDktNDg4My04ZmI0LTIxY2RjZjZiNzFmMCIsInR5cCI6IkJlYXJlciIsImF6cCI6InRlc3QiLCJzZXNzaW9uX3N0YXRlIjoiZThkNmY5ZDctNmYwMC00ZGZkLWE1ZTgtMzc5MjMwYjZkZTcyIiwiYWNyIjoiMSIsInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJjbGllbnRIb3N0IjoiMzUuMjQ0LjQ4LjcxIiwiY2xpZW50SWQiOiJ0ZXN0IiwiZ3JvdXBzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXSwicHJlZmVycmVkX3VzZXJuYW1lIjoic2VydmljZS1hY2NvdW50LXRlc3QiLCJjbGllbnRBZGRyZXNzIjoiMzUuMjQ0LjQ4LjcxIn0.Pmka-TSgs6bK48LVg3D9s8_cH0PKiVJQA4TnMy3E4EMLxK4YmQXxxB09IJ-mlKzdjLbikGU03_figg61looTownLnOYjclXzQdw5nqloYSVm0NDA5zVm8ijlDqa_B_d7WZuSC6-jdDCD4tQvWgsPJ_JIhj0WG1WBKy6R4bXwL8tRKHJttEbzWjrORCZEcMF_WZGe67haFnzzv_9FIgYAr1-mBvYvySv8Nlpu5og-rtpTTCWgVtWB2YrNTkL7iGaWLM4DYpUrBjfaBWUVIsz3ZoJxeMbZViEeo7aF64VPLDpwnJrCQGMSK9fhTkMwINaIbUN-EaZd8DI15dWecM_-jw",
        refreshToken:
          "eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzNzA4NDk4Yy00ZmQxLTQyOWYtYmIwZC1kYTFmNDc2Y2RiYWIifQ.eyJleHAiOjE2NDI3NjA2MzIsImlhdCI6MTY0Mjc1ODgzMiwianRpIjoiNjNkMTc1OTctYzRiYi00ZGQ1LWI1ODEtM2MwZmRmZDMyYWFkIiwiaXNzIjoiaHR0cHM6Ly9hdXRoLWRldi5zZXR1LmNvL2F1dGgvcmVhbG1zL2ZkIiwiYXVkIjoiaHR0cHM6Ly9hdXRoLWRldi5zZXR1LmNvL2F1dGgvcmVhbG1zL2ZkIiwic3ViIjoiNWUwZWVkYjAtZDJkOS00ODgzLThmYjQtMjFjZGNmNmI3MWYwIiwidHlwIjoiUmVmcmVzaCIsImF6cCI6InRlc3QiLCJzZXNzaW9uX3N0YXRlIjoiZThkNmY5ZDctNmYwMC00ZGZkLWE1ZTgtMzc5MjMwYjZkZTcyIiwic2NvcGUiOiJwcm9maWxlIGVtYWlsIn0.PkTgF9Kg84h1fcrvvi8bFZmEziKcAICWkXsnrB82Djo",
      })
    );
  }

  var partner_token = JSON.parse(localStorage.getItem("partnerToken"));

  var body = {
    method: "post",
    url: config.SANDBOX_API_URL + "/auth/sdk/token",
    headers: {
      Authorization: "Bearer " + partner_token["accessToken"],
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(body)
    .then(function (response) {
      let tokens = JSON.parse(JSON.stringify(response.data));
      fd_body.authToken = tokens.accessToken;
      fd_body.refreshToken = tokens.refreshToken;
      fd_body.prefills.kycParams.email = body.email;
      fd_body.prefills.kycParams.mobile = body.mobile;
      fd_body.prefills.amount = body.amount;
      fd_body.prefills.tenure = body.tenure;
      res.send(fd_body);
    })
    .catch(function (error) {
      res.send("Error");
      console.log(error);
    });
});

// start the server listening for requests
app.listen(config.port || 3000, () => {
  console.log("Server is running...");
  partnerToken();
});
