let darkSwitch = document.getElementsByClassName("dark-switch")[0];
let darkSwitchContent = document.querySelector(".dark-switch span")
let body = document.body
darkSwitch.addEventListener("click", function(){
    body.classList.toggle("dark")
    darkSwitchContent.classList.toggle("dark-switch-move");
    if(darkSwitchContent.classList.contains("dark-switch-move")){
        darkSwitchContent.innerHTML="🌞"
    }else{
        darkSwitchContent.innerHTML="🌙"
    }
})

