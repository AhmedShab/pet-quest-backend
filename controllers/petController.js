const Pet = require('../models/petModel')

// Get all Pets (optionally filter by petId or type)
exports.getPets = async (req, res) => {
  try {
    const pets = await Pet.find();
    res.status(200).json(pets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
