import { useState } from "react"
import { AppBar } from "../components/AppBar"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useNavigate } from "react-router-dom"

export const Publish = () => {
    const [title,setTitle]=useState("")
    const [content,setContent]=useState("")
    const navigate=useNavigate();
    return (<div>
        <AppBar />
        <div className="px-50 flex flex-col">

            <input type="text" className="w-full h-40 text-8xl font-serif font-thin text-gray-400 focus:outline-none" placeholder="Title" onChange={(e)=>{
                setTitle(e.target.value);
            }}/>
            <textarea
                rows={8}
                className="w-full text-3xl font-serif font-thin text-gray-400  focus:outline-none resize-none"
                placeholder="Tell your story..." onChange={(e)=>{
                setContent(e.target.value);
            }}>
                
            </textarea>
            <div>
            <button className="bg-green-700 text-left rounded-sm text-white px-2 py-1" onClick={async ()=>{
                const response=await axios.post(`${BACKEND_URL}/api/v1/blog`,{
                    title,
                    content
                },{
                    headers:{
                        Authorization:localStorage.getItem('token')
                    }
                })
                navigate(`/blog/${response.data.id}`)
            }}>Publish Post</button>
            </div>
        </div>
        
    </div>)
}