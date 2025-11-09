import React, { useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { authHeader, Axios } from '../../../helper/Axios';
import { toast } from 'react-toastify';

const initialState = {
    name: "",
}

const AddCategory = ({ show, handleClose, GetCategory }) => {

    const [loading, setLoading] = useState(false);
    const [formData, setformData] = useState(initialState);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setformData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const res = await Axios.post("/category/add", formData, authHeader());

            if (res.data?.status) {
                toast.success(res.data?.message);

                setformData(initialState);
                GetCategory();
                handleClose();
            }
            else {
                toast.error(res.data?.message);
            }

        } catch (err) {
            if (err.response.status === 400) {
                toast.error(err.response.data.message);
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
                        Add Category
                    </h4>

                    <button type="button" className="btn-close text-reset" onClick={handleClose} />
                </div>
                <div className="offcanvas-body">
                    <form
                        onSubmit={handleSubmit}
                    >
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Name :
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                className="form-control"
                                placeholder="Enter Name"
                                autoComplete='off'
                                value={formData.name}
                                onChange={handleChange}
                                required
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

export default AddCategory;