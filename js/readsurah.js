
let loader = document.getElementById("loader");
let surahIndex = +localStorage.getItem("surahReadLink") + 1;
let surahInfo=JSON.parse(localStorage.getItem("surahInfo"));
let quranPlayer=document.getElementById("quran-audio");
let backBtn = document.getElementById("back-btn")
let playBtn = document.getElementById("play-pause-btn")
let forwardBtn = document.getElementById("forward-btn")
let readerAr=document.querySelectorAll("#select-reader option");
////console.log(readerAr)
let isPlay = false;
let ayahindex=0;
//console.log(surahIndex);
let quranContainer = document.getElementById("quran-container");
//console.log(quranContainer);
if (surahIndex != null) {
  function reqListener() {
      
    loader.style.display="none"

  

    let ayahs = JSON.parse(req.responseText);
    //console.log(ayahs);
    quranContainer.innerHTML+=`<div class="surah-name">
    <div class="surah-name-image">
    <img src="images/surah-header.png">
   
    </div> 
     <p> ${surahInfo.name}</p>
    </div>`
    if (surahIndex !== 1) {
        quranContainer.innerHTML += `
             <div class="bismillah" style="text-align:center">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</div> 
            `;    
      }
    for (let i = 0; i < ayahs.length; i++) {
      // //console.log(ayahs[i]);
      quranContainer.innerHTML+=
      `
            
            <span data-num="${i}">${ayahs[i].arab}<b class="ayah-num">${i+1}</b></span>
           
        
      `
      
    }
    let ayahstext = document.querySelectorAll("#quran-container span")
    ayahstext.forEach((ayah,i)=>{
      ayah.onclick=function(){
        //console.log(i)
        playAyah(i)
      }
    })
    function playAyah(index){
     
       ayahindex=index;
       //console.log("aya"+ayahindex);
       if(ayahindex!=null){  
        let readerName =ayahs[ayahindex].audio[JSON.parse(localStorage.getItem("settings"))["reader"]];
        //console.log(readerName)
        quranPlayer.setAttribute("src",readerName)
        quranPlayer.play()
        ayahHieghLight(ayahindex);
       isPlay=true;
       changePlayIcon()
       playBtn.classList.add("audio-loader")
       quranPlayer.oncanplay=function(){
        playBtn.classList.remove("audio-loader")
      }
       
} 
    
      

      
    }
    playAyah()

    reader.oninput=function(){
      //console.log(settings.reader)
      settings.reader=reader.value;
      //console.log(settings)

      readerAr.forEach(r=>{
        if(r.getAttribute("value") == settings.reader){
          //console.log(r.innerHTML)
          settings.readerAr=r.innerHTML;
        }
      })
      localStorage.setItem("settings",JSON.stringify(settings));
      // //console.log(JSON.parse(localStorage.getItem("settings")))
      applySets();
      playAyah(ayahindex)
  }

    function incrementAyah(){
      quranPlayer.addEventListener("ended",()=>{
        //console.log("change")
        ayahindex++
        
        if(ayahindex <= ayahstext.length - 1){
          playAyah(ayahindex)
          ayahHieghLight(ayahindex)
        }else{
          ayahindex=0;
          playAyah(ayahindex)
        }
      })
    }
    incrementAyah()
    function ayahHieghLight(index){
      ayahstext.forEach(a=>{
        a.classList.remove("active");
      })
      ayahstext[index].classList.add("active")
    }
    function audioPlayer(){
  
      //console.log(backBtn,playBtn,forwardBtn,quranPlayer)
     
      
      playBtn.onclick=function(){
        
      
       if(quranPlayer.getAttribute("src")==''){
        ayahindex=0;
        playAyah(ayahindex)
        quranPlayer.play()
        isPlay=true;

       }else{ 
        if(isPlay){
          quranPlayer.pause()
          isPlay=false;
        }else{
          quranPlayer.play()
          isPlay=true;
        } 
        changePlayIcon()
       }
         
      }
    
      changePlayIcon()
    }
    audioPlayer()

     function changePlayIcon(){
      if(isPlay){
        playBtn.innerHTML=`<ion-icon name="pause-circle-outline"></ion-icon>`
      }else{
        playBtn.innerHTML=`<ion-icon name="play-circle-outline"></ion-icon>`
      } 
     }
     quranPlayer.onplay=function(){
  
     isPlay==true; 
       changePlayIcon() ;
      //console.log("play")
      //console.log(isPlay)
    }
    quranPlayer.onpause=function(){
     
     isPlay==false;
     changePlayIcon() ;
      //console.log("pause")
      //console.log(isPlay)
      
    }


    function nextPrevAyah(){
      
        backBtn.onclick=function(){
          if(ayahindex==0){
            ayahindex=0;
          }else{
            ayahindex--;
          }
          
          //console.log(ayahindex)
          playAyah(ayahindex);
        }
        forwardBtn.onclick=function(){
          if(ayahindex  == ayahstext.length - 1){
            ayahindex=0;
          }else if(ayahindex < ayahstext.length - 1){
            ayahindex++;
          }
          
          //console.log(ayahindex)
          playAyah(ayahindex);
        }
     
    }nextPrevAyah()

    function goToAyah(){
      let ayahNum = document.getElementById("ayah-num");
      let gotoAyahBtn = document.getElementById("goto-ayah-btn");

      ayahNum.setAttribute("placeholder",`أذهب الى اية بين 1~${ayahs.length}`)
      ayahNum.setAttribute("max",ayahs.length)

      gotoAyahBtn.onclick=function(){
        if(ayahNum.value != "" && ayahNum.value <= ayahs.length){
          window.scrollTo(0,ayahstext[ayahNum.value - 1].offsetTop - 300);
          //console.log(ayahstext[ayahNum.value - 1].offsetTop)
          ayahindex=ayahNum.value - 1;
          playAyah(ayahindex)
        }
      }

    }
    goToAyah()

    
  } //request listener

 


const req = new XMLHttpRequest();
req.addEventListener("load", reqListener);
req.open("GET", "https://quran-api-id.vercel.app/surahs/"+surahIndex+"/ayahs");
req.send();
}


window.addEventListener("scroll",()=>{
  let quranPlayer = document.getElementById("quran-player");

  if(scrollY >= 300){
    quranPlayer.classList.add("quran-player-scrolled");
  }else{
    quranPlayer.classList.remove("quran-player-scrolled")
  }
})

