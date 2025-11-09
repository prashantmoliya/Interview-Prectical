import React from 'react'
import { Modal } from 'react-bootstrap';
import { loaders } from '../../loader/Loader';

const Primary = ({ show, handleClose, handleSetPrimary, loader }) => {
    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            centered
        >
            <Modal.Body className='text-center'>
                <h4>Primary Address</h4>

                <p className=''>
                    Are you sure you want to set this address as primary ?
                </p>

                <div className="d-flex justify-content-center gap-4">
                    <button type='button' className='main_btn no' onClick={handleClose}>
                        NO
                    </button>

                    <button type='button' className='main_btn yes' onClick={handleSetPrimary} disabled={loader}>
                        {
                            loader ? loaders.btn : 'YES'
                        }
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default Primary;