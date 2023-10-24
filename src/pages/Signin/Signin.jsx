import { useForm } from 'react-hook-form'
import { useState } from 'react';

import "./Signin.scss"
import { SvgNoEye } from '../../icons';



const Signin = () => {
        document.title = "Pakam | Login";
        const { register, handleSubmit, setValue, formState: { errors }} = useForm();

        const [showpass, setShowpass] = useState(false)

        const submitHandler = (e)=>{
                e.preventDefault()
        }
  return (
    <div className="pageDialog">
        <section>
                <div className="global_logo">
                        <img src="/imgs/pakam-icon.svg" alt="pakam logo" />
                        <span>Pakam</span>
                </div>

                <h1>Create Account</h1>

                <form onSubmit={handleSubmit(submitHandler)}>
                        <div className="formController">
                                <label htmlFor="fname">First name</label>
                                <input type="text" name='fname' placeholder='Enter your First name' />
                        </div>
                        <div className="formController">
                                <label htmlFor="lname">Last name</label>
                                <input type="text" name='lname' placeholder='Enter your Last name' />
                        </div>
                        <div className="formController">
                                <label htmlFor="username">Username</label>
                                <input type="text" name='username' placeholder='Enter your username' />
                        </div>
                        <div className="formController">
                                <label htmlFor="password">Password</label>
                                <input type={showpass?"password":"text"} name='password' placeholder='Enter your Password' />
                                <SvgNoEye onClick={()=>setShowpass(val=>!val)}/>
                                <p className="desc">Must be 8 characters long, Uppercase inclusive</p>
                        </div>

                </form>

                <div className="btn_box">
                        <button className='primary_btn' type='submit'>
                                Log In
                        </button>
                </div>
                <p className="helperLinks">
                        Forgot Password? <a href='#'>Retrieve Now</a>
                </p>
        </section>
        <p className='pakam_copy'>Powered by Pakam Technology</p>
    </div>
  )
}

export default Signin