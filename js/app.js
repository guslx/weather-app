const cityForm = document.querySelector('[data-js="change-location"]')
const cityNameContainer = document.querySelector('[data-js="city-name"]')
const cityWeatherContainer = document.querySelector('[data-js="city-weather"]')
const cityTemperatureContainer = document
    .querySelector('[data-js="city-temperature"]')
const cityCard = document.querySelector('[data-js="city-card"]')
let timeImg = document.querySelector('[data-js="time"]')
const timeIconContainer = document.querySelector('[data-js="time-icon"]')

cityForm.addEventListener('submit', async event => {
    event.preventDefault()

    const inputValue = event.target.city.value 
    const [{ Key, LocalizedName }] =  await getCityData(inputValue)
    const [{ WeatherText, Temperature, IsDayTime, WeatherIcon }] = await getCityWeather(Key)
    const timeIcon = `<img src="./src/icons/${WeatherIcon}.svg" />`
    const addClass = (elem, cls) => elem.classList.add(cls)
    const removeClass = (elem, cls) => elem.classList.remove(cls)

    cityCard.classList.remove('d-none')

    if (IsDayTime) {
        timeImg.src = './src/day.svg'
        removeClass(timeImg, 'night-border')
        removeClass(timeIconContainer, 'night-border')
        addClass(timeIconContainer, 'day-border')
        addClass(timeImg, 'day-border')
    } else {
        timeImg.src = './src/night.svg'
        removeClass(timeImg, 'day-border')
        removeClass(timeIconContainer, 'day-border')
        addClass(timeIconContainer, 'night-border')
        addClass(timeImg, 'night-border')
    }
    


    timeIconContainer.innerHTML = timeIcon
    cityNameContainer.textContent = LocalizedName
    cityWeatherContainer.textContent = WeatherText
    cityTemperatureContainer.textContent = Temperature.Metric.Value


    cityForm.reset()
}) 