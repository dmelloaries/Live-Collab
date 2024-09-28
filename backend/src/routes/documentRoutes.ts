import express from "express";
import { findOrCreateDoc, getAllDocIdsForUser } from "../controllers/documentController";

const router = express.Router();

router.get("/find/:id/:name", async (req, res) => {
  const { id, name } = req.params;
  try {
    const document = await findOrCreateDoc(id, name);
    document ? res.json({ doc: document.doc }) : res.status(404).json({ message: "Document not found" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/find_draw/:id/:name", async (req, res) => {
  const { id, name } = req.params;
  try {
    const document = await findOrCreateDoc(id, name);
    document ? res.json({ elements: document.draw }) : res.status(404).json({ message: "Document not found" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/find_code/:id/:name", async (req, res) => {
  const { id, name } = req.params;
  try {
    const document = await findOrCreateDoc(id, name);
    document ? res.json({ editorContent: document.code }) : res.status(404).json({ message: "Document not found" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/find_recent_stops/:name", async (req, res) => {
  const { name } = req.params;
  try {
    const docIds = await getAllDocIdsForUser(name);
    docIds.length ? res.json({ docIds }) : res.status(404).json({ message: "No recent documents found" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
