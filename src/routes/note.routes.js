const express = require("express");
const router = express.Router();

const controller = require("../controllers/note.controller");

router.post("/api/notes",controller.createNote);

module.exports = router;