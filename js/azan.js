function findCity  (){
    let latitude;
    let longitude;
    const success = (position)=>{
        console.log(position)
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        console.log(latitude,longitude)
        function getCityData(){
            let data = JSON.parse(this.responseText);
            let country =data.countryCode;
            // let city = data.principalSubdivisionCode;
            let city = data.city;
            console.log(country, city)

            function getAzanData(){
              
                let getAzanTimes = JSON.parse(this.responseText).data.timings;
                fillAzanTime("Fajr");
                fillAzanTime("Sunrise");
                fillAzanTime("Dhuhr");
                fillAzanTime("Asr");
                fillAzanTime("Maghrib");
                fillAzanTime("Isha");
                function fillAzanTime(id){
                   
                    document.getElementById(id).innerHTML = getAzanTimes[`${id}`];
                }

                function getTheNextAzan(){
                    console.log(getAzanTimes)
                    let nextAzanContainer = document.querySelectorAll("#times li .pr-time");
                    let remainingContainer = document.querySelectorAll("#times li .pr-remaining")

                    let time = new Date();

                    let actualTime = (time.getHours() +":"+time.getMinutes()).toString();

                    console.log(actualTime > getAzanTimes.Asr,nextAzanContainer)
                    let nextAzahH
                    let nextAzahM

                    for(let i = 0 ; i < nextAzanContainer.length ; i++){

                        console.log(nextAzanContainer[i])
                        nextAzahH =+(getAzanTimes[`${nextAzanContainer[i].id}`].split(":")[0]);
                        nextAzahM =+(getAzanTimes[`${nextAzanContainer[i].id}`].split(":")[1]);
                        console.log(nextAzahH,nextAzahM)
                        if(actualTime < getAzanTimes[`${nextAzanContainer[i].id}`]){
                              let remainingTime = +((+nextAzahH*60 + +nextAzahM) - (time.getHours()*60 + time.getMinutes()));
                            let remainingTimeH = remainingTime / 60;
                            let remainingTimeM = remainingTime % 60;
                            console.log("remaining is " + remainingTime)
                            remainingContainer[i].innerHTML =`${remainingTimeM < 10? "0" + remainingTimeM:remainingTimeM} : ${remainingTimeH < 10? "0" + remainingTimeH >= 1 ? remainingTimeH.toFixed(0):"00":remainingTimeH.toFixed(0)}`
                            remainingContainer[i].classList.add("active");
                            if(remainingTimeH > 1){
                                remainingContainer[i].style.color=" rgb(128, 236, 128)";
                            }else{
                                if(remainingTimeM <= 30)
                                    remainingContainer[i].style.color="#ff3232";
                                else
                                 remainingContainer[i].style.color=" rgb(128, 236, 128)";
                                
                                
                            }
                            break;
                        }else{
                            remainingContainer[i].classList.remove("active")
                        }
                    }
                    remainingContainer.forEach(e=>{
                        if(e.classList.contains("active"))
                            e.style.display="block";
                        else
                        e.style.display="none";
                    })

                }
                window.setInterval(getTheNextAzan,1000)
            }

            const getAzanTimes= new XMLHttpRequest();
            getAzanTimes.addEventListener("load", getAzanData);
            getAzanTimes.open("GET",`http://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=8`);
            getAzanTimes.send();
        }
        const getCity = new XMLHttpRequest();
        getCity.addEventListener("load", getCityData);
        getCity.open("GET",`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
        getCity.send();
    }
    const notSccess = ()=>{
       console.log("can't found")
       alert("عذرا لا يمككنا تحديد موقعك وبالتالى لا يمكن تحديد اوقات الاصلاه")
    }
    navigator.geolocation.getCurrentPosition(success, notSccess)
   
}

findCity()