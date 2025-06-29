export async function getYouTubeTranscript(url) {
    try {
        // Extract video ID from URL
        const videoId = extractVideoId(url);
        if (!videoId) {
            throw new Error('Invalid YouTube URL');
        }

        console.log('Fetching transcript for video ID:', videoId);

        // For now, we'll provide instructions for manual transcript copying
        // YouTube's API restrictions make automatic fetching challenging
        
        return {
            transcript: null,
            videoId,
            title: 'Manual Transcript Required',
            channel: 'YouTube Video',
            duration: 'Unknown',
            instructions: `To get the transcript:
1. Open the video: https://youtube.com/watch?v=${videoId}
2. Click the "..." menu below the video
3. Click "Show transcript"
4. Click the three dots in the transcript box
5. Select "Toggle timestamps" to remove timestamps
6. Select all text (Ctrl+A or Cmd+A) and copy
7. Paste the transcript here`
        };

    } catch (error) {
        console.error('YouTube URL error:', error);
        throw new Error('Failed to process YouTube URL: ' + error.message);
    }
}

function extractVideoId(url) {
    // Handle various YouTube URL formats
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
        /^([a-zA-Z0-9_-]{11})$/ // Just the video ID
    ];

    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
            return match[1];
        }
    }

    return null;
}