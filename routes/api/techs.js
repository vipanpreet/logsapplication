const express = require("express");
const router = express.Router();

const Tech = require("../../models/Tech");

router.get("/", async (req, res) => {
  try {
    const techs = await Tech.find().sort({
      date: -1,
    });
    res.json(techs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/", async (req, res) => {
  const { firstname, lastname, type } = req.body;

  try {
    const newTech = new Tech({
      firstname,
      lastname,
      type,
    });

    const tech = await newTech.save();

    res.json(tech);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const tech = await Tech.findById(req.params.id);

    if (!tech) return res.status(404).json({ msg: "Tech not found" });

    await Tech.findByIdAndRemove(req.params.id);

    res.json({ msg: "Tech removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
