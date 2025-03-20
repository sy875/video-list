import { useEffect, useState } from "react";


const VideoCard = () => {
    const [page, setPage] = useState(1);
    const [videos, setVideos] = useState([]);

    const getAllData = async () => {
        const url = `https://api.freeapi.app/api/v1/public/youtube/videos?page=${page}&limit=20`
        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const res = await response.json();
            setVideos(res.data)

        } catch (error) {
            console.error(error);
        }


    }


    useEffect(() => {
        getAllData();
    }, [])

    return (
        <div>
            {
                videos?.data.map((video: any) => (
                    <div>
                        <img src={video.items.snippet.thumbnail[0].default[0].url} />
                    </div>
                ))
            }
        </div>
    )
}

export default VideoCard
