const express = require("express");
const router = express.Router();

const controller = require("../controllers/note.controller");

router.post("/api/notes",controller.createNote);
router.post("/api/notes/bulk",controller.createBulk);
router.get("/api/notes",controller.getAll);
router.get("/api/notes/:id",controller.getById);
router.put("/api/notes/:id",controller.replaceNote);


module.exports = router;