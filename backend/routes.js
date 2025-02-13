const express = require("express");
const router = express.Router();
const MenuItem = require("./excuseModel.js");

// ✅ Create a new Excuse (POST)
router.post("/", async (req, res) => {
    try {
        const { name, description } = req.body;
        const newExcuse = new MenuItem({ name, description });
        await newExcuse.save();
        res.status(201).json({ message: " Excuse added successfully!", newExcuse });
    } catch (error) {
        res.status(500).json({ error: "Server error while adding Excuse" });
    }
});

// ✅ Get all Excuses (GET)
router.get("/", async (req, res) => {
    try {
        const Excuses = await MenuItem.find();
        res.status(200).json(Excuses);
    } catch (error) {
        res.status(500).json({ error: "Error fetching Excuses" });
    }
});

// ✅ Get a single Excuse by ID (GET)
router.get("/:id", async (req, res) => {
    try {
        const Excuse = await MenuItem.findById(req.params.id);
        if (!Excuse) return res.status(404).json({ error: "Excuse not found" });
        res.status(200).json(Excuse);
    } catch (error) {
        res.status(500).json({ error: "Error fetching the  Excuse" });
    }
});

// ✅ Update a Excuse by ID (PUT)
router.put("/:id", async (req, res) => {
    try {
        const updatedExcuse = await MenuItem.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true } // ✅ Ensures updated data follows schema
        );
        if (!updatedExcuse) return res.status(404).json({ error: "Excuse not found" });

        res.status(200).json({ message: "Excuse updated successfully!", updatedExcuse });
    } catch (error) {
        console.error("Update Error:", error);  // ✅ Logs error to terminal
        res.status(500).json({ error: "Error updating the Excuse" });
    }
});

// ✅ Delete a Excuse by ID (DELETE)
router.delete("/:id", async (req, res) => {
    try {
        const deletedExcuse = await MenuItem.findByIdAndDelete(req.params.id);
        if (!deletedExcuse) return res.status(404).json({ error: "Excuse not found" });
        res.status(200).json({ message: "Excuse deleted successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting the Excuse" });
    }
});

module.exports = router;