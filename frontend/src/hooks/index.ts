import axios from "axios"
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config"
interface Blog{
    "id": string,
        "title": string,
        "content": string,
        "published": Boolean,
        "authorId": string,
        "author": {
            "name": string
        }
}

export const useBlog=({id}:{id:string})=>{
    const [blog,setBlog]=useState<Blog>()
    const [loading,setLoading]=useState(true)
    useEffect(()=>{
        console.log(id)
        console.log(`${BACKEND_URL}/api/v1/blog/${id}`)
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
            headers:{
                Authorization:localStorage.getItem('token')
            }
        }).then(response=>{
            console.log(response.data)
            setBlog(response.data)
            setLoading(false)
        })
    },[id])
     return {
        loading,
        blog
    }
}
export const useBlogs=()=>{
    const [loading,setLoading]=useState(true)
    const [blogs,setBlogs]=useState<Blog[]>([])
    console.log(localStorage.getItem('token'))
    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
            headers:{
                Authorization:localStorage.getItem('token')
            }
        }).then(response=>{
            console.log(response.data)
            setBlogs(response.data)
            setLoading(false)
        })
    },[])
    return {
        loading,
        blogs
    }
}