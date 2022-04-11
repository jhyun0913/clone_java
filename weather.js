const weather = document.querySelector(".js-weather")

//https://openweathermap.org/ API key site
const API_KEY = "3a1733299e0965410326ca99b2e9f41a";
const COORDS  = 'coords';

function getWeather(lat, lng){
    fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function(respons){
        return respons.json();
    }).then(function(json){
        console.log(json);
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature}℃ ${place}`;
    });
}

function saveCoords(coordsObj){
    //JSON 변환하여 저장
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
//    console.log(position)
    //위도,경도 읽어오기
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude    
    };
    saveCoords(coordsObj);
    getWeather(latitude,longitude);
}

function handleGeoError(){
    console.log('Cant access geo location');
}

function askForCoords(){
    //navigator API 자기 위치 찾기
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError); 
}

function loadCoords(){
    const loadedCords = localStorage.getItem(COORDS);
    if(loadedCords == null){
        askForCoords();
    }else{
        //JSON 형태 Object로 반환
        const parseCoords = JSON.parse(loadedCords);
        //console.log(parseCoords);
        getWeather(parseCoords.latitude,parseCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init();