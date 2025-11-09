import React from 'react';
import { Modal } from 'react-bootstrap';

const Logout = ({ show, handleClose, isLogoutLoading, handleLogout }) => {
    return (
        // <Modal show={show} backdrop="static" centered>
        //     <div className="modal-header">
        //         <h5 className="modal-title" id="deleteModalLabel">
        //             Logout
        //         </h5>
        //     </div>
        //     <div className="modal-body">
        //         <p>
        //             Are you sure you want to logout ?
        //         </p>
        //     </div>
        //     <div className="modal-footer">
        //         <button
        //             type="button"
        //             className={`close-btn ${isLogoutLoading ? 'btn-loading' : ''}`}
        //             disabled={isLogoutLoading}
        //             onClick={handleLogout}
        //         >
        //             {isLogoutLoading && <span
        //                 className="spinner-border spinner-border-sm me-2"
        //                 role="status"
        //                 aria-hidden="true"
        //             ></span>
        //             }
        //             {/* {isLogoutLoading ? 'Logging out...' : 'Logout'} */}
        //             {isLogoutLoading ? '' : 'Yes'}
        //         </button>
        //         <button type="button" className="delete-btn" onClick={handleClose}>
        //             No
        //         </button>   
        //     </div>
        // </Modal>

        <Modal className='form' show={show} backdrop="static" centered>
            <div className="modal-header">
                <h5 className="modal-title m-auto mb-3" id="deleteModalLabel">
                    Logout
                </h5>
            </div>
            <div className="modal-body">
                <p className='text-center mb-0'>
                    Are you sure you want to logout ?
                </p>

                <div className='mt-4 d-flex justify-content-between'>
                    <button
                        type="button"
                        className={`close-btn ${isLogoutLoading ? 'btn-loading' : ''}`}
                        disabled={isLogoutLoading}
                        onClick={handleLogout}
                    >
                        {isLogoutLoading && <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                        ></span>
                        }
                        {/* {isLogoutLoading ? 'Logging out...' : 'Logout'} */}
                        {isLogoutLoading ? '' : 'Yes'}
                    </button>
                    <button type="button" className="delete-btn" onClick={handleClose}>
                        No
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export default Logout;