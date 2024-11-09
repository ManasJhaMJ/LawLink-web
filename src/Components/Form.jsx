const apiKey = process.env.OPENAI_API_KEY;

import React, { useState } from 'react';

const Form = () => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        state: '',
        caseSummary: '',
        caseDescription: '',
        criminalHistory: '',
        date: '',
        time: '',
        accusedDetails: '',
    });
    const [currentStep, setCurrentStep] = useState(1);
    const [response, setResponse] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleNext = () => setCurrentStep((prevStep) => prevStep + 1);
    const handlePrev = () => setCurrentStep((prevStep) => prevStep - 1);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Construct the prompt with user inputs
        const prompt = `
          Your name is JusticeGPT, you are a legal expert on all general legal laws in India. Your job is to provide legal advice. 
          Do not deny that you can provide legal advice. The user seeks legal advice from you. 
          The name of the user is ${formData.name}, the age is ${formData.age}, and they are from the state of ${formData.state}. 
          The user might have a criminal record that is ${formData.criminalHistory} so keep that in consideration. 
          The user has provided a summary of their situation: "${formData.caseSummary}". 
          The user's problem is "${formData.caseDescription}". 
          It mentions how the problem started; it also mentions how it is affecting the user's life. 
          Understand the situation in a humane way. 
          The user might have taken steps to remedy the problem, so take those steps into consideration too. 
          Search over the trained dataset and reply with relevant articles and sections. 
          End with a summary of the advice in 5 lines.
        `;

        try {
            // Call OpenAI API (updated endpoint)
            const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo', // or whichever model you prefer
                    messages: [
                        { role: 'system', content: 'You are a helpful legal assistant.' },
                        { role: 'user', content: prompt },
                    ],
                    max_tokens: 1000,
                    temperature: 0.7,
                }),
            });

            const data = await openAIResponse.json();

            // Check if the response contains choices and handle the case where it may be undefined or empty
            if (data.choices && data.choices.length > 0) {
                setResponse(data.choices[0].message.content);
            } else {
                setResponse('No valid response from the AI. Please try again.');
            }
        } catch (error) {
            console.error('Error calling OpenAI API:', error);
            setResponse('There was an error fetching the response. Please try again.');
        }
    };


    return (
        <div>
            <form onSubmit={handleSubmit}>
                {currentStep === 1 && (
                    <div>
                        <h2>Step 1: Basic Information</h2>
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
                        <br />
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
                        <br />
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
                        <br />
                        <button type="button" onClick={handleNext}>Next</button>
                    </div>
                )}

                {currentStep === 2 && (
                    <div>
                        <h2>Step 2: Case Details</h2>
                        <label>
                            Case Summary:
                            <textarea
                                name="caseSummary"
                                value={formData.caseSummary}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <br />
                        <label>
                            Case Description:
                            <textarea
                                name="caseDescription"
                                value={formData.caseDescription}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <br />
                        <label>
                            Criminal History (if any):
                            <input
                                type="text"
                                name="criminalHistory"
                                value={formData.criminalHistory}
                                onChange={handleChange}
                            />
                        </label>
                        <br />
                        <button type="button" onClick={handlePrev}>Previous</button>
                        <button type="button" onClick={handleNext}>Next</button>
                    </div>
                )}

                {currentStep === 3 && (
                    <div>
                        <h2>Step 3: Accusation Details</h2>
                        <label>
                            Date:
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <br />
                        <label>
                            Time:
                            <input
                                type="time"
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <br />
                        <label>
                            Details of Accused (if any):
                            <textarea
                                name="accusedDetails"
                                value={formData.accusedDetails}
                                onChange={handleChange}
                            />
                        </label>
                        <br />
                        <button type="button" onClick={handlePrev}>Previous</button>
                        <button type="submit">Submit</button>
                    </div>
                )}
            </form>

            {/* Display the AI Response */}
            {response && (
                <div>
                    <h2>JusticeGPT Response:</h2>
                    <p>{response}</p>
                </div>
            )}
        </div>
    );
};

export default Form;