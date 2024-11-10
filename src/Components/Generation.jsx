import React from 'react';
import { jsPDF } from 'jspdf';

const Generation = ({ userData, assistantRecommendation }) => {
    // Function to generate PDF
    const generatePDF = () => {
        const { name, age, state, criminalHistory, caseSummary, caseDescription } = userData;

        const doc = new jsPDF();

        // Add title to the PDF
        doc.setFontSize(16);
        doc.text('Legal Advice Summary', 20, 20);

        // Add user information to the PDF
        doc.setFontSize(12);
        doc.text(`Name: ${name}`, 20, 30);
        doc.text(`Age: ${age}`, 20, 40);
        doc.text(`State: ${state}`, 20, 50);
        doc.text(`Criminal History: ${criminalHistory}`, 20, 60);
        doc.text(`Case Summary: ${caseSummary}`, 20, 70);
        doc.text(`Case Description: ${caseDescription}`, 20, 80);

        // Add the assistant's recommendation to the PDF
        doc.text('Assistant\'s Recommendation:', 20, 100);

        doc.text('Consulting a lawyer preferred. Visit LawLink for more information.', 20, 110);

        // Wrap the assistant recommendation text to avoid overflow
        const marginLeft = 20;
        const marginTop = 130;
        const maxWidth = 180; // Width for wrapping text
        doc.setFontSize(12);
        doc.text(assistantRecommendation, marginLeft, marginTop, { maxWidth });

        // Save the generated PDF
        doc.save('legal_advice.pdf');
    };

    return (
        <div className="generation-container">
            <button onClick={generatePDF} className="generate-pdf-btn">
                Generate PDF
            </button>
        </div>
    );
};

export default Generation;
