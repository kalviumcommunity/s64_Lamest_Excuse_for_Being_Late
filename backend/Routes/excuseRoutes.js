const express = require("express");
const router = express.Router();
const Excuse = require("../Model/excuseModel.js");

// ✅ Create a new Excuse (POST)
router.post("/", async (req, res) => {
    try {
        const { name, description } = req.body;
        const newExcuse = new Excuse({ name, description });
        await newExcuse.save();
        res.status(201).json({ message: "Excuse added successfully!", newExcuse });
    } catch (error) {
        res.status(500).json({ error: "Server error while adding excuse" });
    }
});

// ✅ Get all Excuses (GET)
router.get("/", async (req, res) => {
    try {
        const excuses = await Excuse.find();
        res.status(200).json(excuses);
    } catch (error) {
        res.status(500).json({ error: "Error fetching excuses" });
    }
});

// ✅ Get a single Excuse by ID (GET)
router.get("/:id", async (req, res) => {
    try {
        const excuse = await Excuse.findById(req.params.id);
        if (!excuse) return res.status(404).json({ error: "Excuse not found" });
        res.status(200).json(excuse);
    } catch (error) {
        res.status(500).json({ error: "Error fetching the excuse" });
    }
});

// ✅ Update an Excuse by ID (PUT)
router.put("/:id", async (req, res) => {
    try {
        const updatedExcuse = await Excuse.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedExcuse) return res.status(404).json({ error: "Excuse not found" });

        res.status(200).json({ message: "Excuse updated successfully!", updatedExcuse });
    } catch (error) {
        console.error("Update Error:", error);
        res.status(500).json({ error: "Error updating the excuse" });
    }
});

// ✅ Delete an Excuse by ID (DELETE)
router.delete("/:id", async (req, res) => {
    try {
        const deletedExcuse = await Excuse.findByIdAndDelete(req.params.id);
        if (!deletedExcuse) return res.status(404).json({ error: "Excuse not found" });
        res.status(200).json({ message: "Excuse deleted successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting the excuse" });
    }
});

// ✅ Like an Excuse (PATCH)
router.patch("/:id/like", async (req, res) => {
    try {
        const excuse = await Excuse.findByIdAndUpdate(
            req.params.id,
            { $inc: { likes: 1 } },
            { new: true }
        );
        if (!excuse) return res.status(404).json({ error: "Excuse not found" });

        res.status(200).json({ message: "Excuse liked!", excuse });
    } catch (error) {
        res.status(500).json({ error: "Error liking the excuse" });
    }
});

// ✅ Dislike an Excuse (PATCH)
router.patch("/:id/dislike", async (req, res) => {
    try {
        const excuse = await Excuse.findByIdAndUpdate(
            req.params.id,
            { $inc: { dislikes: 1 } },
            { new: true }
        );
        if (!excuse) return res.status(404).json({ error: "Excuse not found" });

        res.status(200).json({ message: "Excuse disliked!", excuse });
    } catch (error) {
        res.status(500).json({ error: "Error disliking the excuse" });
    }
});

// ✅ Add a Comment (POST)
router.post("/:id/comment", async (req, res) => {
    try {
        const { text, user } = req.body;
        const excuse = await Excuse.findById(req.params.id);
        if (!excuse) return res.status(404).json({ error: "Excuse not found" });

        excuse.comments.push({ text, user });
        await excuse.save();

        res.status(201).json({ message: "Comment added!", excuse });
    } catch (error) {
        res.status(500).json({ error: "Error adding comment" });
    }
});

module.exports = router;
