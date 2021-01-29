const express = require("express");
const router = express.Router();

const Log = require("../../models/Log");

router.get("/", async (req, res) => {
  try {
    const logs = await Log.find().sort({
      date: -1,
    });
    res.json(logs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
router.get("/search/", async (req, res) => {
  try {
    let { searchterm } = req.query;

    const logs = await Log.find({
      message: {
        $regex: searchterm,
        $options: "i",
      },
    }).sort({
      date: -1,
    });
    res.json(logs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/", async (req, res) => {
  const { message, attention, tech } = req.body;

  try {
    const newLog = new Log({
      message,
      attention,
      tech,
    });

    const log = await newLog.save();

    res.json(log);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

router.put("/:id", async (req, res) => {
  const { message, tech, completed, attention } = req.body;
  // Build contact object

  try {
    const logFields = {
      attention: attention,
      completed: completed,
    };
    if (message) logFields.message = message;
    if (tech) logFields.tech = tech;

    let log = await Log.findById(req.params.id);

    if (!log) return res.status(404).json({ msg: "Contact not found" });

    log = await Log.findByIdAndUpdate(
      req.params.id,
      { $set: logFields },
      { new: true }
    );

    res.json(log);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const log = await Log.findById(req.params.id);

    if (!log) return res.status(404).json({ msg: "Log not found" });

    await Log.findByIdAndRemove(req.params.id);

    res.json({ msg: "Log removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
