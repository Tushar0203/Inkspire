import { Avatar } from "./BlogCard"

interface BlogCardInputs {
    id:string,
    title: string,
    content: string,
    author: string,
    publishedDate: string
}
export const FullBlog=({id,title,content,author,publishedDate}: BlogCardInputs)=>{
    
    console.log(title)
    return(<div className="grid grid-cols-12  w-full p-20">
        <div className="col-span-8  flex flex-col mr-10">
            <div className="font-bold text-6xl">
            {title}
            </div>
            <div className="text-gray-500 my-2">
            {publishedDate}
            </div>
            <div className=" my-2">
            {content}
            </div>
        </div>
        <div className="col-span-4">
        <div className=" font-medium text-gray-500 rounded-lg ">
            Author
        </div>
        <div className="flex items-center ">
            <Avatar name={author} size="Big"/>
            <div className="flex flex-col mt-1 justify-centere">
                <div className="font-bold text-xl">
                    {/* {author} */}
                    Tushar
                </div>
                <div className="text-gray-500 mt-1">
                    Very great content writer , Very great content writer Very great content writer 
                </div>
            </div>
        </div>
        </div>
    </div>)
}