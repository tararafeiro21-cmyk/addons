// Weather dashboard client (ES module)
import { OPENWEATHER_API_KEY } from './config.js';

const form = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const result = document.getElementById('result');
const loading = document.getElementById('loading');
const errorBox = document.getElementById('error');

const els = {
  city: document.getElementById('city'),
  desc: document.getElementById('desc'),
  temp: document.getElementById('temp'),
  feels: document.getElementById('feels'),
  humidity: document.getElementById('humidity'),
  wind: document.getElementById('wind'),
  icon: document.getElementById('icon'),
};

function showLoading() {
  loading.classList.remove('hidden');
  errorBox.classList.add('hidden');
  result.classList.add('hidden');
}
function hideLoading() { loading.classList.add('hidden'); }
function showError(msg){ errorBox.textContent = msg; errorBox.classList.remove('hidden'); }

async function fetchWeatherByCity(city){
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${OPENWEATHER_API_KEY}&units=metric`;
  return fetchWeather(url);
}

async function fetchWeatherByCoords(lat, lon){
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`;
  return fetchWeather(url);
}

async function fetchWeather(url){
  showLoading();
  try{
    const res = await fetch(url);
    if(!res.ok){
      const data = await res.json().catch(()=>({message: res.statusText}));
      throw new Error(data.message || `HTTP ${res.status}`);
    }
    const data = await res.json();
    renderWeather(data);
  }catch(err){
    showError(err.message || 'Failed to fetch weather');
  }finally{
    hideLoading();
  }
}

function renderWeather(data){
  if(!data || !data.weather) { showError('No data'); return; }
  els.city.textContent = `${data.name}, ${data.sys?.country || ''}`;
  const w = data.weather[0];
  els.desc.textContent = w.description;
  els.temp.textContent = `${Math.round(data.main.temp)} °C`;
  els.feels.textContent = `${Math.round(data.main.feels_like)} °C`;
  els.humidity.textContent = `${data.main.humidity} %`;
  els.wind.textContent = `${(data.wind.speed || 0)} m/s`;
  if(w.icon){
    els.icon.src = `https://openweathermap.org/img/wn/${w.icon}@2x.png`;
    els.icon.alt = w.description;
  } else { els.icon.src = ''; els.icon.alt = ''; }

  result.classList.remove('hidden');
  errorBox.classList.add('hidden');
}

form.addEventListener('submit', (e)=>{
  e.preventDefault();
  const city = cityInput.value.trim();
  if(!city){ showError('Please enter a city'); return; }
  fetchWeatherByCity(city);
});

const geoBtn = document.getElementById('geo-btn');
geoBtn.addEventListener('click', ()=>{
  if(!navigator.geolocation){ showError('Geolocation not supported'); return; }
  showLoading();
  navigator.geolocation.getCurrentPosition((pos)=>{
    fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude);
  }, (err)=>{
    hideLoading();
    showError(err.message || 'Failed to get your location');
  });
});
