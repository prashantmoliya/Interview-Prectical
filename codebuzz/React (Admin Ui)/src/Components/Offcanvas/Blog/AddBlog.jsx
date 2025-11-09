import React, { useEffect, useState } from 'react'
import { Offcanvas } from 'react-bootstrap'
import { authHeader, authImageHeader, Axios } from '../../../helper/Axios';
import { toast } from 'react-toastify';
import { Editor } from 'primereact/editor';

const initialState = {
    title: "",
    image: null,
    description: "",
    authorname: "",
}

const AddBlog = ({ show, handleClose, GetBlog }) => {

    const [loading, setLoading] = useState(false);
    const [formData, setformData] = useState(initialState);
    console.log("AddBlog++", formData);


    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setformData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const res = await Axios.post("/blog/add", formData, authImageHeader());

            if (res.data?.status) {
                toast.success(res.data?.message);

                setformData(initialState);
                GetBlog();
                handleClose();
            }
            else {
                toast.error(res.data?.message);
            }

        } catch (err) {
            if (err?.response?.status === 400) {
                toast.error(err?.response?.data?.message);
            }
            else if (!err?.response?.data?.status) {
                toast.error(err?.response?.data?.message);
            }
        }
        finally {
            setLoading(false);
        }
    }


    return (
        <Offcanvas show={show} onHide={handleClose} placement="end" className="adduser-offcanvas" scroll={true}>
            <div>
                <div className="offcanvas-header">
                    <h4 id="offcanvasAddorderLabel">
                        Add Blog
                    </h4>

                    <button type="button" className="btn-close text-reset" onClick={handleClose} />
                </div>
                <div className="offcanvas-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">
                                Title :
                            </label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                className="form-control"
                                placeholder="Enter Title"
                                autoComplete='off'
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="image" className="form-label">
                                Image :
                            </label>
                            <input
                                type="file"
                                name="image"
                                id="image"
                                className="form-control"
                                onChange={handleChange}
                                required
                                accept='image/*'
                            />
                            {formData.image && (
                                <div className="mb-2 mt-2">
                                    <img
                                        src={URL.createObjectURL(formData?.image)}
                                        alt="Image"
                                        className="img-thumbnail img-fluid"
                                        style={{
                                            maxWidth: "150px", maxHeight: "150px"
                                        }}
                                    />
                                </div>
                            )}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="authorname" className="form-label">
                                Author Name :
                            </label>
                            <input
                                type="text"
                                name="authorname"
                                id="authorname"
                                className="form-control"
                                placeholder="Enter Author Name"
                                autoComplete='off'
                                value={formData.authorname}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">
                                Description :
                            </label>

                            <Editor
                                name='description'
                                id="description"
                                placeholder="Enter Description"
                                autoComplete='off'
                                value={formData.description}
                                onTextChange={(e) => setformData({ ...formData, description: e.htmlValue })}
                                required
                                style={{
                                    height: '120px',
                                    fontSize: '15px',
                                    fontWeight: '500'
                                }}
                            />

                        </div>

                        <div className="text-end">
                            <button
                                type="submit"
                                className={`submit-btn ${loading ? 'btn-loading' : ''}`}
                                disabled={loading}
                            >
                                {loading && <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>}
                                {loading ?
                                    'Submitting...'
                                    :
                                    'Submit'
                                }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Offcanvas>
    )
}

export default AddBlog;