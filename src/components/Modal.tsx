import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import useOnclickOutside from 'react-cool-onclickoutside';

interface ModalProps {
        showModal: boolean;
        setShowModal: (show: boolean) => void;
}

const Modal: FC<ModalProps> = ({ showModal, setShowModal }) => {
  const modalRef = useOnclickOutside(() => setShowModal(false));
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  const [loading, setLoading] = useState(false);

  const submitHandler = async ({ name, desc, qty, price }: any) => {
    console.log("test", name, desc, qty);
    setLoading(true);

    try {
      let data = await axios.post('/api/product/create', {
        name,
        description: desc,
        price,
        quantity: qty,
      });

      console.log("data", data);

      toast.success(data.data.message, { duration: 3500 });

      setValue("name", "");
      setValue("desc", "");
      setValue("qty", "");
      setValue("price", "");

      setShowModal(false);
    } catch (err) {
        console.log("data", err);

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
      <form className='modal' onSubmit={handleSubmit(submitHandler)} ref={modalRef}>
        <h1>Create Assessment</h1>
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
          <div className="formController">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              placeholder='Price'
              disabled={loading}
              {...register("price", {
                required: "Price please. 😂",
              })}
            />
            {errors.price && typeof errors.price.message === 'string' ? <p className='desc error'>{errors.price.message}</p> : null}

          </div>
        </div>

        <div className="modal_btn">
          <button className="primary_btn" type='submit' disabled={loading}>
            {loading ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Modal;
