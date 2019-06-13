const express = require("express");
const app = express();
const router = require("express").Router();

router.get("/", async (req, res) => {
    const test = {
        "message": "Working"
    }
    res.send(test);
});

module.exports = router;