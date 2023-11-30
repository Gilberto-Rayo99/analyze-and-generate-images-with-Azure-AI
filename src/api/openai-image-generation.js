
export const isConfiguredOpenAI = () => { 
  
    if (!process.env.REACT_APP_OPENAI_API_KEY) {
        return false;
    }
    return true;

}
export const generateImage = async (prompt) => {
        
        const apiKey = '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';
        const apiUrl = 'https://api.openai.com/v1/images/generations'; // Replace with the actual API endpoint
        
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                "model": "dall-e-3",
                "prompt": prompt,
                "n": 1,
                "size": "1024x1024"
            })
        };
        
        try {
            const response = await fetch(apiUrl, requestOptions);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
        
}


