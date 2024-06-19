const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.json("First api route");
});

module.exports = router;
