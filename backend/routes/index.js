// routes.js
import express from 'express';
import Conversation from './models/conversation.model.js';

const router = express.Router();

// Endpoint to save form data
router.post('/api/saveFormData', async (req, res) => {
    const { name, age, state, criminalHistory, caseSummary, caseDescription } = req.body;

    try {
        // Create a new document in MongoDB with form data
        const conversation = new Conversation({
            userId: name, // assuming you're using name as userId for simplicity
            messages: [
                {
                    sender: 'user',
                    message: `Name: ${name}, Age: ${age}, State: ${state}, Criminal History: ${criminalHistory}, Case Summary: ${caseSummary}, Case Description: ${caseDescription}`,
                },
            ],
            status: 'active',
        });

        await conversation.save();
        res.status(201).json({ message: 'Form data saved successfully', conversation });
    } catch (error) {
        console.error('Error saving form data:', error);
        res.status(500).json({ error: 'Failed to save data to database' });
    }
});

export default router;
