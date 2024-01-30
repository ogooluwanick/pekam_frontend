import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import useOnclickOutside from 'react-cool-onclickoutside';
import {motion} from "framer-motion"


interface Product {
        name: string;
        _id: string;
        description: string;
        quantity: number;
      }

interface ModalProps {
        productIndex: Product;
        showModal: boolean;
        setShowModal: (show: boolean) => void;
}

const Modal: FC<ModalProps> = ({ showModal, setShowModal, productIndex }) => {
  const modalRef = useOnclickOutside(() => setShowModal(false));
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  const [loading, setLoading] = useState(false);

  const submitHandler = async ({ name, desc, qty }: any) => {
    setLoading(true);

    try {
      let data = await axios.put(`/api/product/update/${productIndex._id}`, {
                name,
                description: desc,
                quantity: qty,
      });

      console.log("data", data);

      toast.success("Product created successfully", { duration: 3500 });

      setValue("name", "");
      setValue("desc", "");
      setValue("qty", "");

      setShowModal(false);
      window.location.reload()
    } catch (err) {
        console.log("data", err);

        if (err instanceof Error) {
          toast.error("Process failed", {
            duration: 3500,
          });
        } else {
          console.error("An error occurred:", err);
        }
    }

    setLoading(false);
  };

  useEffect(() => {
        setValue("name", productIndex.name);
        setValue("desc", productIndex.description);
        setValue("qty", productIndex.quantity);
  }, [])
  

  return (
    <div className='modal_box'>
      <div className="black-overlay" />
      <motion.form  initial={{ y: "100%" ,opacity:0 }} animate={{ y: 0 ,opacity:1}} exit={{ y: "100%" ,opacity:0}} transition={{ type: "spring", bounce: 0.3, duration: 0.35 }}   className='modal' onSubmit={handleSubmit(submitHandler)} ref={modalRef}>
        <h1>Update Assessment</h1>
        <div className="signup_grid" style={{ marginTop: "52px" }}>
          <div className="formController">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              placeholder='Full Name'
              autoFocus
              disabled={loading}
              {...register("name", {
                required: "Full name please. 😂",
              })}
            />
            {errors.name && typeof errors.name.message === 'string' ? <p className='desc error'>{errors.name.message}</p> : null}
          </div>

          <div className="formController">
            <label htmlFor="desc">Description</label>
            <input
              type="text"
              placeholder='Description'
              disabled={loading}
              {...register("desc", {
                required: "Description please. 😂",
              })}
            />
            {errors.desc && typeof errors.desc.message === 'string' ? <p className='desc error'>{errors.desc.message}</p> : null}
          </div>

          <div className="formController">
            <label htmlFor="qty">Quanity</label>
            <input
              type="number"
              placeholder='Quanity'
              disabled={loading}
              {...register("qty", {
                required: "Quanity please. 😂",
              })}
            />
            {errors.qty && typeof errors.qty.message === 'string' ? <p className='desc error'>{errors.qty.message}</p> : null}

          </div>
        
        </div>

        <div className="modal_btn">
          <button className="primary_btn" type='submit' disabled={loading}>
            {loading ? "Loading..." : "Submit"}
          </button>
        </div>
      </motion.form>
    </div>
  );
};

export default Modal;
