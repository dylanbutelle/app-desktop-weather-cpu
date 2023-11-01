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
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                pointRadius: 1,
                pointBackgroundColor: 'rgba(75, 192, 192, 1)',
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
        },
    });
};

export default createWeatherChart;
