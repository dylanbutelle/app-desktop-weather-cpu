// chart.js

const createWeatherChart = (container, data) => {
    const dateLabels = [];
    const tempData = [];

    for (let i = 0; i < data.list.length; i++) {
        dateLabels.push(data.list[i].dt_txt);
        tempData.push(data.list[i].main.temp);
    }

    const canvas = document.createElement('canvas');
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    const temperatureData = {
        labels: dateLabels,
        datasets: [
            {
                label: 'Température extérieures (°C)',
                data: tempData,
                borderColor: 'rgb(255,255,255)',
                backgroundColor: 'rgba(255,243,243,0.2)',
                pointRadius: 1,
                pointBackgroundColor: 'rgb(244,255,255)',
                fill: true,
                borderWidth: 1,
                color: 'rgb(255,255,255)',
            },
        ],
    };

    return new Chart(ctx, {
        type: 'line',
        data: temperatureData,
        options: {
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
                    title: {
                        display: true,
                        color: 'white' // Couleur du texte de l'axe y
                    },
                }
            }
        }
    });
};

export default createWeatherChart;
