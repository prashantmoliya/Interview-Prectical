import React from 'react'
import { Modal } from 'react-bootstrap';

// Css
import "./Modal.scss"
import { loaders } from '../../loader/Loader';

const Delete = ({ show, handleClose, handleDelete, loader }) => {
    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            centered
        >
            <Modal.Body className='text-center'>
                <h4>Delete Address</h4>

                <p className=''>
                    Are you sure you want to delete this address ?
                </p>

                <div className="d-flex justify-content-center gap-4">
                    <button type='button' className='main_btn no' onClick={handleClose}>
                        NO
                    </button>

                    <button type='button' className='main_btn yes' onClick={handleDelete} disabled={loader}>
                        {
                            loader ? loaders.btn : 'YES'
                        }
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default Delete;