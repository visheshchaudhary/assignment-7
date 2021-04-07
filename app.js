const form=document.getElementById('form');
const list=document.getElementById('info');
const leftcontainer=document.getElementById('leftsection');
let weatherinfo=function(city)
{
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=c89bd6e6037d67309e344cede93a71a9&units=metric`)
    .then(response => {
        if (response.status!=200){
            return response.json()
                .catch(() => {
                    throw new Error(response.status);
                })
                .then(({message}) => {
                    throw new Error(message || response.status);
                });
        }
        return response.json();
    })
    .then(parseddata=>{
        detailsleftcontainer(parseddata);
        detailsrightcontainer(parseddata);
    })
    .catch((err)=>{
        console.log(err);
        alert('Not a City');
    })
}
function detailsleftcontainer(parseddata)
{
    const tempdata=`${parseddata.main.temp} °C`;
    // const temp=document.createTextNode(parseddata.main.temp);
    // const temp=document.createTextNode(tempdata);
    // const currweather=document.createTextNode(parseddata.weather.description);
    // leftcontainer.appendChild(temp);
    //leftcontainer.appendChild(currweather);
    var iconcode = parseddata.weather[0].icon;
    var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
    const image=document.getElementById('weathericon');
    image.src=iconurl;
}
function detailsrightcontainer(parseddata){
    const curr_temp=document.createElement('li');
    curr_temp.innerText=`Current Temp : ${parseddata.main.temp} °C`;
    list.appendChild(curr_temp);
    const curr_weather=document.createElement('li');
    curr_weather.innerText=`Weather : ${parseddata.weather[0].description}`;
    list.appendChild(curr_weather);
    const max_temp=document.createElement('li');
    max_temp.innerText=`Max Temp : ${parseddata.main.temp_max} °C`;
    list.appendChild(max_temp);
    const min_temp=document.createElement('li');
    min_temp.innerText=`Min Temp : ${parseddata.main.temp_min} °C`;
    list.appendChild(min_temp);
    const wind_speed=document.createElement('li');
    wind_speed.innerText=`Wind Speed: ${parseddata.wind.speed} km/h`;
    list.appendChild(wind_speed);
}
form.addEventListener('submit', (e) => {
    e.preventDefault();
    while(list.firstChild) list.removeChild(list.firstChild);
    const image=document.getElementById('weathericon');
    image.src="";
    const searchText = form.elements[0].value;
    weatherinfo(searchText);
    form.elements[0].value = "";
})















