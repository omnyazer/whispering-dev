import express from "express";
import bodyParser from "body-parser";
import { getAll, getById, create, updateById, deleteById } from "./store.js";

const app = express();

app.use(express.static("public"));
app.use(bodyParser.json());
app.set("view engine", "ejs");

app.get("/about", async (req, res) => {
  const whispers = await getAll();
  res.render("about", { whispers });
});

app.get("/api/v1/whisper", async (req, res) => {
  const whispers = await getAll();
  res.json(whispers);
});

app.get("/api/v1/whisper/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const whisper = await getById(id);
  if (whisper) {
    res.json(whisper);
  } else {
    res.status(404).json({ error: "Not found" });
  }
});

app.post("/api/v1/whisper", async (req, res) => {
  const newWhisper = await create(req.body);
  res.status(201).json(newWhisper);
});

app.put("/api/v1/whisper/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const updated = await updateById(id, req.body);
  if (updated) {
    res.json(updated);
  } else {
    res.status(404).json({ error: "Not found" });
  }
});

// Supprimer un murmure par ID
app.delete("/api/v1/whisper/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  await deleteById(id);
  res.sendStatus(200);
});

export { app };
