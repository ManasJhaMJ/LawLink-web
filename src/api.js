export const saveFormData = async (formData) => {
    try {
        const response = await fetch('http://localhost:8000/api/saveFormData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            const result = await response.json();
            return { success: true, message: result.message };
        } else {
            // Log the status code and message for better error tracking
            console.error('API error: ', response.status, await response.text());
            return { success: false, message: 'Failed to save form data. Please try again.' };
        }
    } catch (error) {
        console.error('Error saving form data:', error);
        return { success: false, message: 'There was an error saving your data. Please try again.' };
    }
};
