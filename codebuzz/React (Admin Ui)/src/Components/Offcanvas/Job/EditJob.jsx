import React, { useEffect, useState } from 'react'
import { authHeader, Axios } from '../../../helper/Axios';
import { toast } from 'react-toastify';
import { Offcanvas } from 'react-bootstrap';
import { Editor } from 'primereact/editor';

const initialState = {
    title: "",
    companyName: "",
    category: "",
    description: "",
    url: null,
}

const EditJob = ({ show, handleClose, GetJob, jobs }) => {

    const [category, setCategory] = useState([]);

    const [loading, setLoading] = useState(false);
    const [formData, setformData] = useState(initialState);
    console.log("EditJob++", formData);

    const GetCategory = async () => {
        try {
            const res = await Axios.get("/category/list", authHeader());

            if (res.data?.status) {
                setCategory(res?.data?.data);
            }
        } catch (err) {
            console.error("Category-Error++", err);
        }
    }

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
            const res = await Axios.put(`/job/edit/${jobs?.id}`, formData, authHeader());

            if (res.data?.status) {
                toast.success(res.data?.message);

                setformData(initialState);
                GetJob();
                handleClose();
            }
            else {
                toast.error(res.data?.message);
            }

        } catch (err) {
            if (err.response?.status === 400) {
                toast.error(err.response.data.message);
            }
            if (err.response?.status === 404) {
                toast.error(err.response.data.message);
            }
            else if (err.response?.status === 500) {
                toast.error(err.response.data.message);
            }
        }
        finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        GetCategory();

        const currentCategory = category.find((i) => i.name === jobs?.categoryName)?.id;

        setformData({
            title: jobs?.title,
            companyName: jobs?.companyName,
            category: currentCategory,
            description: jobs?.description,
            url: jobs?.url || null,
        });
    }, [jobs]);


    return (
        <Offcanvas show={show} onHide={handleClose} placement="end" className="adduser-offcanvas" scroll={true}>
            <div>
                <div className="offcanvas-header">
                    <h4 id="offcanvasAddorderLabel">
                        Edit Job
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
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="companyName" className="form-label">
                                Company :
                            </label>
                            <input
                                type="text"
                                name="companyName"
                                id="companyName"
                                className="form-control"
                                placeholder="Enter Company"
                                autoComplete='off'
                                value={formData.companyName}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="category" className="form-label">
                                Category :
                            </label>
                            <select
                                className="form-select"
                                name='category'
                                id="category"
                                value={formData.category}
                                onChange={handleChange}
                            >
                                <option value="">Select Category</option>
                                {
                                    category?.map((i) => (
                                        <option key={i.id} value={i.id}>{i.name}</option>
                                    ))
                                }
                                <option value="Monthly">Monthly</option>
                                <option value="Yearly">Yearly</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">
                                Description :
                            </label>
                            {/* <textarea
                                type="text"
                                name='description'
                                id="description"
                                className="form-control"
                                placeholder="Enter Description"
                                autoComplete='off'
                                value={formData.description}
                                onChange={handleChange}
                                style={{ height: "100px" }}
                            /> */}

                            <Editor
                                name='description'
                                id="description"
                                placeholder="Enter Description"
                                autoComplete='off'
                                value={formData.description}
                                onTextChange={(e) => setformData({ ...formData, description: e.htmlValue })}
                                style={{
                                    height: '120px',
                                    fontSize: '15px',
                                    fontWeight: '500'
                                }}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="url" className="form-label">
                                Link :
                            </label>
                            <input
                                type="text"
                                name="url"
                                id="url"
                                className="form-control"
                                placeholder="Enter Link"
                                autoComplete='off'
                                value={formData.url || null}
                                onChange={handleChange}
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
                                    'Updating...'
                                    :
                                    'Update'
                                }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Offcanvas>
    )
}

export default EditJob