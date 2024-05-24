document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('soilForm');
    const plantList = document.getElementById('plantList');
    const recommendationsDiv = document.getElementById('recommendations');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const moisture = parseFloat(document.getElementById('moisture').value);
        const ph = parseFloat(document.getElementById('ph').value);

        try {
            const response = await fetch('/api/recommendations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ moisture, ph })
            });

            const data = await response.json();

            if (data.recommendations.length > 0) {
                recommendationsDiv.classList.remove('hidden');
                plantList.innerHTML = '';
                data.recommendations.forEach(plant => {
                    const li = document.createElement('li');
                    li.textContent = plant.name;
                    plantList.appendChild(li);
                });
            } else {
                recommendationsDiv.classList.add('hidden');
                alert('No recommendations found. We are working to update all plants.');
            }
        } catch (error) {
            console.error('Error fetching recommendations:', error);
        }
    });
});
