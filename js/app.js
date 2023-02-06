let timeImg = document.querySelector('[data-js="time"]')
const cButton = document.querySelector('[data-js="c-btn"]')
const fButton = document.querySelector('[data-js="f-btn"]')
const btnGroup = document.querySelector('.btn-group')
const tempFormat = document.querySelector('[data-js="temp-format"]')
const timeIconContainer = document.querySelector('[data-js="time-icon"]')
const cityForm = document.querySelector('[data-js="change-location"]')
const cityCard = document.querySelector('[data-js="city-card"]')
const cityNameContainer = document.querySelector('[data-js="city-name"]')
const cityWeatherContainer = document.querySelector('[data-js="city-weather"]')
const cityTemperatureContainer = document
    .querySelector('[data-js="city-temperature"]')

const addClass = (elem, cls) => elem.classList.add(cls)
const removeClass = (elem, cls) => elem.classList.remove(cls)
const showCityCard = () => cityCard.classList.remove('d-none')

const dayDisplay = {
    svgPath: './src/day.svg',
    class: 'day-border',
    removedClass: 'night-border'
}

const nightDisplay = {
    svgPath: './src/night.svg',
    class: 'night-border',
    removedClass: 'day-border'
}

const displayInterface = obj => {
    timeImg.src = obj.svgPath
    removeClass(timeImg, obj.removedClass)
    removeClass(timeIconContainer, obj.removedClass)
    addClass(timeIconContainer, obj.class)
    addClass(timeImg, obj.class)
}

const addTextContentToHTML = (HTMLContainer, contentToBeAdded) => 
    HTMLContainer.textContent = contentToBeAdded

const showCityWeatherInfo = async cityName => {
    const [{ Key, LocalizedName }] =  await getCityData(cityName)
    const [{ WeatherText, Temperature, IsDayTime, WeatherIcon }] = await getCityWeather(Key)
    const timeIcon = `<img src="./src/icons/${WeatherIcon}.svg" />`
    const cityTemperature = Temperature.Metric.Value

    displayInterface(IsDayTime ? dayDisplay : nightDisplay)

    timeIconContainer.innerHTML = timeIcon
    addTextContentToHTML(cityNameContainer, LocalizedName)
    addTextContentToHTML(cityWeatherContainer, WeatherText)
    addTextContentToHTML(cityTemperatureContainer, cityTemperature)
}

const toggleTemperatureButton = button => {
    button.addEventListener('click', async event => {
        const [{ Key }] =  await getCityData(cityNameContainer.textContent)
        const [{ Temperature }] = await getCityWeather(Key)
        const celsiusMetric =  Temperature.Metric.Value
        const imperialMetric = Temperature.Imperial.Value

        if(button === cButton) {
            addTextContentToHTML(cityTemperatureContainer,celsiusMetric)
            tempFormat.textContent = `°C`
        } else if (button === fButton) {
            addTextContentToHTML(cityTemperatureContainer, imperialMetric)
            tempFormat.textContent = `°F`
        }
    })
}

cityForm.addEventListener('submit', event => {
    event.preventDefault()

    const inputValue = event.target.city.value 
   
    showCityCard()
    showCityWeatherInfo(inputValue)

    cityForm.reset()

    removeClass(btnGroup, 'd-none')
    cButton.focus()
    tempFormat.textContent = `°C`
})

toggleTemperatureButton(cButton)
toggleTemperatureButton(fButton)

