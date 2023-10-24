import { useState } from 'react';
import { useForm } from 'react-hook-form'
import axios from 'axios'


import "./Signin.scss"
import { SvgNoEye } from '../../icons';
import toast from 'react-hot-toast';



const Signin = () => {
        document.title = "Pakam | Login";
        const { register, handleSubmit, setValue, formState: { errors }} = useForm();

        const [showpass, setShowpass] = useState(false)
        const [loading, setLoading] = useState(false)

        const submitHandler = async ({ username, password }) =>{
                console.log("test", username, password)

                setLoading(true)

                try {
                        let data = await axios.post('/api/user/login', {
                                username,
                                password,
                        });

                        console.log("data",data)
                        
                        toast.success(data.data.message,{ duration: 3500,})

                        setValue("username","")
                        setValue("password","")

                } 
                catch (err) {
                        console.log("data",err)

                        toast.error((err.message),
                        {     
                                duration: 3500,
                        });
                }

                setLoading(false)

        }
  return (
    <div className="pageDialog">
        <section>
                <div className="global_logo">
                        <img src="/imgs/pakam-icon.svg" alt="pakam logo" />
                        <span>Pakam</span>
                </div>

                <h1>Login</h1>

                <form onSubmit={handleSubmit(submitHandler)}>
                        <div className="grid-container">
                                <div className="formController">
                                        <label htmlFor="username">Username</label>
                                        <input type="text" name='username' placeholder='Enter your username'  disabled={loading}
                                                {
                                                        ...register(      "username",
                                                                                {
                                                                                        required:"Kindly provide your username. 😭",
                                                                                }
                                                                        )
                                                } 
                                        />
                                        {errors.username ? <p className=' desc error' >{errors.username.message}</p> : "" }

                                </div>
                                <div className="formController">
                                        <label htmlFor="password">Password</label>
                                        <input type={showpass?"text":"password"} name='password' placeholder='Enter your Password'  disabled={loading}  
                                                {
                                                ...register(      "password",
                                                                        {
                                                                                required:"Kindly provide your password. 😭",
                                                                        }
                                                                )
                                                } 
                                        />
                                        <SvgNoEye onClick={()=>setShowpass(val=>!val)}/>
                                        {errors.password ? <p className=' desc error' >{errors.password.message}</p> : <p className="desc">Must be 8 characters long, Uppercase inclusive</p> }
                                </div>
                        </div>

                        <div className="btn_box">
                                <button className='primary_btn' type='submit' disabled={loading}>
                                        {loading ? "Loading..." : "Log In"}
                                </button>
                        </div>
                </form>

                <p className="helperLinks">
                        Forgot Password? <a href='/#'>Retrieve Now</a>
                </p>
        </section>
        <p className='pakam_copy'>Powered by Pakam Technology</p>
    </div>
  )
}

export default Signin