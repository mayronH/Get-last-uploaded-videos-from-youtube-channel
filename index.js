function getVideos() {
    const key = ""; // Youtube API Key
    const channel = ""; // Youtube channel ID, for channel name use channeluserName=google
    const maxResults = "maxResults=2";
    const order = "order=date";

    const url = `https://www.googleapis.com/youtube/v3/search?key=${key}&channelId=${channel}&part=snippet,id&${order}&${maxResults}`;

    fetch(url, {
        method: "GET",

    }).then( async (response) =>{
        if(response.ok)
            return getVideoId(await response.json())
    })

    async function getVideoId(data) {
        for (var i in data.items) {
            await makeVideo(data.items[i].id.videoId)
        }
    }
}

//Create iframe with embed video

async function makeVideo(id){
    const videoUrl = `https://www.youtube.com/embed/${id}`

    const video = `<iframe class="embed-responsive-item frameVideo" title="Video Premialy" src="" data-src="${videoUrl}" frameborder="0" width="100%" height="320" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture allowfullscreen"></iframe>`

    document.querySelector('.videos').innerHTML += '<div class="col-lg-6 col-md-6 col-sm-12 video">' + video + '</div>'

    init()
}

function init() {
    var vidDefer = document.querySelectorAll('.frameVideo');
    for (var i=0; i<vidDefer.length; i++) {
        if(vidDefer[i].getAttribute('data-src')) {
            vidDefer[i].setAttribute('src',vidDefer[i].getAttribute('data-src'));
        }
    }
}

window.onload = getVideos;