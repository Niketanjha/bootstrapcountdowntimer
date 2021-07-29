import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import Modal from 'react-bootstrap/Modal'
import { useEffect, useRef, useState } from 'react';

function App(){
    const [getModalState,setModalState]=useState(false);
    const [getTime,setTime]=useState(0);
    const [getTimerState,setTimerState]=useState(false);
    const reference=useRef(null);

    function tick(){
        if(getTimerState){
            setTime(getTime=>getTime+1);
        }
        else if (!getTimerState && getTime!==0){
            clearInterval(reference.current);
        }
        else{
            return ; 
        }

    }
    useEffect(()=>{
        reference.current=setInterval(()=>tick(),1000);
        return ()=>clearInterval(reference.current);
    },[getTimerState,getTime]);

    return(
        <div className="mainClass">
            <button 
            className="btn btn-lg btn-block btn-dark"
            id="openModalButton"
            onClick={()=>setModalState(true)}>
                Open Modal
            </button>
            <Modal
                show={getModalState}
                onHide={() => setModalState(false)}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                    React Background Count-down Timer
                </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{display:"flex",flexDirection:"column"}}>
                    <span style={{display:"flex",
                        alignSelf:"center"}} className="h1">{getTime}</span>
                    <button 
                    className="btn btn-lg btn-block btn-light"
                    onClick={()=>(setTimerState(getTimerState=>!getTimerState))}>
                        {getTimerState?"Stop":"Start"}
                    </button>
                </Modal.Body>
      </Modal>
        </div>
    );
}

export default App; 