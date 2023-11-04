const AudioPlayer = document.querySelector(".Audio");
const playButton = document.querySelector(".playButton");
var audioSource = document.getElementById("audioSource");
const progressBar = document.querySelector(".progressBar");
const imageSource = document.getElementById("imageSource");
const color1 = ("(0,255,255)");
const color2 = ("(247,156,247)");
var songName = document.querySelector(".songName");
var num = 0;
const forward = document.querySelector(".forward");
const backward = document.querySelector(".backward");

let isHovering = false;
var mp3 = "";
var lrc = "";
var image = "";




//import songs from "./Songs.js"; Note: Should update code later to have songs to be imported from Songs.js
const songs = [
    { title: "Miku", Mp3: "MikuMp3", Lrc: "", Image: "Miku" },
    { title: "World Is Mine", Mp3: "WorldIsMineMp3", Lrc: "", Image: "WorldIsMine" },
    { title: "Rikkurōru", Mp3: "DefinitelyNotARickRollMp3", Lrc: "", Image: "RickRollFace"},
    { title: "Hibana", Mp3: "HibanaMp3", Lrc: "", Image: "Hibana" },
    { title: "Levan Polkka", Mp3: "LevanPolkkaMp3", Lrc: "", Image: "LevanPolkka" },
    { title: "Senbonzakura", Mp3: "SenbonzakuraMp3", Lrc: "", Image: "Senbonzakura" },
    { title: "Mozaik Role", Mp3: "MozaikRoleMp3", Lrc: "", Image: "MozaikRole" },
    { title: "King", Mp3: "KingMp3", Lrc: "", Image: "King" }
];

AudioPlayer.addEventListener("ended", function() {
    if (num != buttonArray.length - 1) { num = num + 1; }
    else { num = 0; }

    songName.innerHTML = buttonArray[num].getAttribute("data-songName");
    let datamp3 = buttonArray[num].getAttribute("data-mp3");
    let datalrc = buttonArray[num].getAttribute("data-lrc");
    let dataSongName = buttonArray[num].getAttribute("data-songName");
    let dataImage = buttonArray[num].getAttribute("data-image");
    setSongAndLyrics(datamp3, datalrc, dataSongName, num, dataImage);
});

