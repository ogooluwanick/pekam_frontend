import { useEffect, useState } from 'react'
import Modal from '../../components/Modal'
import SideMenu from '../../components/SideMenu'
import "./Assessment.scss"
import { SvgCaretLeft, SvgCaretRight, SvgRefresh } from '../../icons'
import axios from 'axios'
import toast from 'react-hot-toast'


const Assessment = () => {
        document.title = "Pakam | Assessment";

        const [showModal, setShowModal] = useState(false)
        const [products, setProducts] = useState([])
        const [page, setPage] = useState(1)

        const fetchData = async() =>{


                try {
                        let data = await axios.get(`/api/product/list?page=${page}&limit=${8}`);
                        console.log(data)
                        setProducts(data.data.data)
                } 
                catch (err) {
                        console.log("data",err)

                        toast.error((err.message),
                        {     
                                duration: 3500,
                        });
                }
        }

        useEffect(() => {
                fetchData()
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])

  return (
    <div className='assessment_page'>
        <SideMenu/>
        <div className="content">
                <header>
                        <h1>Assessment</h1>
                </header>
                <div className="btnBox">
                        <button className="primary_btn" onClick={()=>setShowModal(val=>!val)} >
                                Create
                        </button>
                </div>


                <div className="pakam_table">
                        <div className="tableControllers">
                                <button onClick={()=>  window.location.reload() }  >
                                        <SvgRefresh/>
                                        <span>
                                                Refresh
                                        </span>
                                </button>

                                <div className="pagination_controls">
                                        <span>
                                                {`01 of 0${page}`}
                                        </span>
                                        <div className="p_btns">
                                               <span onClick={()=>{ setPage(val=>val<=1 ? 1 : val-1) ; fetchData() }  }>
                                                        <SvgCaretLeft/>
                                                </span> 
                                               <span onClick={()=>{ setPage(val=>val+1); fetchData() }}>
                                                        <SvgCaretRight/>
                                                </span> 
                                        </div>

                                </div>
                        </div>
                        <table>
                                <thead>
                                        <tr>
                                                <th><input type="checkbox" name="" id="" /> Name</th>
                                                <th>Description</th>
                                                <th className='qty'>Quantity</th>
                                        </tr>
                                </thead>
                                <tbody>
                                        {
                                                products?.map((item, index) => (
                                                        <tr key={index}>
                                                                <td><input type="checkbox" name="" id="" /> {item.name}</td>
                                                                <td>{item.description}</td>
                                                                <td className='qty'>{item.quantity}</td>
                                                        </tr>
                                                )
                                        )}
                                </tbody>
                        </table>
                </div>
        </div>
        {
                showModal ? <Modal  showModal={showModal}   setShowModal={setShowModal}/>  : ""
        }
        
    </div>
  )
}

export default Assessment