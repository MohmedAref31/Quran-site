let surahs;
let surahsHolder=document.getElementById("surahs");
let quranPlayer = document.getElementById("quran-audio")
let backBtn = document.getElementById("back-btn")
let playBtn = document.getElementById("play-pause-btn")
let forwardBtn = document.getElementById("forward-btn")
let playNextBtn =document.getElementById("play-next-btn");
let randomBtn = document.getElementById("random-btn");
let listenBtn;
let surahnum=0;
let isPlay=false;
let isAutoPlayNext=false;
let playNextOn = false;
console.log(surahsHolder)
function getData() {
    loader.style.display="none";

    surahs=JSON.parse(this.responseText).data;
    surahs.forEach(s => {
        // console.log(s.asma.ar.long)
        surahsHolder.innerHTML +=`
        <div class="surah">
        <div class="surah-header">
            <div class="surah-name">${s.asma.ar.long}</div>
            <div class="surah-place">${s.type.ar}</div>
            <div class="surah-ayat-num"> اياتها ${s.ayahCount}</div>
        </div>
        <div class="surah-footer">
            <div class="read-surah">
                <a href="readsurah.html" class="read-link">
                قراءه
                </a>
            </div>
            <div class="listen-surah">
                استماع
            </div>
        </div>
    </div>

                     
                `
    });
    function readLink(){
        let link;
        let readBtn = document.querySelectorAll(".read-link")
        readBtn.forEach((l,i)=>{
            l.onclick=function(){
                localStorage.setItem("surahReadLink",i)
                let surahInfo = {
                    name:surahs[i].asma.ar.long
                }
                localStorage.setItem("surahInfo",JSON.stringify(surahInfo));
            }
        })
     }
    readLink()
    
     listenBtn = document.querySelectorAll(".listen-surah");
     function listenSurah(){
        let surahsAudioData=this.responseText;

        let surahsAudio=JSON.parse(surahsAudioData)["reciters"];
        let readersContainer = document.querySelector("#select-home-reader ul")
        let readerName=document.getElementById("reader-name-holder");
        let  homeReader;
        //     "server":"https://server6.mp3quran.net/akdr/",
        //     "name":"محمد صديق المنشاوي"
        // };
    
        if(localStorage.homeReaderL != null){
             homeReader=JSON.parse(localStorage.getItem("homeReaderL"));
            readerName.textContent=" القارئ "  + homeReader.name;
            
            }else{
              homeReader={
                "server":"https://server6.mp3quran.net/akdr/",
                "name":"محمد صديق المنشاوي"
            }
            readerName.textContent=" القارئ "  + homeReader.name;
        }
        
       
             
             
    
             surahsAudio.forEach(s=>{
                s.moshaf.forEach(r=>{
                readersContainer.innerHTML+=` <li value="${r.server}" data-name="${s.name}" > ${s.name} (${r.name})</li>`
    
                })
             })
             let readers= document.querySelectorAll("#select-home-reader ul li")
             readers.forEach(r=>{
                r.onclick=function(){
                    console.log(homeReader)
                    homeReader["server"]=r.getAttribute("value");
                    homeReader.name=r.getAttribute("data-name")
                    readerName.textContent=" القارئ "  +homeReader.name;
                    localStorage.setItem("homeReaderL",JSON.stringify(homeReader));
                }
             })
             
             function searchForReader(){
                let search=document.getElementById("reader-search")
                search.onkeyup=function(){
                    console.log("emmm")
                    if(search.value == ''){
                         readers.forEach(e=>{
    
                        e.style.display="block"
                    })
                    }
                   
                }
                search.oninput=function(){
                    
                    let searchVal=search.value.replace(/\s+/g, '');
                    let ismatch=false;
                    console.log(searchVal.split(''))
                    console.log(searchVal)
                    console.log(searchVal.length)
                    readers.forEach(e=>{
                        let readerNameSearch=e.getAttribute("data-name").replace(/\s+/g, '');
                        
                        if(searchVal.length <= readerNameSearch.length && searchVal.length > 0){
                            for(let i = 0 ; i < searchVal.length ; i++){
                               if( searchVal.split('')[i] == readerNameSearch.split('')[i]){
                                ismatch=true
                            }else{
                                ismatch=false;
                                break;
                                // console.log(searchVal.split('')[i] , readerNameSearch.split('')[i] , ismatch)
                                
                            }
                               
                            }
                        }else{
                            for(let i = 0 ; i < readerNameSearch.length ; i++){
                                if( searchVal.split('')[i] == readerNameSearch.split('')[i]){
                                    ismatch=true
                                }else{
                                    ismatch=false;
                                    break;
                                    // console.log(searchVal.split('')[i] , readerNameSearch.split('')[i] , ismatch)
                                    
                                }
                                   
                                }
                            }
                      
                        
                        if(searchVal.length == 0){
                            ismatch=false;
                        }
                        console.log(ismatch)
                       if(ismatch == true){
                            console.log(e)
                            e.style.display="block"
                       }else{
                        e.style.display="none"
                       }
                    })
               
            }
         
             }searchForReader()
             
        
        // console.log(listenBtn)
        listenBtn.forEach((s,i)=>{
            s.onclick=function(){
                console.log("done")
                surahnum=i;
              surah(surahnum);
              loader()
              isPlay=true;
              console.log(isPlay)
              quranPlayer.oncanplay=function(){
                playBtn.classList.remove("audio-loader")
              }
            }
            })
            function loader(){
                playBtn.classList.add("audio-loader")
                quranPlayer.oncanplay=function(){
                    playBtn.classList.remove("audio-loader")
                  }
            }
            function surah(index){
                console.log(index)
                index++;
                if(index<10){
                    index=`00${index}`;
                }else if(index<100){
                    index=`0${index}`;
    
                }else{
                    index=index;
                }
                
                let sa=`${homeReader["server"]}${index}.mp3`
                console.log(sa)
                quranPlayer.setAttribute("src",sa)
                quranPlayer.play()
                playBtn.innerHTML=` <ion-icon name="pause-circle-outline"></ion-icon>`
    
         
            }
    
            function togglePlay(){
                playBtn.onclick=function(){
                    if(isPlay){
                        quranPlayer.pause();
                        isPlay=false;
                        this.innerHTML=` <ion-icon name="play-circle-outline"></ion-icon>`
                        
                    }else{
                        quranPlayer.play();
                        isPlay=true;
                        this.innerHTML=` <ion-icon name="pause-circle-outline"></ion-icon>`
    
                    }
                }
            }togglePlay()
    
            function nextAndBack(){
                backBtn.onclick=function(){
                    loader()
                    if(surahnum == 0){
                        surahnum=0;
                        surah(surahnum);
                        isPlay=true;
                        togglePlay()
                    }else{
                        surahnum--;
                        surah(surahnum);
                    }
                }
                forwardBtn.onclick=function(){
                    loader()
                   playNext()
                }

                playNextBtn.onclick=()=>{
                    
                    playNextOn = !playNextOn;
                    playNextBtn.classList.toggle("play-next-active")
                    console.log(playNextOn)
                }
                quranPlayer.onended = function(){
                    if(playNextOn){
                        loader();
                        playNext();
                    }
                        
                }
                function playNext(){
                    if(surahnum == 113){
                        surahnum=0;
                        surah(surahnum);
                    }else{
                        surahnum++;
                        surah(surahnum);
                        isPlay=true;
                        togglePlay()
                    }
                }

                randomBtn.onclick = ()=>{
                    let random = (Math.random()*113).toFixed(0);
                    surahnum = random;
                    surah(surahnum);
                    isPlay=true;
                    togglePlay()
                    loader
                }
            }nextAndBack()
            
          
        }  
    
    
        const surahsAudio = new XMLHttpRequest();
        surahsAudio.addEventListener("load", listenSurah);
        surahsAudio.open("GET", "Quran-Api-main/readers.json");
        surahsAudio.send();
    

    
    
  }//get data
  
  const req = new XMLHttpRequest();
  req.addEventListener("load", getData);
  req.open("GET", "https://quran-endpoint.vercel.app/quran");
  req.send();
  



 










//   window.addEventListener("load",()=>{
//     let loader = document.getElementById("loader");
  
//     loader.style.display="none"
//   })

  window.addEventListener("scroll",()=>{
    let quranPlayer = document.getElementById("quran-player");
  
    if(scrollY >= 300){
    //   console.log(scrollY)
      quranPlayer.classList.add("quran-player-scrolled");
    }else{
      quranPlayer.classList.remove("quran-player-scrolled")
    }
  })