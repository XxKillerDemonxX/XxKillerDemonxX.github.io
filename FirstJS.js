const playButton = document.getElementById("button");
const audio = document.getElementById("audio");
const time = document.querySelector(".time");
const shake = document.getElementById("shaker");

function playAudio()
{
    if (audio.paused)
    {
    audio.play();
    playButton.classList = 'paused';

    }
    else
    {
    audio.pause();
    playButton.classList = 'play';

    }
}
playButton.addEventListener('click', playAudio);




function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    return formattedTime;
}

function currentTime()
{
    time.innerText = formatTime(audio.currentTime);
}
audio.addEventListener('timeupdate', currentTime);

!async function main() {
    "use strict";
    const BASE_URL = "https://raw.githubusercontent.com/XxKillerDemonxX/XxKillerDemonxX.github.io/main";
    const dom = {
        lyric: document.querySelector(".lyric"),
        player: document.querySelector(".player")
    };

    // load lrc file
    const res = await fetch(BASE_URL + "/LRC/MikuLRC.lrc");
    const lrc = await res.text();

    const lyrics = parseLyric(lrc);

    //dom.player.src = "./audio.mp3";

    dom.player.ontimeupdate = () => {
        const time = dom.player.currentTime;
        const index = syncLyric(lyrics, time);

        if (index == null) return;

        dom.lyric.innerHTML = lyrics[index].text;
    };

}();


function parseLyric(lrc) {
    // will match "[00:00.00] ooooh yeah!"
    // note: i use named capturing group
    const regex = /^\[(?<time>\d{2}:\d{2}(.\d{2})?)\](?<text>.*)/;

    // split lrc string to individual lines
    const lines = lrc.split("\n");

    const output = [];

    lines.forEach(line => {
        const match = line.match(regex);

        // if doesn't match, return.
        if (match == null) return;

        const { time, text } = match.groups;

        output.push({
            time: parseTime(time),
            text: text.trim()
        });
    });

    // parse formated time
    // "03:24.73" => 204.73 (total time in seconds)
    function parseTime(time) {
        const minsec = time.split(":");

        const min = parseInt(minsec[0]) * 60;
        const sec = parseFloat(minsec[1]);

        return min + sec;
    }

    return output;
}
function syncLyric(lyrics, time) {
    const scores = [];

    lyrics.forEach(lyric => {
        // get the gap or distance or we call it score
        const score = time - lyric.time;

        // only accept score with positive values
        if (score >= 0) scores.push(score);
    });

    if (scores.length == 0) return null;

    // get the smallest value from scores
    const closest = Math.min(...scores);

    // return the index of closest lyric
    return scores.indexOf(closest);
}
