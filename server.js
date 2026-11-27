require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
app.use(express.static("public")); // the React page is in /public
// M = MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))



.catch((err) => console.log("MongoDB error:", err.message));
const Note = mongoose.model("Note", new mongoose.Schema({ text: String }));
//E + N = Express and Node API
app.get("/api/notes", async (req, res) => {
res.json(await Note.find());
});
app.post("/api/notes", async (req, res) => {
res.json(await Note.create({ text: req.body.text }));
});
app.put("/api/notes/:id", async (req, res) => {
res.json(await Note.findByIdAndUpdate(req.params.id, { text: req.body.text }, { new:
true }));
});
app.delete("/api/notes/:id", async (req, res) => {
await Note.findByIdAndDelete(req.params.id);
res.json({ message: "Deleted" });
});
app.listen(process.env.PORT || 3000, () => console.log("Server running on http://localhost:3000"));
