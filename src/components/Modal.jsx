import { useState } from 'react';
import { useForm } from 'react-hook-form'
import axios from 'axios'
import toast from 'react-hot-toast';
import useOnclickOutside from 'react-cool-onclickoutside'

const Modal = ({showModal, setShowModal}) => {
        const modalRef = useOnclickOutside(() => setShowModal(false));
        const { register, handleSubmit, setValue, formState: { errors }} = useForm();

        const [loading, setLoading] = useState(false)

        const submitHandler = async ({ name, desc, qty, price }) =>{
                console.log("test", name, desc, qty)
                setLoading(true)

                try {
                        let data = await axios.post('/api/product/create', {
                                name,
                                description: desc,
                                price,
                                quantity: qty,
                        });

                        console.log("data",data)
                        
                        toast.success(data.data.message,{ duration: 3500})

                        setValue("name","")
                        setValue("desc","")
                        setValue("qty","")
                        setValue("price","")
                        
                        setShowModal(false)
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
        <div className='modal_box'>
                <div className="black-overlay"/>
                <form className='modal' onSubmit={handleSubmit(submitHandler)} ref={modalRef}>
                        <h1>Create Assessment</h1>
                        <div className="signup_grid" style={{marginTop:"52px"}}>

                                <div className="formController">
                                        <label htmlFor="name">Full Name</label>
                                        <input type="text" name='name' placeholder='Full Name' autoFocus disabled={loading}
                                                {...register(      "name",
                                                                        {
                                                                                required:"Full name please. 😂",
                                                                        })
                                                }
                                        />
                                        {errors.name ? <p className=' desc error' >{errors.name.message}</p> : "" }
                                </div>
                                
                                <div className="formController">
                                        <label htmlFor="desc">Description</label>
                                        <input type="text" name='desc' placeholder='Description'  disabled={loading}
                                                {...register(      "desc",
                                                                        {
                                                                                required:"Description please. 😂",
                                                                        })
                                                }
                                        />
                                        {errors.desc ? <p className=' desc error' >{errors.desc.message}</p> : "" }
                                </div>
                                
                                <div className="formController">
                                        <label htmlFor="qty">Quanity</label>
                                        <input type="number" name='qty' placeholder='Quanity'  disabled={loading}
                                                {...register(      "qty",
                                                                        {
                                                                                required:"Quanity please. 😂",
                                                                        })
                                                }
                                        />
                                        {errors.qty ? <p className=' desc error' >{errors.qty.message}</p> : "" }
                                </div>
                                <div className="formController">
                                        <label htmlFor="price">Price</label>
                                        <input type="number" name='price' placeholder='Price'  disabled={loading}
                                                {...register(      "price",
                                                                        {
                                                                                required:"Price please. 😂",
                                                                        })
                                                }
                                        />
                                        {errors.price ? <p className=' desc error' >{errors.price.message}</p> : "" }
                                </div>
                        </div>
                        
                        <div className="modal_btn">
                                <button className="primary_btn" type='submit' disabled={loading} >
                                        
                                        {loading ? "Loading..." : "Submit"}
                                </button> 
                        </div>
                </form>
        </div>

  )
}

export default Modal