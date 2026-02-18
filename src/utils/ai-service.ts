
export const processAIRequest = async (
    userMessage: string,
    apiKey: string,
    elements: any[],
    model: string
) => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

    try {
        const response = await fetch(`${API_URL}/process`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userMessage,
                currentElements: elements,
                preferredModel: model,
                apiKey
            }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.detail || `Server error: ${response.status}`);
        }

        return await response.json();
    } catch (error: any) {
        console.error('AI Service Error:', error);
        throw error;
    }
};
            throw new Error(`Backend error: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("AI Service Error:", error);
        throw error;
    }
};
