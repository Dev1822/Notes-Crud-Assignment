const express = require("express");
const router = express.Router();

const controller = require("../controllers/note.controller");
const logger=require("../middlewares/logger.middleware");
const auth=require("../middlewares/auth.middleware");

router.post("/api/notes",controller.createNote);
router.post("/api/notes/bulk",controller.createBulk);
router.get("/api/notes",auth,logger,controller.getAll);
router.get("/api/notes/:id",controller.getById);
router.put("/api/notes/:id",controller.replaceNote);
router.patch("/api/notes/:id",controller.updateNote);
router.delete("/api/notes/bulk",controller.deleteBulk);
router.delete("/api/notes/:id",controller.deleteNote);


module.exports = router;