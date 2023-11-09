import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { updateBankService } from '../../Service/bank';


function EditBank({bankName, abbreviation, branch,show,setBankname,setBranch, setAbbreviation,setShow,editBankData}) {


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
   
    
    const handleSubmit=async()=>{
       
        editBankData();
        
        setShow(false);
    
    }



    return (
        <>
            <button className='btn btn-outline-success me-2'
                onClick={handleShow}
            ><i class="bi bi-pencil-square me-1"></i>Edit Detail</button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit bank</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form className="p-2">
                        <div className="mb-3">
                            <label className="form-label">Bank Name</label>
                            <input type="text" className="form-control rounded-pill text-primary fw-bold"
                                onChange={
                                    (e) => {setBankname(e.target.value) }
                                }
                                value={bankName}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Abbrebiation</label>
                            <input type="text" className="form-control rounded-pill text-primary fw-bold"
                                onChange={
                                    (e) =>{
                                    setAbbreviation(e.target.value)
                                    }
                                }

                                value={abbreviation}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Branch name</label>
                            <input type="text" className="form-control rounded-pill text-primary fw-bold"
                                onChange={(e) =>

                                    setBranch(e.target.value)
                                }

                                value={branch}
                            />
                        </div>
                        


                        {/* <button type="submit" className="btn-lg btn-success rounded-pill border-0"
                            onClick={
                                handleSubmit
                            }
                        >Submit</button> */}
                    </form>

                </Modal.Body>
                <Modal.Footer>
                    {/* <Button variant="dark" onClick={handleClose}>
                        Close
                    </Button> */}
                    <button className='btn btn-outline-secondary' onClick={handleClose}>Close</button>
                    <button className='btn btn-outline-primary' onClick={handleSubmit}>Update</button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default EditBank;