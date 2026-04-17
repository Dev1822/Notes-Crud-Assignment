const express = require("express");
const router = express.Router();

const controller = require("../controllers/note.controller");

router.post("/api/notes",controller.createNote);
router.post("/api/notes/bulk",controller.createBulk);

module.exports = router;