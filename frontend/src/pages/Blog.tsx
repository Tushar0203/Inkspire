import { useParams } from "react-router-dom"
import { useBlog } from "../hooks"
import { FullBlog } from "../components/FullBlog"

export const Blog=()=>{
    const {id}=useParams()
    const {loading,blog}=useBlog({
        id: id || ""
    })
    if(loading || !blog){
       return (
    <div className="h-screen flex justify-center items-center">
      <div className="h-15 w-15 border-4 border-t-transparent border-gray-400 rounded-full animate-spin"></div>
    </div>
  );
    }
    return(<div>
        <FullBlog id={blog.id} title={blog.title } content={blog.content} author={blog.author.name || "Anonymous"} publishedDate="May 19,2025"/>
    </div>)
}