

async function analyzeSentiment(event) {
    event.preventDefault(); // Prevent form submission
    const text = document.getElementById("textInput").value.trim();
    const resultDisplay = document.getElementById("resultDisplay");

    if (!text) {
        resultDisplay.innerHTML = "⚠️ Please enter some text to analyze.";
        return;
    }

    resultDisplay.innerHTML = 'Analyzing... <span class="cursor">█</span>';

    try {
        const response = await fetch('https://your-railway-app-url.up.railway.app/analyse', {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `text=${encodeURIComponent(text)}`
        });

        const data = await response.json();

        if (data.result_code !== "200") {
            resultDisplay.innerHTML = `❌ Error: ${data.result_msg}`;
            return;
        }

        const moodEmoji = {
            positive: "😄",
            negative: "😡",
            neutral: "😐"
        };

        resultDisplay.innerHTML = `
            <p id="sentimentAnswer">Sentiment: ${moodEmoji[data.type]} <strong>${data.type.toUpperCase()}</strong></p>
             <p id="confidenceAnswer">Confidence Score: <strong>${(Math.abs(data.score) * 100).toFixed(2)}%</strong></p>
        `;

        document.body.classList.add('flicker');

        // Stop flicker after a few seconds (so your eyes don’t bleed)
        setTimeout(() => {
            document.body.classList.remove('flicker');
        }, 3000);
    } catch (err) {
        resultDisplay.innerHTML = "💥 Something went wrong. Check the console.";
        console.error(err);
    }
}


