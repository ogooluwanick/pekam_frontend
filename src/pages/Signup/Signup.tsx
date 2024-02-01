import React,{ useState } from 'react';
import { useForm,SubmitHandler } from 'react-hook-form'
import axios from 'axios'
import toast from 'react-hot-toast';

import "./Signup.scss"
import { SvgNoEye } from '../../icons';
import { useNavigate } from 'react-router-dom';
import MotionWrap from '../../components/MotionWrap';

// Define a TypeScript interface for form data.
type FormData = {
        fname: string;
        lname: string;
        username: string;
        password: string;
};
      

const Signup: React.FC = () => {

        document.title = "Pakam | Signup";
        const { register, handleSubmit, setValue, formState: { errors }} = useForm<FormData>();
        const navigate = useNavigate();

        const [showpass, setShowpass] = useState(false)
        const [loading, setLoading] = useState(false)

        // Handle form submission when the user signs up.
        const submitHandler: SubmitHandler<FormData> = async ({  fname, lname, username, password }) =>{

                setLoading(true)

                try {
                        await axios.post('https://pekam-backend.onrender.com/api/user/register', {
                                firstName: fname,
                                lastName: lname,
                                username,
                                password,
                        });

                        toast.success("Registration completed",{ duration: 3500,})
                        
                        setValue("fname","")
                        setValue("lname","")
                        setValue("username","")
                        setValue("password","")

                        navigate("/assessment")
                } 
                catch (err) {
                        console.log("err",err)

                        toast.error("Registration unsuccessful",
                        {     
                                duration: 3500,
                        });
                }

                setLoading(false)

        }

  return (
        <MotionWrap>
                <div className="pageDialog">
                        <section>
                                <div className="global_logo">
                                        <img src="/imgs/pakam-icon.svg" alt="pakam logo" />
                                        <span>Pakam</span>
                                </div>

                                <h1>Create Account</h1>

                                <form className='signup_form' onSubmit={handleSubmit(submitHandler)}>
                                        <div className="signup_grid">

                                                <div className="formController">
                                                        <label htmlFor="fname">First name</label>
                                                        <input type="text"  placeholder='Enter your First name' autoFocus disabled={loading}
                                                                {...register(      "fname",
                                                                                        {
                                                                                                required:"Don't forget your first name. 😂",
                                                                                        })
                                                                }
                                                        />
                                                        {errors.fname ? <p className=' desc error' >{errors.fname.message}</p> : "" }
                                                </div>
                                                <div className="formController">
                                                        <label htmlFor="lname">Last name</label>
                                                        <input type="text"  placeholder='Enter your Last name'  disabled={loading}
                                                                {...register(      "lname",
                                                                        {
                                                                                required:"Don't forget your last name. 😂",
                                                                        })
                                                                }
                                                        />
                                                        {errors.lname ? <p className=' desc error' >{errors.lname.message}</p> : "" }
                                                </div>
                                                <div className="formController">
                                                        <label htmlFor="username">Username</label>
                                                        <input type="text" placeholder='Enter your Username'  disabled={loading}
                                                                {
                                                                        ...register(      "username",
                                                                                                {
                                                                                                        required:"You need a unique username. 😭",
                                                                                                        minLength:{value: 5 , message:"A little longer please. 😭"}
                                                                                                }
                                                                                        )
                                                                } 
                                                        />
                                                        {errors.username ? <p className=' desc error' >{errors.username.message}</p> : "" }

                                                </div>
                                                <div className="formController">
                                                        <label htmlFor="password">Password</label>
                                                        <input type={showpass?"text":"password"}  placeholder='Enter your Password'  disabled={loading}  
                                                                {
                                                                ...register(      "password",
                                                                                        {
                                                                                                required:"Come on, Don't forget the new password. 😭",
                                                                                                minLength:{value: 6 , message:"The password should longer. 😭"}
                                                                                        }
                                                                                )
                                                                } 
                                                        />
                                                        <SvgNoEye onClick={()=>setShowpass(val=>!val)}/>
                                                        {errors.password ? <p className=' desc error' >{errors.password.message}</p> : <p className="desc">Must be 8 characters long, Uppercase inclusive</p> }
                                                </div>
                                        </div>

                                        <div className="signup_btn">
                                                <button className='primary_btn' type='submit' disabled={loading}>
                                                        {loading ? "Loading..." : "Sign up"}
                                                </button>
                                        </div>
                                </form>

                                <p className="helperLinks">
                                        Have Account? <a href='/signin'>Retrieve Now</a>
                                </p>
                        </section>
                        <p className='pakam_copy'>Powered by Pakam Technology</p>
                </div>
        </MotionWrap>

  )
}

export default Signup