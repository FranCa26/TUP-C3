const { useState, useEffect } = React;

const apiKey = 'd5e62c8e3ef2c4a7ee50b3b5f0ae521c';

const WeatherApp = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);

    const cities = ['Tucumán', 'Salta', 'Buenos Aires'];

    const fetchWeather = async (NombreCiudad) => {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${NombreCiudad}&appid=${apiKey}&units=metric&lang=es`);
        const data = await response.json();
        setWeatherData(data);
    };

    useEffect(() => {
        // Ciudad de por defecto
        fetchWeather('Tucumán');
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (city) {
            fetchWeather(city);
        }
    };

    return (
        <div>
            <div className="cabecera">
                <h1 className="Titulo">Clima</h1>
                <div>
                    {cities.map((NombreCiudad) => (
                        <button key={NombreCiudad} onClick={() => fetchWeather(NombreCiudad)}>
                            {NombreCiudad}
                        </button>
                    ))}
                </div>
            </div>
            <form onSubmit={handleSearch}>
                <input
                    type="search"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Buscar ciudad"
                    aria-label="Search"
                />
            </form>
            {weatherData && (
                <div className="panelClima">
                    <h2 className="ciudadName">{weatherData.name}</h2>
                    <div className="icono">
                        <img src={`./iconos/${weatherData.weather[0].icon}.svg`} alt="weather icon" />
                    </div>
                    <h1 className="temperatura">Temp: {weatherData.main.temp.toFixed(1)} °C</h1>
                    <p className="minima">Mínima: {weatherData.main.temp_min.toFixed(1)} °C / Máxima: {weatherData.main.temp_max.toFixed(1)} °C</p>
                    <p className="humedad">Humedad: {weatherData.main.humidity}%</p>
                </div>
            )}
        </div>
    );
};

ReactDOM.render(<WeatherApp />, document.getElementById('root'));