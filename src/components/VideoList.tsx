interface VideoSnippet {
    title: string;
    thumbnails: {
        standard: {
            url: string;
        };
    };
}

interface VideoStatistics {
    viewCount: number;
    likeCount: number;
}

interface VideoItem {
    snippet: VideoSnippet;
    statistics: VideoStatistics;
}

interface VideoListProps {
    videos: VideoItem[];
}

const VideoList: React.FC<VideoListProps> = ({ videos }) => {


    function nFormatter(num: number) {
        if (num >= 1000000000) {
            return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
        }
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
        }
        return num;
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 justify-center'>
            {
                videos?.map((video: any, index: number) => (
                    // https://www.youtube.com/watch?v=75hqPk6pq5g


                    <div key={index} className='flex flex-col gap-2 cursor-pointer hover:scale-105 transition-all mx-auto'>
                        <a href={`https://www.youtube.com/watch?v=${video?.items?.id}`} target="_blank" rel="noopener noreferrer">
                            <img
                                className='w-[320px] rounded-sm'
                                src={video?.items?.snippet?.thumbnails?.standard?.url} />
                        </a>
                        <h2 className='text-gray-900'>{video?.items?.snippet?.title}</h2>
                        <div className="flex gap-2 text-sm text-gray-700">
                            <h2 className=''>{nFormatter(video?.items?.statistics?.viewCount)} Views</h2>
                            <span>.</span>
                            <h2 className=''>{nFormatter(video?.items?.statistics?.likeCount)} Likes</h2>
                        </div>

                    </div>
                ))
            }
        </div>
    )
}

export default VideoList
