const apiKey="2d916643c0c301733fd0e122e64f5c57";
const url="https://api.openweathermap.org/data/2.5/weather?units=metric&q="

const searchinput=document.querySelector(".ip");
const searchbtn=document.querySelector(".searchbtn");


async function checkWeather(city){

    city=city.trim();
    if(city===""){
        alert("Enter city name");
        return;
    }
    const response=await fetch(url + encodeURIComponent(city) + `&appid=${apiKey}`);
    if(!response.ok){    
        document.querySelector(".invalid").style.display="block";
        document.querySelector(".d3").style.display="none";
        document.querySelector(".ip").value="";
        return;
    }

    var data=await response.json();

    document.querySelector(".temp").innerHTML=Math.round(data.main.temp) + "°c";
    document.querySelector(".city").innerHTML=data.name;
    document.querySelector(".humidity").innerHTML=data.main.humidity + "%";
    document.querySelector(".wind").innerHTML=data.wind.speed + " km/h";

    document.querySelector(".d3").style.display="block";
    document.querySelector(".invalid").style.display="none";

    document.querySelector(".ip").value="";         
    
}
    

searchbtn.addEventListener("click",()=>{
    checkWeather(searchinput.value);
})

