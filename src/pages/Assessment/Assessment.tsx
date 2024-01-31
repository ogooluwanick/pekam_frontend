import React, { useState, useEffect } from 'react';
import Modal from '../../components/Modal';
import DeleteModal from '../../components/DeleteModal';
import UpdateModal from '../../components/UpdateModal';
import MotionWrap from '../../components/MotionWrap';
import SideMenu from '../../components/SideMenu';
import "./Assessment.scss";
import { SvgCaretLeft, SvgCaretRight, SvgRefresh } from '../../icons';
import axios from 'axios';
import toast from 'react-hot-toast';
import {AnimatePresence} from "framer-motion"


interface Product {
  name: string;
  _id: string;
  description: string;
  quantity: number;
}

const Assessment: React.FC = () => {
  document.title = "Pakam | Assessment";

  const [showModal, setShowModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [updateModal, setUpdateModal] = useState<boolean>(false);
  const [productIndex, setProductIndex] = useState<Product>({
        name: '',
        _id: '',
        description: '',
        quantity: 0,
      });
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
console.log(page)
  const fetchData = async () => {
    try {
        let data = await axios.get(`https://pekam-backend.onrender.com/api/product/list?page=${page}&limit=${8}`);
        console.log(data);
        setProducts(data.data.products);
        setTotalPages(data.data.pages)
    } 
    catch (err) {
        console.log("data", err);

        if (err instanceof Error) {
                toast.error("Failed to load products", {duration: 3500,});
        } else {
                console.error("An error occurred:", err);
        }
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
        <MotionWrap>
        <div className='assessment_page'>
        <SideMenu />
        <div className="content">
                <header>
                <h1>Assessment</h1>
                </header>
                <div className="btnBox">
                <button className="primary_btn" onClick={() => setShowModal(val => !val)}>
                Create
                </button>
                </div>

                <div className="pakam_table">
                <div className="tableControllers">
                <button onClick={() => window.location.reload()}>
                <SvgRefresh />
                <span>
                        Refresh
                </span>
                </button>

                <div className="pagination_controls">
                <span>
                        {`0${page} of 0${totalPages}`}
                </span>
                <div className="p_btns">
                        <button onClick={() => { setPage(val => val <= 1 ? 1 : val - 1); fetchData() }} >
                        <SvgCaretLeft />
                        </button>
                        <button onClick={() => { setPage(val => val < totalPages ? val + 1 : val); fetchData() }}>
                        <SvgCaretRight />
                        </button>
                </div>
                </div>
                </div>
                <table>
                <thead>
                <tr>
                        <th><input type="checkbox" name="" id="" /> Name</th>
                        <th>Description</th>
                        <th className=''>Quantity</th>
                        <th className='action'>Action</th>
                </tr>
                </thead>
                <tbody>
                {
                        products?.map((item, index) => (
                                <tr key={index}>
                                <td><input type="checkbox" name="" id="" /> {item.name}</td>
                                <td>{item.description}</td>
                                <td className=''>{item.quantity}</td>
                                <td className='action'>
                                        <div className="pekam_btn primary" onClick={()=>{ setUpdateModal(true); setProductIndex(item) }}>Update</div>
                                        <div className="pekam_btn secondary" onClick={()=>{ setDeleteModal(true); setProductIndex(item) }}>Delete</div>
                                </td>
                                </tr>
                        ))
                }
                </tbody>
                </table>
                </div>
        </div>
        <AnimatePresence exitBeforeEnter >
        {
                showModal ? <Modal showModal={showModal} setShowModal={setShowModal} /> : undefined
        }
        </AnimatePresence>
        <AnimatePresence exitBeforeEnter >
        {
                deleteModal ? <DeleteModal showModal={deleteModal} setShowModal={setDeleteModal} productIndex={productIndex} /> : undefined
        }
        </AnimatePresence>
        <AnimatePresence exitBeforeEnter >
        {
                updateModal ? <UpdateModal showModal={updateModal} setShowModal={setUpdateModal} productIndex={productIndex} /> : undefined
        }
        </AnimatePresence>
        </div>
        </MotionWrap>
  )
}

export default Assessment;