//tracking progressbar
AudioPlayer.addEventListener("timeupdate", function() {
    const currentTime = AudioPlayer.currentTime;
    const duration = AudioPlayer.duration;

    if (!isNaN(duration) && isFinite(duration) && duration > 0) {
    const progress = (currentTime/duration) * 15000;
    //console.log(progress);
    progressBar.value = progress;
    }
    //if mouse is not hovering, color is color1 while it updates
    if (!isHovering) {
        var x = progressBar.value;
        var color = 'linear-gradient(90deg, rgb' + color1 + x* 100/15000 + '%, rgb(214,214,214)' + x* 100/15000 + '%)';
        progressBar.style.background = color;
    }
    //if mouse is hovering, color is color2 while updating
    else {
        var x = progressBar.value;
        var color = 'linear-gradient(90deg, rgb' + color2 + x* 100/15000 + '%, rgb(214,214,214)' + x* 100/15000 + '%)';
        progressBar.style.background = color;
    }
});
//change current time based on progress bar, ie. dragging bar to change current time in song
progressBar.addEventListener("input", function(event) {
    const newTime =  (event.target.value *  AudioPlayer.duration) / 15000;
    AudioPlayer.currentTime = newTime;
    var x = progressBar.value;
    //because mouse has to be hovering if dragging trackbar, will always be color2
    var color = 'linear-gradient(90deg, rgb' + color2 + x* 100/15000 + '%, rgb(214,214,214)' + x* 100/15000 + '%)';
    progressBar.style.background = color;
});
//check when mouse enters/hovers over progressBar
progressBar.addEventListener('mouseenter', function() {
    isHovering = true;
    progressBar.classList.add('hovered');
    var x = progressBar.value;
    //while hovering, progressBar color is color2
    var color = 'linear-gradient(90deg, rgb' + color2 + x* 100/15000 + '%, rgb(214,214,214)' + x* 100/15000 + '%)';
    progressBar.style.background = color;
});
//check when mouse leaves/is not hovering over progressBar
progressBar.addEventListener('mouseleave', function() {
    isHovering = false;
    progressBar.classList.remove('hovered');
    var x = progressBar.value;
    //changes progressBar color back to color1 when not hovering
    var color = 'linear-gradient(90deg, rgb' + color1 + x* 100/15000 + '%, rgb(214,214,214)' + x* 100/15000 + '%)';
    progressBar.style.background = color;
});
//creates buttons based off songs array
for (var i = 0; i < songs.length; i ++)
{
    //console.log(i);
    const button = document.createElement("button");
    button.className = "songButton";
    button.innerText = songs[i].title;
    button.setAttribute("data-mp3", songs[i].Mp3);
    button.setAttribute("data-lrc", songs[i].Lrc);
    button.setAttribute("data-songName", songs[i].title);
    button.setAttribute("data-image", songs[i].Image);
    const parentContainer = document.querySelector(".sidebar");
    parentContainer.appendChild(button);
}
//Note: can make code cleaner by adding button generated above to buttonArray I think, but too I'm lazy rn.
var buttonArray = Array.from(document.querySelectorAll(".songButton"))
function setSongAndLyrics(newMp3, newLrc, newSongName, newNum, newImage)
{
    try {
    
    mp3 = newMp3;
    lrc = newLrc;
    image = newImage;
    songName.innerHTML = newSongName;
    audioSource.src = "Audio/" + mp3 + ".mp3";
    if (mp3 === "DefinitelyNotARickRollMp3")
    {
        const rick = "Get Rick Rolled";
        songName.innerHTML = (rick);
    }
    imageSource.src = "Images/" + image + ".png";
    AudioPlayer.load();
    AudioPlayer.play();
    num = newNum;
    console.log(mp3)
    //console.log("yay!");
    } catch (error) {
    console.error("error caught:", error.message);
    }
}
//initializes each button with an eventListener with parameters datamp3 and datalrc
for (var i = 0; i < buttonArray.length; i ++) {
    let datamp3 = buttonArray[i].getAttribute("data-mp3");
    let datalrc = buttonArray[i].getAttribute("data-lrc");
    let dataSongName = buttonArray[i].getAttribute("data-songName");
    let dataImage = buttonArray[i].getAttribute("data-image");
    let tempNum = i;
    buttonArray[i].addEventListener('click', function() {
        setSongAndLyrics(datamp3, datalrc, dataSongName, tempNum, dataImage)
    });
}
function PlayPause()
{
    if (AudioPlayer.paused) {
    try {
    AudioPlayer.play(); 
    //console.log("caught");
    } catch (error) {
        console.error("error caught:", error.nmessage);
    }
    }
    else {
    AudioPlayer.pause();
    }
}
playButton.addEventListener('click', PlayPause)


forward.addEventListener('click', function() {

    if (num != buttonArray.length - 1) { num = num + 1; }
    else { num = 0; }

    //songName.innerHTML = buttonArray[num].getAttribute("data-songName");
    let datamp3 = buttonArray[num].getAttribute("data-mp3");
    let datalrc = buttonArray[num].getAttribute("data-lrc");
    let dataSongName = buttonArray[num].getAttribute("data-songName");
    let dataImage = buttonArray[num].getAttribute("data-image");
    setSongAndLyrics(datamp3, datalrc, dataSongName, num, dataImage);
});
backward.addEventListener('click', function() {
    
    if (num != 0) { num = num - 1; }
    else { num = buttonArray.length - 1; }

    //songName.innerHTML = buttonArray[num].getAttribute("data-songName");
    let datamp3 = buttonArray[num].getAttribute("data-mp3");
    let datalrc = buttonArray[num].getAttribute("data-lrc");
    let dataSongName = buttonArray[num].getAttribute("data-songName");
    let dataImage = buttonArray[num].getAttribute("data-image");
    setSongAndLyrics(datamp3, datalrc, dataSongName, num, dataImage);
});
