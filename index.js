import express, { urlencoded } from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";


const yourUsername = "emka";
const yourPassword = "hellohello";
const yourAPIKey = "47d9e9d0-bcb7-4a72-924b-0d46f84a5194";
const yourBearerToken = "b1338850-a41e-455d-b74d-fc811eecfd95";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});


app.get("/noAuth", async (req, res) => {  

  var received = "none";
  try {
    received = await axios.get("https://secrets-api.appbrewery.com/random");
    console.log(received.data);    
  } catch (error) {
    console.error("Failed to make request:", error.message);
    received = error.message;
  }
  res.render("index.ejs", { content: JSON.stringify(received.data) });

});

app.get("/basicAuth", async (req, res) => {


  var received = "none";
  const url = "https://secrets-api.appbrewery.com/all?page=2"
  try {
    received = await axios.get(url, {
      auth: {
        username: yourUsername,
        password: yourPassword,
      },
    });
    console.log(received.data);    
  } catch (error) {
    console.error("Failed to make request:", error.message);
    received = error.message;
  }
  res.render("index.ejs", { content: JSON.stringify(received.data) });

});

app.get("/apiKey", async (req, res) => {

  var received = "none";
  const url = `https://secrets-api.appbrewery.com/filter?score=5&apiKey=${yourAPIKey}`;
  try {
    received = await axios.get(url);
    // const result = await axios.get(API_URL + "/filter", {
    //   params: {
    //     score: 5,
    //     apiKey: yourAPIKey,
    //   },
    console.log(received.data);    
  } catch (error) {
    console.error("Failed to make request:", error.message);
    received = error.message;
  }
  res.render("index.ejs", { content: JSON.stringify(received.data) });


});

app.get("/bearerToken", async (req, res) => {

  var received = "none";
  const url = "https://secrets-api.appbrewery.com/secrets/42"
  try {
    received = await axios.get(url, {
      headers: { 
        Authorization: `Bearer ${yourBearerToken}`,
      },
    });
    console.log(received.data);    
  } catch (error) {
    console.error("Failed to make request:", error.message);
    received = error.message;
  }
  res.render("index.ejs", { content: JSON.stringify(received.data) });


});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
