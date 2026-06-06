// CinePhysics Main JavaScript File
<script>
    const API_KEY = 'YOUR_ACTUAL_API_KEY';
    const CHANNEL_ID = 'YOUR_ACTUAL_CHANNEL_ID';
    const API_URL = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&order=date&part=snippet&type=video&maxResults=4`;

    async function loadLatestVideos() {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            
            if (data.items && data.items.length > 0) {
                const latestVideo = data.items[0];
                const recentVideos = data.items.slice(1);

                // Update Featured Video
                document.getElementById('featured-title').innerText = latestVideo.snippet.title;
                document.getElementById('featured-link').href = `https://www.youtube.com/watch?v=${latestVideo.id.videoId}`;
                
                // You can also dynamically set the thumbnail image here if you have an <img> tag
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    loadLatestVideos();
</script>
