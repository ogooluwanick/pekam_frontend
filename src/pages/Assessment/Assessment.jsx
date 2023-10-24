import { useState } from 'react'
import Modal from '../../components/Modal'
import SideMenu from '../../components/SideMenu'

const Assessment = () => {
        document.title = "Pakam | Assessment";

        const [showModal, setShowModal] = useState(false)

  return (
    <div className='assessment_page'>
        <SideMenu/>
        <div className="content">
                <header>
                        
                </header>
                <button className="primary_btn" onClick={()=>setShowModal(val=>!val)} >
                        Create
                </button>
        </div>
        {
                showModal ? <Modal  showModal={showModal}   setShowModal={setShowModal}/>  : ""
        }
        
    </div>
  )
}

export default Assessment