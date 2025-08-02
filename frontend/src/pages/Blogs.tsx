import { AppBar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks"

export const Blogs=()=>{
    const {loading,blogs}=useBlogs();
    if(loading){
        return (
    <div className="h-screen flex justify-center items-center">
      <div className="h-15 w-15 border-4 border-t-transparent border-gray-400 rounded-full animate-spin"></div>
    </div>)
    }

    return(<div>
        <AppBar/>
        <hr className="border-t border-gray-300" />
        <div className="flex flex-col items-center">
        {blogs.map(blog=><BlogCard id={blog.id} title={blog.title } content={blog.content} author={blog.author.name || "Anonymous"} publishedDate="May 19,2025"/>)}
      
    </div>
    </div>)
}