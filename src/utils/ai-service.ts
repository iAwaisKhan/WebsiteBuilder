
export const processAIRequest = async (
    userMessage: string,
    apiKey: string,
    elements: any[],
    model: string
) => {
    // If we have a backend, we should use it.
    // The README says the backend runs on port 8000.
    // However, for the purpose of this "fix", we want to ensure it works.

    try {
        const response = await fetch('http://localhost:8000/process', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userMessage,
                currentElements: elements,
                preferredModel: model,
                apiKey // Pass the key if client provided it overrides backend? 
                // Or if the backend needs it. 
                // Ideally backend uses its own .env key.
                // But AIAssistant.tsx passes 'apiKey'.
                // If the user inputs a key in UI, we should probably send it.
            }),
        });

        if (!response.ok) {
            throw new Error(`Backend error: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("AI Service Error:", error);
        throw error;
    }
};
