import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';

// Image
// Light
import CopyLight from "../../../assets/images/modal/copy-light.svg";
import ShareLight from "../../../assets/images/modal/share-light.svg";
import WhatsupLight from "../../../assets/images/modal/whatsup-light.svg";
import GmailLight from "../../../assets/images/modal/gmail-light.svg";
import InstagramLight from "../../../assets/images/modal/instagram-light.svg";
import FacebookLight from "../../../assets/images/modal/facebook-light.svg";
// Dark

import useThemeMode from '../../../hooks/useThemeMode';

import { toast } from 'react-toastify';

const Share = ({ show, handleClose, productLink }) => {

    const ThemeMode = useThemeMode();

    const handleCopy = async (url) => {
        try {
            if (navigator?.clipboard && window?.isSecureContext) {
                await navigator.clipboard.writeText(url);
            } else {
                const textArea = document.createElement("textarea");
                textArea.value = url;
                textArea.style.position = "fixed";
                textArea.style.opacity = "0";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                document.execCommand("copy");
                document.body.removeChild(textArea);
            }

            toast.info("Copied!", {
                position: "top-center",
                icon: false,
                autoClose: 1500
            });
            handleClose();
        } catch (err) {
            console.error("Clipboard error:", err);
        }
    }

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            centered
        >
            <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>

            <Modal.Body>
                <h4 className='d-flex justify-content-center'>Share</h4>


                <form className='share'>
                    <div className="address">
                        <div className='title'>
                            Share this product

                            {/* <img src={HomeLight} alt="" className='img-fluid' draggable={false} /> */}
                        </div>


                        <div className='d-flex align-items-start justify-content-between'>
                            <p className='link'>
                                {
                                    productLink?.deepLink
                                }
                            </p>

                            <button
                                type="button"
                                className=""
                                onClick={() => {
                                    handleCopy(productLink?.deepLink)
                                }}
                            >
                                <img src={CopyLight} alt="Copy" className='img-fluid' draggable={false} />
                            </button>
                        </div>
                    </div>

                    <div className="social">
                        <button
                            type="button"
                            className=''
                            onClick={() => handleCopy(productLink?.deepLink)}
                        >
                            <img src={ShareLight} alt="" className='img-fluid' draggable={false} />
                        </button>
                        <button
                            type="button"
                            className=''
                        >
                            <img src={WhatsupLight} alt="" className='img-fluid' draggable={false} />
                        </button>
                        <button
                            type="button"
                            className=''
                        >
                            <img src={GmailLight} alt="" className='img-fluid' draggable={false} />
                        </button>
                        <button
                            type="button"
                            className=''
                        >
                            <img src={InstagramLight} alt="" className='img-fluid' draggable={false} />
                        </button>
                        <button
                            type="button"
                            className=''
                        >
                            <img src={FacebookLight} alt="" className='img-fluid' draggable={false} />
                        </button>
                    </div>
                </form>

            </Modal.Body>
        </Modal>
    )
}

export default Share;