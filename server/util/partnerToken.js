var axios = require("axios");
var qs = require("qs");
const localStorage = require("localStorage");
const config = require("../config");

const partnerToken = () => {
  var data = qs.stringify({
    client_id: "test",
    client_secret: "7a1958fa-3223-4349-9cde-98f4cd4350ff",
    grant_type: "client_credentials",
    "": "",
  });
  var body = {
    method: "post",
    url: config.SANDBOX_API_URL + "/auth/token",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };

  axios(body)
    .then(function (response) {
      localStorage.setItem("partnerToken", JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
};

module.exports = partnerToken;
