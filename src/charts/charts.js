// chart.js

const createChart = (container) => {
    const canvas = document.createElement('canvas');
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    const temperatureData = {
        labels: [],
        datasets: [
            {
                label: 'Température CPU (°C)',
                data: [],
                borderColor: 'rgb(255,255,255)',
                backgroundColor: 'rgba(255,243,243,0.2)',
                pointRadius: 1,
                pointBackgroundColor: 'rgb(244,255,255)',
                fill: true,
                borderWidth: 1
            },
        ],
    };

    return new Chart(ctx, {
        type: 'line',
        data: temperatureData,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: 'white' // Couleur des étiquettes de légende
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        color: 'white' // Couleur du texte de l'axe x
                    },
                },
                y: {
                    min: 0, // Valeur minimale de l'axe Y
                    max: 100, // Valeur maximale de l'axe Y
                    title: {
                        display: true,
                        color: 'white' // Couleur du texte de l'axe y
                    },
                }
            }
        },
    });
};

export default createChart;
