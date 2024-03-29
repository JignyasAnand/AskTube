const PORT = 8000;
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
app.get("/test", (req, res) => {
  console.log("tfrxs");
});

app.get("/post", (req, res) => {
  const options = {
    method: "GET",
  };

  try {
    fetch("http://127.0.0.1:5000/test", options);
  } catch (error) {
    console.log(error);
  }
});

const apiAddr = "https://cea2-34-82-63-227.ngrok-free.app";

app.post("/prepare", async (req, res) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "69420",
    },
    body: JSON.stringify({
      messages: [{ role: "user", content: req.body.message }],
    }),
  };

  try {
    await fetch(`${apiAddr}/makemodel`, options);
  } catch (error) {
    console.log(error);
  }
});

app.post("/response", async (req, res) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "69420",
    },
    body: JSON.stringify({
      messages: [{ role: "user", content: req.body.message }],
    }),
  };

  try {
    const response = await fetch(`${apiAddr}/response`, options);
    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log("Listening on port : " + PORT);
});
