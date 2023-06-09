let timeContainer = document.getElementById("time-container");
let hours ;
let min;
let sec;
let mornintOrNight;

let getTime = ()=>{
    let time= new Date()

    if(time.getHours() > 12){
        hours = time.getHours() - 12 ;
        mornintOrNight = "م";
    }else{
        hours = time.getHours();
        mornintOrNight = "ص";
    }

    if(time.getSeconds() < 10){
        sec = "0" + time.getSeconds().toString()
        
    }else{
        sec = time.getSeconds().toString();
    }

    if(time.getMinutes() < 10){
        min = "0" + time.getMinutes().toString()
        
    }else{
        min = time.getMinutes().toString();
    }
    timeContainer .innerHTML = `${sec} : ${min} : ${hours} ${mornintOrNight}`
   
}



window.setInterval(getTime,1000)