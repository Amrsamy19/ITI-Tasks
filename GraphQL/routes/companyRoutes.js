import express from "express";
import Company from "../models/Company.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const company = await Company.create(req.body);
    res.json(company);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const company = await Company.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(company);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Company.findByIdAndDelete(req.params.id);
    res.json({ message: "Company deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const companiesRouter = router;

export default companiesRouter;
