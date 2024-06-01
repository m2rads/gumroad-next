import { fetchAllVideos } from "@/app/server-action/actions";
import { VideoEmptyState } from "./video-fallback";
import videoData from "@/data/videos";
import { unstable_cache } from 'next/cache';

// Existing Video interface remains the same
interface Video {
    name: string;
    id: string;
    updated_at: string;
    created_at: string;
    last_accessed_at: string;
    metadata: VideoMetadata;
    url: string; // Added to use the signed URL directly
}

interface VideoMetadata {
    eTag: string;
    size: number;
    mimetype: string;
    cacheControl: string;
    lastModified: string;
    contentLength: number;
    httpStatusCode: number;
}

 
const getCachedVideos = unstable_cache(
    async () => fetchAllVideos(),
    ['trainer_videos'],
    {
        tags: ['trainer_videos'],
        revalidate: 3600,
    }
);


export default async function VideoGrid() {
    const data = await getCachedVideos();
    const videos = JSON.parse(data);
    console.log("videos" , videos)

    return (
        <>
            <div>
                {videos ? (
                    <div>
                        {videos.map((video: Video) => (
                            <div key={video.id}>
                                <video width="320" height="240" controls>
                                    <source src={video.url} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        ))}
                    </div>
                ) : (
                   <VideoEmptyState />
                )}
            </div>
        </>
    );
}
