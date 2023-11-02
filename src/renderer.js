// renderer.js

import createChart from './charts/charts.js';
import getWeatherData from './weather/weather.js';
import createWeatherChart from "./charts/weather.charts.js";

const weather = document.getElementById('weather');
const cpu = document.getElementById('cpu');
const temperatureChart = createChart(cpu);
const input = document.getElementsByTagName('input')[0];
const help = document.getElementById('open-notifications');
let value = input.value;
let wasHot = false;

input.addEventListener('keyup', () => {
  value = input.value
})

help.addEventListener('click', () => {
  window.versions.openParameters().then(r => console.log(r));
})

const addDataPoint = async () => {
  try {
    const response = await window.versions.getCpuTemperature();
    const now = new Date().toLocaleTimeString();

    temperatureChart.data.labels.push(now);
    temperatureChart.data.datasets[0].data.push(response.main);

    temperatureChart.update();

    if (temperatureChart.data.labels.length > 6) {
      temperatureChart.data.labels.shift();
      temperatureChart.data.datasets[0].data.shift();
    }

    let isHot = response.main > value;

    if (isHot && !wasHot) {
      await window.versions.showNotification('Température élevée', `La température du CPU est de plus de ${value}°C.`);
      wasHot = true;  // Met à jour l'état précédent de isHot
    } else if (!isHot) {
      wasHot = false;  // Met à jour l'état précédent de isHot lorsque isHot repasse en dessous de value
    }

  } catch (error) {
    console.error(error);
    weather.innerText = 'Erreur lors de la récupération de la température CPU';
  }
};

// Récupérez les données météo
const weatherData = await getWeatherData();
createWeatherChart(weather, weatherData);

setInterval(addDataPoint, 5000);
addDataPoint();
