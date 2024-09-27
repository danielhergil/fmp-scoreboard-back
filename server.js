const express = require("express");
const app = express();
const cors = require("cors");

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// Disable caching for all routes
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  res.setHeader("Surrogate-Control", "no-store");
  next();
});

// Initial scoreboard data
let scoreboard = {
  period: 1,
  team1Score: 0,
  team2Score: 0,
  faltas1: 0,
  faltas2: 0,
};

// Log the scoreboard to verify data
const logScoreboard = () => {
  console.log("Current scoreboard:", scoreboard);
};

// Endpoint to get the current scoreboard data
app.get("/api/scoreboard", (req, res) => {
  logScoreboard(); // Log the current data
  res.json(scoreboard);
});

// Endpoint to update the scoreboard data
app.post("/api/scoreboard", (req, res) => {
  const { period, team1Score, team2Score, faltas1, faltas2 } = req.body;

  // Log received data
  console.log("Received data to update:", req.body);

  // Update scoreboard values only if they are provided in the request
  if (period !== undefined) scoreboard.period = period;
  if (team1Score !== undefined) scoreboard.team1Score = team1Score;
  if (team2Score !== undefined) scoreboard.team2Score = team2Score;
  if (faltas1 !== undefined) scoreboard.faltas1 = faltas1;
  if (faltas2 !== undefined) scoreboard.faltas2 = faltas2;

  logScoreboard(); // Log after update

  res.json({ message: "Scoreboard updated successfully", scoreboard });
});

// Start the server on port 5000
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
