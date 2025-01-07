const Form = require('../models/Form');

const createForm = async (req, res) => {
    try {
        const { name, email } = req.body;
        const newForm = new Form({ name, email });
        await newForm.save();
        res.status(201).json({ message: 'Form saved successfully', form: newForm });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = { createForm };