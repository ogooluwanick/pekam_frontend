import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import "./Signin.scss";
import { SvgNoEye } from '../../icons';
import MotionWrap from '../../components/MotionWrap';

// Define a TypeScript interface for form data.
type FormData = {
  username: string;
  password: string;
};

const Signin: React.FC = () => {
        document.title = "Pakam | Login";
        const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>();
        const navigate = useNavigate();

        const [showpass, setShowpass] = useState(false);
        const [loading, setLoading] = useState(false);

        // Handle form submission when the user signs up.
        const submitHandler: SubmitHandler<FormData> = async ({ username, password }) => {

                setLoading(true);

                try {
                        await axios.post('https://pekam-backend.onrender.com/api/user/login', {
                                username,
                                password,
                        });

                        toast.success("Login successful", { duration: 3500 });

                        setValue("username", "");
                        setValue("password", "");

                        navigate("/assessment");
                } catch (err) {
                        console.log("err", err);

                        if (err instanceof Error) {
                                toast.error("Invalid Email/Password", {
                                duration: 3500,
                        });
                        } else {
                                console.error("An error occurred:", err);
                        }
                }

                setLoading(false);
        };

  return (
        <MotionWrap>    
                <div className="pageDialog">
                        <section>
                                <div className="global_logo">
                                        <img src="/imgs/pakam-icon.svg" alt="pakam logo" />
                                        <span>Pakam</span>
                                </div>

                                <h1>Login</h1>

                                <form className='signin_form' onSubmit={handleSubmit(submitHandler)}>
                                        <div className="signin_grid">
                                                <div className="formController">
                                                        <label htmlFor="username">Username</label>
                                                        <input
                                                                type="text"
                                                                placeholder='Enter your Username'
                                                                disabled={loading}
                                                                {...register("username", {
                                                                required: "Kindly provide your username. 😭",
                                                                })}
                                                        />
                                                        {errors.username ? <p className=' desc error'>{errors.username.message}</p> : ""}
                                                </div>
                                                <div className="formController">
                                                        <label htmlFor="password">Password</label>
                                                        <input
                                                                type={showpass ? "text" : "password"}
                                                                placeholder='Enter your Password'
                                                                disabled={loading}
                                                                {...register("password", {
                                                                required: "Kindly provide your password. 😭",
                                                                })}
                                                        />
                                                        <SvgNoEye onClick={() => setShowpass(val => !val)} />
                                                        {errors.password ? (
                                                                <p className=' desc error'>{errors.password.message}</p>
                                                        ) : (
                                                                <p className="desc">Must be 8 characters long, Uppercase inclusive</p>
                                                        )}
                                                </div>
                                        </div>

                                        <div className="signin_btn">
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
        </MotionWrap>   
  );
};

export default Signin;
