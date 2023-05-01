let surahs;
let surahsHolder=document.getElementById("surahs");
let quranPlayer = document.getElementById("quran-audio")
let backBtn = document.getElementById("back-btn")
let playBtn = document.getElementById("play-pause-btn")
let forwardBtn = document.getElementById("forward-btn")
let surahnum=0;
let isPlay=false;
let isAutoPlayNext=false;
console.log(surahsHolder)
function getData() {
    surahs=JSON.parse(this.responseText).data;
    surahs.forEach(s => {
        // console.log(s.asma.ar.long)
        surahsHolder.innerHTML +=`
        <div class="surah">
        <div class="surah-header">
            <div class="surah-name">${s.asma.ar.long}</div>
            <div class="surah-place">${s.type.ar}</div>
            <div class="surah-ayat-num">عدد اياتها ${s.ayahCount}</div>
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
            }
        })
     }
    readLink()
    console.log(surahs)

function listenSurah(){
    let listenBtn = document.querySelectorAll(".listen-surah");
    // console.log(listenBtn)
    listenBtn.forEach((s,i)=>{
        s.onclick=function(){
            surahnum=i;
          surah(surahnum);
          
          isPlay=true;
          console.log(isPlay)
        }
        })

        function surah(index){
            console.log(index)
            function getAudio(){
            let surahsAudio = JSON.parse(this.responseText)
            let surahsName=Object.keys(surahsAudio);
            let sa=surahsAudio[surahsName[index]]["source"]
            // console.log(surahsAudio)
            // console.log(surahsAudio[surahsName[113]]["source"])
            quranPlayer.setAttribute("src",sa)
            quranPlayer.play()
            playBtn.innerHTML=` <ion-icon name="pause-circle-outline"></ion-icon>`

            
        }
          const surahAudioRequest = new XMLHttpRequest();
          surahAudioRequest.addEventListener("load", getAudio);
          surahAudioRequest.open("GET", "Quran-Api-main/surahs-afasy.json");
          surahAudioRequest.send();
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
        }nextAndBack()
        
        function autoPlayNext(){

        }
    }  listenSurah()



    
  }//get data
  
  const req = new XMLHttpRequest();
  req.addEventListener("load", getData);
  req.open("GET", "https://quran-endpoint.vercel.app/quran");
  req.send();
  




  window.addEventListener("load",()=>{
    let loader = document.getElementById("loader");
  
    loader.style.display="none"
  })