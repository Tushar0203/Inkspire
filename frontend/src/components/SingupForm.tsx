import type { SingupInput } from "@tushar0203/usable";
import axios from "axios";
import { useState, type ChangeEvent } from "react";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const SignupForm=()=>{
    const navigate=useNavigate();
    const [postInputs,setPostInputs]=useState<SingupInput>({
        name:"",
        email:"",
        password:""
    })
    async function sendRequest(){
        const response=await axios.post(`${BACKEND_URL}/api/v1/user/signup`,postInputs)
        const data=response.data;
        localStorage.setItem('token',"Bearer "+data.jwt)
        navigate('/blogs')
    }
    return (<div className="h-screen flex flex-col justify-center items-center ">
        <div className=" w-100 flex flex-col items-center p-4">
            <div className="text-3xl font-bold">
                Create an account
            </div>
            <div className="text-l text-slate-600 flex mt-2">
               <div className="mr-1">
                Already have an account?
               </div>
               <a href="/signin" className=" underline underline-offset-2">
                Login
               </a>
            </div>
           <InputSection title="Username"  placeholder="Enter your Username" type="text" onChange={(e)=>{
                setPostInputs({
                    ...postInputs,
                    name:e.target.value
                })
           }}/>
           <InputSection title="Email"  placeholder="m@example.com" type="email" onChange={(e)=>{
                setPostInputs({
                    ...postInputs,
                    email:e.target.value
                })
           }}/>
           <InputSection title="Password"  placeholder="Enter your Password" type="password" onChange={(e)=>{
                setPostInputs({
                    ...postInputs,
                    password:e.target.value
                })
           }}/>
            
            <button className="w-full bg-black text-white p-2 rounded-md mt-5 " onClick={sendRequest}>Sign Up</button>
            
        </div>
    </div>)
}
interface InputSectionType{
    title:string,
    placeholder:string,
    type:string,
    onChange:(e:ChangeEvent<HTMLInputElement>)=>void;

}
function InputSection({title,placeholder,type,onChange}:InputSectionType){
    return(<div className="w-full">
        <div className="text-left font-medium mt-5">
                {title}
            </div>
            <input onChange={onChange} type={type} placeholder={placeholder} className="text-left w-full  pl-2 py-2 border rounded-sm  mt-2 border-gray-300 focus:outline-none focus:border-1 focus:border-gray-700"   />
    </div>)
}