let settingsFram = document.getElementById("settings");
let toggleClose = document.getElementById("toggle-close");
let reader=document.getElementById("select-reader");
let quranBackground = document.querySelectorAll(".settings .colors div");
let fontSize = document.getElementById("font-size-num");
let fontIncrease=document.getElementById("increase-size")
let fontDecrease=document.getElementById("decrease-size")
let quranContainerN=document.getElementById("quran-container");
let showReaderName= document.getElementById("show-reader-name");
let settings;

console.log(localStorage.settings)

toggleClose.onclick=function(){
    settingsFram.classList.toggle("settings-closed")
}
settingsFram.onblur=function(){
    settingsFram.classList.add("settings-closed")
}


if(localStorage.settings != null){
settings=JSON.parse(localStorage.settings);

}else{
     settings = {
    reader:"alafasy",
    readerAr:"مشاري راشد العفاسى",
    quranBackground:"#000",
    fontSize:1.5,
    fontColor:"white",
}
localStorage.setItem("settings", JSON.stringify(settings))
}




// reader.oninput=function(){
//     applySets()
   
//     // console.log(JSON.parse(localStorage.getItem("settings")))
// }

quranBackground.forEach(e=>{
    e.onclick=function(){
        console.log(e.getAttribute("value"))
        settings.quranBackground=e.getAttribute("value");
        settings.color=e.getAttribute("data-color");
        localStorage.setItem("settings",JSON.stringify(settings))
        applySets()
    }
})

function changeFontSize(){
    fontSize.innerHTML = +(settings.fontSize * 10);
   
        fontIncrease.onclick=function(){
            if(settings.fontSize < 2.5){
            settings.fontSize +=.5;
            
            console.log(settings.fontSize)
            fontSize.innerHTML = +(settings.fontSize * 10);
            localStorage.setItem("settings",JSON.stringify(settings));
            applySets()
            }
        } 
         fontDecrease.onclick=function(){
            if(settings.fontSize > 1.5){
            
            settings.fontSize -=.5;
            fontSize.innerHTML = +(settings.fontSize * 10);
            console.log(settings.fontSize)
            localStorage.setItem("settings",JSON.stringify(settings));
            applySets();
        }
    }
}
changeFontSize()



function applySets(){
    let sets=JSON.parse(localStorage.getItem("settings"));
    console.log(sets)
    quranContainerN.style.background = sets.quranBackground;
    quranContainerN.style.color = sets.color;
    quranContainerN.style.fontSize = +(sets.fontSize) + "rem";
    showReaderName.innerHTML = "القارئ "+sets.readerAr;

}
applySets()
