


let surahIndex = +localStorage.getItem("surahReadLink") + 1;
let quranPlayer=document.getElementById("quran-audio");
let backBtn = document.getElementById("back-btn")
let playBtn = document.getElementById("play-pause-btn")
let forwardBtn = document.getElementById("forward-btn")
let isPlay = false;
let ayahindex=0;
console.log(surahIndex);
let quranContainer = document.getElementById("quran-container");
console.log(quranContainer);
if (surahIndex != null) {
  function reqListener() {
      
window.addEventListener("load",()=>{
  let loader = document.getElementById("loader");

  loader.style.display="none"
})


    let ayahs = JSON.parse(req.responseText);
    // console.log(ayahs.length);
    if (surahIndex !== 1) {
        quranContainer.innerHTML += `
             <div class="bismillah">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</div> 
            `;    
      }
    for (let i = 0; i < ayahs.length; i++) {
      // console.log(ayahs[i]);
      quranContainer.innerHTML+=
      `
            
            <span data-num="${i}">${ayahs[i].arab}{${i+1}}</span>
           
        
      `
      
    }
    let ayahstext = document.querySelectorAll("#quran-container span")
    ayahstext.forEach((ayah,i)=>{
      ayah.onclick=function(){
        console.log(i)
        playAyah(i)
      }
    })
    function playAyah(index){
     
       ayahindex=index;
       console.log("aya"+ayahindex);
       if(ayahindex!=null){  
        quranPlayer.setAttribute("src",ayahs[ayahindex].audio.alafasy)
        quranPlayer.play()
        ayahHieghLight(ayahindex);
       isPlay=true;
       changePlayIcon()
} 
    
      

      
    }
    playAyah()

    function incrementAyah(){
      quranPlayer.addEventListener("ended",()=>{
        console.log("change")
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
  
      console.log(backBtn,playBtn,forwardBtn,quranPlayer)
     
      
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
      console.log("play")
      console.log(isPlay)
    }
    quranPlayer.onpause=function(){
     
     isPlay==false;
     changePlayIcon() ;
      console.log("pause")
      console.log(isPlay)
      
    }


    function nextPrevAyah(){
      
        backBtn.onclick=function(){
          if(ayahindex==0){
            ayahindex=0;
          }else{
            ayahindex--;
          }
          
          console.log(ayahindex)
          playAyah(ayahindex);
        }
        forwardBtn.onclick=function(){
          if(ayahindex  == ayahstext.length - 1){
            ayahindex=0;
          }else if(ayahindex < ayahstext.length - 1){
            ayahindex++;
          }
          
          console.log(ayahindex)
          playAyah(ayahindex);
        }
     
    }nextPrevAyah()


  } //request listener

 


const req = new XMLHttpRequest();
req.addEventListener("load", reqListener);
req.open("GET", "https://quran-api-id.vercel.app/surahs/"+surahIndex+"/ayahs");
req.send();
}


window.addEventListener("scroll",()=>{
  let quranPlayer = document.getElementById("quran-player");

  if(scrollY >= 300){
    console.log(scrollY)
    quranPlayer.classList.add("quran-player-scrolled");
  }else{
    quranPlayer.classList.remove("quran-player-scrolled")
  }
})
