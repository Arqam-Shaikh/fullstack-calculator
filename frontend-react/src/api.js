const API_URL = "http://127.0.0.1:8000";

// Send calculation request to Python backend
export async function calculateOnBackend(num1, num2, operator) {
    try {
        const response = await fetch(`${API_URL}/calculate`, {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                num1: Number(num1),
                num2: Number(num2),
                operator: operator
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.detail || "Calculation failed");
        }

        return data.result;

    } catch (error) {
        console.error("Backend Error:", error);
        throw error;
    }
}