import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { imgKit } from '../../ImageKit/ImageKit';
import { Link } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';

const Gsap = () => {

    const headingRef = useRef(null);

    const [submitLoader, setSubmitLoader] = useState(false);
    const [imageUpload, setImageUpload] = useState(null);
    const [imageShow, setImageShow] = useState(null);

    const [liveUrl, setLiveUrl] = useState("");
    const [showLink, setShowLink] = useState(false);

    const [loader, setLoader] = useState(false);
    const [imageList, setImageList] = useState([]);


    const GetImage = async () => {
        setLoader(true);

        try {
            const res = await imgKit.listFiles({ path: '/images/', limit: 10 });
            console.log('Image list:', res);

            if (res?.$ResponseMetadata?.statusCode === 200) {
                // const images = res?.files || [];
                setImageList(res);
            }
        } catch (error) {
            console.error('Error fetching images:', error);
        } finally {
            setLoader(false);
        }
    };





    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageUpload(file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageShow(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleLiveUrlConvert = async () => {
        console.log(imageUpload);

        if (!imageUpload) return;

        setSubmitLoader(true);

        try {
            const fileName = `${imageUpload.name}_${Date.now()}`;
            const uploadParams = {
                file: imageUpload,
                fileName: fileName,
                folder: '/images/',
                tags: [],
            };

            const res = await imgKit.upload(uploadParams);
            console.log('Image-Kit Response:', res);

            if (res?.$ResponseMetadata?.statusCode === 200) {
                const url = res?.url;
                setLiveUrl(url);
                setImageUpload(null);
                setShowLink(true);

                toast.success("sent successfully");

                await GetImage();

                setTimeout(() => {
                    setShowLink(false);
                    setImageUpload(null);
                    setImageShow(null);
                }, 3000);
            }

        } catch (error) {
            console.error(error);
        } finally {
            setSubmitLoader(false);
        }
    }


    const ImageViewRedirect = (url) => {
        window.open(url, '_blank', 'incognito=yes');
    }


    const handledeleteImage = async (fileId) => {
        const userConfirmed = window.confirm('Are you sure you want to delete this image?');

        if (!userConfirmed) {
            return;
        }

        try {
            const res = await imgKit.deleteFile(fileId);
            // if (res?.$ResponseMetadata?.statusCode === 200) {
            console.log(`Image-ID ${fileId} deleted successfully.`, res);

            if (res?.$ResponseMetadata?.statusCode === 204) {
                toast.success("delete successfully");

                // await GetImage();
                setImageList(prevImageList => prevImageList.filter(image => image.fileId !== fileId));
            }
            // }
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    };




    useEffect(() => {
        // GSAP animation for the heading
        gsap.fromTo(
            headingRef.current, // Target the ref
            { opacity: 0, y: -50 }, // Starting properties
            { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" } // Ending properties
        );

        GetImage();
    }, []);
    return (
        <>

            <div className='text-center mt-4'>
                <h2 style={{ textDecoration: 'underline' }}>Gsap</h2>
            </div>

            <div className='text-center'>
                <div className='mt-5'>
                    <h2 ref={headingRef}>Hello GSAP</h2>
                </div>
            </div>

            <hr />

            <div className='text-center mt-5'>
                <div className='d-flex justify-content-center align-items-center'>
                    <h2 style={{ textDecoration: 'underline' }} className='me-2'>Imagekit</h2>
                    ->
                    <a href="https://imagekit.io/dashboard/media-library/L2ltYWdlcw?sort=ASC_CREATED&view=LIST" target='_blank'> visit</a>
                </div>

                <h5 style={{ textDecoration: '' }} className='mt-4'>Image-File covert Live-url</h5>

                <div className="row justify-content-center">

                    <div className='col-3 mt-2'>
                        <input
                            type="file"
                            name="image"
                            id="image"
                            className="form-control"
                            onChange={handleImageChange}
                            accept='image/*'
                        />
                        {imageShow && (
                            <div className="mb-3 mt-3">
                                <img
                                    src={imageShow}
                                    alt="Image"
                                    className="img-thumbnail img-fluid"
                                    style={{
                                        maxWidth: "140px", maxHeight: "140px", marginBottom: "10px"
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    <button className="btn btn-primary col-1 h-100 mt-2" type="button" onClick={handleLiveUrlConvert}>
                        {submitLoader && <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" disabled={submitLoader}></span>}
                        {submitLoader ? '' : 'Convert'}
                    </button>
                </div>

                {liveUrl && showLink && (
                    <div>
                        ->
                        <a href={liveUrl} target="_blank" rel="noopener noreferrer"> {liveUrl}</a>
                    </div>
                )}
            </div>

            <div className='container text-center mt-4'>
                <h5 style={{ textDecoration: '' }}>Get-Image</h5>

                {loader ? (
                    <div className="spinner-border mt-5" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                ) :
                    (
                        <table className="table table-bordered border-primary mt-4" style={{ width: '25%' }}>
                            <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Live Url</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody className="table-group">
                                {
                                    imageList?.map((i, index) => {
                                        return (
                                            <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>
                                                    <img
                                                        src={i.url}
                                                        alt="Image"
                                                        className="img-thumbnail img-fluid"
                                                        style={{
                                                            maxWidth: "60px", maxHeight: "60px",
                                                        }}
                                                    />
                                                </td>
                                                <td>
                                                    <button className='mt-3' style={{ textDecoration: "underline", border: "none", background: "none" }} onClick={() => ImageViewRedirect(i.url)}>click</button>
                                                </td>
                                                <td>
                                                    <div className='cursor-pointer mt-3' onClick={() => handledeleteImage(i.fileId)}>
                                                        <MdDelete size={22} />
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    )
                }
            </div >



        </>
    )
}

export default Gsap;

