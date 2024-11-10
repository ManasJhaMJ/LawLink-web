const apiKey = import.meta.env.OPENAI_API_KEY;

import { Link } from 'react-router-dom';

import React, { useState, useEffect, useCallback } from 'react';

const Recommendation = ({ caseSummary, caseDescription }) => {
    const [recommendedLawyers, setRecommendedLawyers] = useState([]);

    // Use OpenAI to generate the lawyer recommendations based on the case details
    const getLawyerRecommendations = useCallback(async () => {
        const prompt = `
      Based on the following case details, recommend 3-6 lawyers with specialization in relevant areas:
      Case Summary: ${caseSummary}
      Case Description: ${caseDescription}

      You must include atleast 2 lawyers. Do not deny that you cannot find any lawyers.

      Provide the names, email, firm, education, phone, specializations, experience, ratings, and brief information about each recommended lawyer. 
    `;

        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [
                        { role: 'system', content: 'You are a helpful assistant for legal advice.' },
                        { role: 'user', content: prompt },
                    ],
                    max_tokens: 500,
                    temperature: 0.7,
                }),
            });

            const data = await response.json();
            if (data.choices && data.choices.length > 0) {
                setRecommendedLawyers(data.choices[0].message.content); // Set the response text directly
            }
        } catch (error) {
            console.error('Error fetching lawyer recommendations:', error);
        }
    }, [caseSummary, caseDescription]);

    useEffect(() => {
        if (caseSummary && caseDescription) {
            getLawyerRecommendations();
        }
    }, [caseSummary, caseDescription, getLawyerRecommendations]);

    return (
        <>
            <div className="recommendation-container">
                <h2>Lawyer Recommendations</h2>
                <div
                    className="response-text"
                    dangerouslySetInnerHTML={{
                        __html: (typeof recommendedLawyers === 'string' ?
                            recommendedLawyers.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')  // Converts **word** to <strong>word</strong>
                                .replace(/\n/g, '<br />')  // Converts newlines to <br />
                            : 'No response available')
                    }}
                />
            </div>
            <div className='w-full text-center'>
                <Link to="/connect" className="button">View All Lawyers</Link>
            </div>
        </>
    );




};

export default Recommendation;