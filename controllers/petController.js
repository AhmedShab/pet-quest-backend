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

exports.getPetById = async (req, res) => {
  const id = req.params.id;
  try {
    const pet = await Pet.findById(id);
    if (!pet) return res.status(404).json({ error: 'Pet not found' });
    res.status(200).json(pet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.createPet = async (req, res) => {
  try {
    const pet = await Pet.create(req.body);
    res.status(201).json(pet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
