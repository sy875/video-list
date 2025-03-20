import { useEffect, useState } from "react";
import VideoList from "./components/VideoList";



function App() {
  const [page, setPage] = useState(1);
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([])
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const getAllData = async () => {
    console.log("getall data called")
    const url = `https://api.freeapi.app/api/v1/public/youtube/videos?page=${page}&limit=40`
    try {
      setLoading(true)
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const res = await response.json();
      setVideos(res.data.data)
      setFilteredVideos(res.data.data)
      setLoading(false)
    } catch (error) {
      console.error(error);
      setLoading(false)
    }
  }

  useEffect(() => {
    getAllData();
  }, [page]); // Fetch data when the page changes

  useEffect(() => {
    const timer = setTimeout(() => {
      search()
    }, 500);

    // Cleanup the timer fn
    return () => clearTimeout(timer);
  }, [searchTerm])


  const search = () => {
    // data.filter(item => item.title.toLowerCase().includes(term.toLowerCase())
    const filteredVid = videos.filter((video: any) => {
      return video?.items?.snippet?.title.toLowerCase().includes(searchTerm.toLowerCase())
    })
    console.log(filteredVideos)
    setFilteredVideos(filteredVid)
  }

  if (loading) {
    return <div> Loading...</div>
  }


  // console.log(videos.data[0].items.snippet.thumbnails.default.url)
  return (
    <>
      <div className="p-2 md:p-10 w-[90vw] mx-auto">
        <div className="flex mt-5 mb-10 mx-auto w-[80vw] md:w-[40vw] border border-gray-400 rounded-full overflow-hidden ">
          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full outline-0 hover:outline-0 focus:outline-0 px-5"
            placeholder="search"
            type="text border" />

          <button
            onClick={search}
            className=" border-l border-gray-400 p-2 cursor-pointer bg-gray-100">
            <img
              className="w-10"
              src="./searchicon.svg"
            />

          </button>
        </div>
        {
          filteredVideos.length <= 0 ? (
            <div className="text-xl text-center my-10">
              No videos found
            </div>
          ) : (

            <VideoList videos={filteredVideos} />
          )
        }
        {/* <button className="">
          prev
        </button>
        <button className="">
          next
        </button> */}
      </div>
    </>
  )
}

export default App
