import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

// Connect to MongoDB using the URI in the .env file
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Define Mongoose Schema and Model
const formSchema = new mongoose.Schema({
    name: String,
    age: Number,
    state: String,
    criminalHistory: String,
    caseSummary: String,
    caseDescription: String,
});
const FormModel = mongoose.model('FormData', formSchema);

// Endpoint to save form data to MongoDB
app.post('/api/saveFormData', async (req, res) => {
    console.log('Received request data:', req.body);  // Log incoming data

    try {
        const formData = new FormModel(req.body); // Use the correct Mongoose model (FormModel)
        await formData.save();
        res.status(201).json({ message: 'Form data saved successfully' });
    } catch (error) {
        console.error('Error saving form data:', error);  // Log any error
        res.status(500).json({ error: 'Failed to save form data' });
    }
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
