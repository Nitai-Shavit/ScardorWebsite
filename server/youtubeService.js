const fetch = require('node-fetch')



const YoutubeService = (() => {
    let currVideoList = []

    const getVideoListFromAPI = async () => {
        let data = []
        const KEY = "" // ENTER YOUTUBE API KEY HERE (YouTube Data API v3)
        const PLAYLIST_ID = "UUQJmDq0tvGVUvySF1HbfS5Q"; // ChannelID = UCQJmDq0tvGVUvySF1HbfS5Q
        const MAX_RESULTS = "10";
        const YOUTUBE_API_URL = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${MAX_RESULTS}&playlistId=${PLAYLIST_ID}&key=${KEY}`;
        try {
            data = await fetch(YOUTUBE_API_URL, {
                headers: {
                    "Content-Type": "application/json",
                },
            }).then((res) => res.json()).then((res) => res)
        } catch (error) {
            console.log("An Error Has Occured: \n" + error);
        }
        return data
    }

    const updateVideoList =async () => {
        console.log("Updating Video List");
        let data = await getVideoListFromAPI()
        let videos = data?.items?.map((video) => {
            return {
                id: video.snippet.resourceId.videoId,
                title: video.snippet.title,
                description: video.snippet.description,
                thumbnails: video.snippet.thumbnails,
            };
        });
        currVideoList = videos || []
    }

    const getCurrVideoList = () => {
        return currVideoList
    }

    const startService = () => {
        console.log("YoutubeSerice Service Running");
        updateVideoList()
        // Call every HALF Hour = 1000 * 60 * 60 / 2 = 1,800,000 (1800000) in ms
        setInterval(updateVideoList, 1800000)
    }

    return {
        startService,
        getCurrVideoList
    }
})()


module.exports = YoutubeService;