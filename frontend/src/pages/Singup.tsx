import { SignupForm } from "../components/SingupForm"
import { Testimonial } from "../components/Testimonial"

export const Signup=()=>{
    return (<div className="grid grid-cols-1 lg:grid-cols-2">
        <SignupForm/>
        <div className="hidden lg:block">
        <Testimonial/>
        </div>
    </div>)
}