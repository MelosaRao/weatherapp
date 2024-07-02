const forecast_today = document.querySelector('#today')
const forecast_tommorrow = document.querySelector('#tommorrow')
const forecast_after = document.querySelector('#aftertommorrow')

async function getWeather(value = 'New York'){
    try{
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=2c08a4b9e8de4f94bce112400240107&q=${value}&days=3&aqi=yes&alerts=no`)
    const weather = await response.json()
    updatelocation(weather.location.name, weather.location.country, weather.location.localtime)
    updatetemp(weather.current.feelslike_c, weather.current.feelslike_f,weather.current.temp_c,weather.current.temp_f,true)
    updatecondition(weather.current.condition.text, weather.current.condition.icon)
    
    updateforcast(forecast_today,weather.forecast.forecastday[0])
    
    updateforcast(forecast_tommorrow,weather.forecast.forecastday[1])

    updateforcast(forecast_after,weather.forecast.forecastday[2])}

    catch{

        getWeather();
    }



}

getWeather()
const city = document.querySelector('#city')
const submit = document.querySelector('#submit')

submit.addEventListener('click', (event)=>{
    event.preventDefault();
    let str_city = `${city.value}`
    getWeather(str_city);
})

function updatecondition(cond,icon){
    const condition = document.querySelector('#condition')
    condition.innerHTML = cond
    document.querySelector('#cond_today').src= `https:${icon}`
}

function updatelocation(name,country,time){
    const location = document.querySelector('#location')
    location.innerText = `${name}, ${country} ${time}`
}

function updatetemp(feel_c,feel_f,real_c,real_f, c=true){
    const feels_like = document.querySelector('.feelslike')
    const real_temp = document.querySelector('.realtemp')
    if(c){
        feels_like.innerText = `Feels Like: ${feel_c} \u00B0 C`
        real_temp.innerText = `Temperature: ${real_c} \u00B0 C`
    }
    else{
        feels_like.innerText = `${feel_f} \u00B0 F`
        real_temp.innerText = `${real_f} \u00B0 F`
    }
    
}

function updateforcast(daygiven,forecast){
    daygiven.innerHTML = ''
    const date = document.createElement('div')
    date.innerText = `${forecast.date}`

    const img = document.createElement('img')
    img.src = `https:${forecast.day.condition.icon}` 

    const condition = document.createElement('div')
    condition.innerText = `${forecast.day.condition.text}`

    const avgtemp = document.createElement('div')
    avgtemp.innerText = `Avg Temperature: ${forecast.day.avgtemp_c} \u00B0 C`

    daygiven.appendChild(date)
    daygiven.appendChild(img)
    daygiven.appendChild(condition)
    daygiven.appendChild(avgtemp)
}