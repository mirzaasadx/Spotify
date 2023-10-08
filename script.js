console.log("welcome to spotify");

// intialize the variables
let songIndex = 0;
let audioElement = new  Audio('1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myprogressbar = document.getElementById('myprogressbar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songsItems = Array.from(document.getElementsByClassName('songitems'));



let songs = [
    {songName: "LEGION - It's Always Blue", filePath: "1.mp3", coverPath: "1.jpg" },
    {songName: "CARTEL - Trap", filePath: "2.mp3", coverPath: "2.jpg" },
    {songName: "LOWKEY - They Mad", filePath: "3.mp3", coverPath: "3.jpg" },
    {songName: "RICH$FOREVER - Walk", filePath: "4.mp3", coverPath: "4.jpg" },
    {songName: "HOPPY - Backitup", filePath: "5.mp3", coverPath: "7.jpg" },
    {songName: "TRUELOVE - If they know", filePath: "6.mp3", coverPath: "10.jpg" },

]

songsItems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].scr = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

// handle play/pause clicks
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})

// listen to events
audioElement.addEventListener('timeupdate' , ()=>{
    // update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myprogressbar.value = progress;
} )

myprogressbar.addEventListener('change', ()=>{
    audioElement.currentTime = myprogressbar.value * audioElement.duration/100;

})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })


}


Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click' ,(e)=>{
        console.log(e.target);
        makeAllPlays();
        songIndex = parseInt(e.target.id)
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');

    })

})

document.getElementById('next').addEventListener('click' , ()=>{
    if(songIndex>=5){
        songIndex = 0;
    }
    else{
    songIndex += 1;
    }
    audioElement.src = `${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click' , ()=>{
    if(songIndex<=0){
        songIndex = 0;
    }
    else{
    songIndex -= 1;
    }
    audioElement.src = `${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})