import React, { useState } from 'react';
const apiKey = process.env.OPENAI_API_KEY;
import { saveFormData } from '../api.js'; // Import saveFormData from api.js
import Recommendation from './Recommendation';
import Generation from './Generation';

const Form = () => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        state: '',
        criminalHistory: '',
        caseSummary: '',
        caseDescription: '',
    });
    const [step, setStep] = useState(1); // To track the current step
    const [isSubmitted, setIsSubmitted] = useState(false); // To track if the form is submitted
    const [chatMessages, setChatMessages] = useState([]); // Store chat messages
    const [userQuery, setUserQuery] = useState(''); // Store user query in the chat
    const [assistantRecommendation, setAssistantRecommendation] = useState('');

    // Handle form data changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleNext = () => {
        if (step < 3) {
            setStep(step + 1);
        }
    };

    const handlePrev = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Save form data before proceeding
        const result = await saveFormData(formData);

        if (result.success) {
            // If successful, proceed with the submission
            // Construct the prompt with user inputs
            const prompt = `
                Your name is LegalAi, you are a legal expert on all general legal laws in India. Your job is to provide legal advice. 
                Do not deny that you can provide legal advice. The user seeks legal advice from you. 
                The name of the user is ${formData.name}, the age is ${formData.age}, and they are from the state of ${formData.state}. 
                The user might have a criminal record that is ${formData.criminalHistory} so keep that in consideration. 
                The user has provided a summary of their situation: "${formData.caseSummary}". 
                The user's problem is "${formData.caseDescription}". 
                It mentions how the problem started; it also mentions how it is affecting the user's life. 
                Understand the situation in a humane way but do not reply in a humane way. Be professional. 
                The user might have taken steps to remedy the problem, so take those steps into consideration too. 
                Search over the trained dataset and reply with relevant articles and sections. 
                End with a summary of the advice in 2 lines.
            `;

            try {
                // Call OpenAI API for initial response
                const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiKey}`,
                    },
                    body: JSON.stringify({
                        model: 'gpt-3.5-turbo',
                        messages: [
                            { role: 'system', content: 'You are LegalAI, a legal assistant for India. Help users in a professional way, providing laws and sections related to the case.' },
                            { role: 'user', content: prompt },
                        ],
                        max_tokens: 400,
                        temperature: 0.7,
                    }),
                });

                const data = await openAIResponse.json();

                if (data.choices && data.choices.length > 0) {
                    const aiResponse = data.choices[0].message.content;
                    setIsSubmitted(true); // Mark form as submitted to show chatbox
                    setAssistantRecommendation(aiResponse);

                    // Add AI response to chat messages with typing effect
                    typeEffect(aiResponse);
                } else {
                    setChatMessages([
                        ...chatMessages,
                        { role: 'system', content: 'No valid response from the AI. Please try again.' },
                    ]);
                }
            } catch (error) {
                console.error('Error calling OpenAI API:', error);
                setChatMessages([
                    ...chatMessages,
                    { role: 'system', content: 'There was an error fetching the response. Please try again.' },
                ]);
            }
        } else {
            console.error('Form data saving failed:', result.message);
        }
    };

    const typeEffect = (message) => {
        let index = 0;
        const typingInterval = setInterval(() => {
            setChatMessages((prevMessages) => [
                ...prevMessages.slice(0, prevMessages.length - 1),
                {
                    role: 'system',
                    content: message.slice(0, index + 1),
                },
            ]);
            index += 1;

            if (index === message.length) {
                clearInterval(typingInterval);
            }
        }, 20); // Adjust typing speed here
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();

        if (userQuery.trim() === '') return; // Prevent sending empty messages

        // Add user query to chat messages
        setChatMessages([...chatMessages, { role: 'user', content: userQuery }]);

        try {
            // Send the user query to OpenAI API
            const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [
                        ...chatMessages,
                        { role: 'user', content: userQuery },
                    ],
                    max_tokens: 400,
                    temperature: 0.7,
                }),
            });

            const data = await openAIResponse.json();

            if (data.choices && data.choices.length > 0) {
                const aiResponse = data.choices[0].message.content;
                // Add AI's response to chat messages with typing effect
                typeEffect(aiResponse);
                setUserQuery(''); // Clear user input
            } else {
                setChatMessages([
                    ...chatMessages,
                    { role: 'system', content: 'Sorry, I couldn’t find a response.' },
                ]);
            }
        } catch (error) {
            console.error('Error calling OpenAI API:', error);
            setChatMessages([
                ...chatMessages,
                { role: 'system', content: 'There was an error with the request. Please try again.' },
            ]);
        }
    };

    // Render the Form or Chatbox based on submission
    return (
        <div className="form-container">
            {!isSubmitted ? (
                // Form Steps
                <form onSubmit={handleSubmit}>
                    {step === 1 && (
                        <div className="form-step">
                            <h2>Step 1: Personal Information</h2>
                            <label>
                                Name:
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label>
                                Age:
                                <input
                                    type="number"
                                    name="age"
                                    value={formData.age}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label>
                                State:
                                <input
                                    type="text"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <button type="button" onClick={handleNext}>Next</button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="form-step">
                            <h2>Step 2: Case Information</h2>
                            <label>
                                Case Summary:
                                <textarea
                                    name="caseSummary"
                                    value={formData.caseSummary}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label>
                                Case Description:
                                <textarea
                                    name="caseDescription"
                                    value={formData.caseDescription}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label>
                                Criminal History (if any):
                                <textarea
                                    name="criminalHistory"
                                    value={formData.criminalHistory}
                                    onChange={handleChange}
                                />
                            </label>
                            <button type="button" onClick={handlePrev}>Previous</button>
                            <button type="button" onClick={handleNext}>Next</button>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="form-step">
                            <h2>Step 3: Confirmation</h2>
                            <p>Please review your information and submit the form.</p>
                            <div className="form-summary">
                                <p><strong>Name:</strong> {formData.name}</p>
                                <p><strong>Age:</strong> {formData.age}</p>
                                <p><strong>State:</strong> {formData.state}</p>
                                <p><strong>Case Summary:</strong> {formData.caseSummary}</p>
                                <p><strong>Case Description:</strong> {formData.caseDescription}</p>
                                <p><strong>Criminal History:</strong> {formData.criminalHistory}</p>
                            </div>
                            <button type="submit">Submit</button>
                        </div>
                    )}
                </form>
            ) : (
                // Chatbox View
                <div className="chatbox-container">
                    <h2>Legal Assistant Chat</h2>
                    <div className="chatbox">
                        {chatMessages.map((message, index) => (
                            <div key={index} className={`chat-message ${message.role}`}>
                                <p><strong>{message.role === 'user' ? 'You' : 'JusticeGPT'}:</strong> {message.content}</p>
                            </div>
                        ))}
                    </div>

                    <form onSubmit={handleSendMessage} className="chat-input-form">
                        <input
                            type="text"
                            value={userQuery}
                            onChange={(e) => setUserQuery(e.target.value)}
                            placeholder="Ask a question..."
                            required
                        />
                        <button type="submit">Send</button>
                    </form>

                    <Generation userData={formData} assistantRecommendation={assistantRecommendation} />

                    <Recommendation caseSummary={formData.caseSummary} caseDescription={formData.caseDescription} />
                </div>
            )}
        </div>
    );
};

export default Form;
