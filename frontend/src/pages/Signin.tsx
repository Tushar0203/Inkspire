import { SigninForm } from "../components/SigninForm"
import { Testimonial } from "../components/Testimonial"

export const Signin=()=>{
    return (<div className="grid grid-cols-1 lg:grid-cols-2">
        <SigninForm/>
        <div className="hidden lg:block">
        <Testimonial/>
        </div>
    </div>)
}