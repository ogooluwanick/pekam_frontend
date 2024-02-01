import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import useOnclickOutside from 'react-cool-onclickoutside';
import {motion} from "framer-motion"

interface ModalProps {
        productIndex: {
                name: string;
                _id: string;
                description: string;
                quantity: number; 
        };
        showModal: boolean;
        setShowModal: (show: boolean) => void;
}


const Modal: FC<ModalProps> = ({ showModal, setShowModal, productIndex }) => {
  const modalRef = useOnclickOutside(() => setShowModal(false));
  const { handleSubmit } = useForm();

  const [loading, setLoading] = useState(false);

  const submitHandler = async () => {
    setLoading(true);

    try {
      await axios.delete(`https://pekam-backend.onrender.com/api/product/delete/${productIndex._id}`);

      toast.success("Deleted Successfully!", { duration: 3500 });

      setShowModal(false);
      window.location.reload()
    } catch (err) {
        console.log("err", err);

        if (err instanceof Error) {
                toast.error(err.message, {
                        duration: 3500,
                });
        } else {
                console.error("An error occurred:", err);
        }
    }

    setLoading(false);
  };

  return (
    <div className='modal_box'>
      <div className="black-overlay" />
      <motion.form  initial={{ y: "100%" ,opacity:0 }} animate={{ y: 0 ,opacity:1}} exit={{ y: "100%" ,opacity:0}} transition={{ type: "spring", bounce: 0.3, duration: 0.35 }}   className='deleteModal' onSubmit={handleSubmit(submitHandler)} ref={modalRef}>
        <h1>Delete Waste Category</h1>
       
       <p>Are you sure you want to delete this waste categoty?</p>
        <div className="modal_btn">
          <button className="primary_btn cal"  disabled={loading} onClick={(e)=>{ e.preventDefault() ;setShowModal(false)}}>
                Cancel
          </button>
          <button className="primary_btn del" type='submit' disabled={loading}>
                {loading ? "Loading..." : "Delete "}
          </button>

        </div>
      </motion.form>
    </div>
  );
};

export default Modal;
