import { Link } from "react-router-dom"

interface BlogCardInputs {
    id:string,
    title: string,
    content: string,
    author: string,
    publishedDate: string
}
export const BlogCard = ({ id,title, content, author, publishedDate }: BlogCardInputs) => {
    return (<Link to={`/blog/${id}`}>
    <div className="  w-200 flex flex-col p-5 cursor-pointer">
        <div className="flex px-2 items-center">
            <Avatar name={author} />
            <div className="mr-2">
                {author}.
            </div>
            <div className="text-gray-500">
                {publishedDate}
            </div>
        </div>
        <div className="font-bold text-2xl p-2 mt-2">
            {title.length > 50 ? title.slice(0, 50) + "..." : title}
        </div>
        <div className="font-serif p-2 text-gray-800">
            {content.length > 400 ? content.slice(0, 400) + "..." : content}
        </div>
        <div className="p-2 flex items-center">
            <div className="font-serif text-gray-600 relative  mr-1">
                {Math.ceil(content.length / 100)}
            </div>
            <div className="font-serif text-gray-600 ">
                min read.
            </div>

        </div>
        <hr className="border-t border-gray-300 mt-10" />
    </div>
    </Link>)
}
export function Avatar({ name, size = "small" }: { name: string, size?: string }) {
    return (<div className="mr-2 ">
        <div className={`relative inline-flex items-center justify-center ${size == "small" ? "w-7 h-7" : "w-10 h-10"} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
            <span className="font-medium text-gray-600 dark:text-gray-300">{name[0]}</span>
        </div>
    </div>)
}