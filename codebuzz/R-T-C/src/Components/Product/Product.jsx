import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DeleteProduct, GetProducts, PostProduct, PutProduct } from '../../ImageKit/Product/firebaseServices';
import { DeleteImageKit, GetImageKit, PostImageKit } from '../../ImageKit/Product/ImageServices';
import { toast } from 'react-toastify';

const initialState = {
    name: "",
    description: "",
    image: "",
    imageFileId: "",
}

const Product = () => {

    // Post-state
    const [formData, setFormData] = useState(initialState);
    const [submitLoader, setSubmitLoader] = useState(false);

    // Get-state
    const [products, setProducts] = useState([]);
    const [productRequest, setProductRequest] = useState({
        loader: false,
        error: null,
    });

    // Edit-state
    const [editMode, setEditMode] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);

    // handleChange
    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    }

    // console.log("product++", formData);

    // Post-Function
    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Submit++", formData);

        setSubmitLoader(true);

        let imageUrl, fileId;
        try {
            if (formData.image) {
                const resImg = await PostImageKit(formData.image);
                console.log("Res-ImageKit++", resImg);

                imageUrl = resImg?.url;
                fileId = resImg?.fileId;
            }

            let productData = { ...formData, image: imageUrl, imageFileId: fileId };

            const res = await PostProduct(productData);
            console.log("Res-Product++", res);

            toast.success("Product added successfully");

            GetProduct();
            setFormData(initialState);
            document.getElementById('image').value = "";

        } catch (err) {
            console.error("Error submitting product", err);
            toast.error("Failed to submit the product. Please try again.");
        } finally {
            setSubmitLoader(false);
        }
    }


    // Get-Function
    const GetProduct = async () => {
        setProductRequest((prev) => ({ ...prev, loader: true }));

        try {
            const data = await GetProducts();
            console.log("Res-Products++", data);

            setProducts(data);
        } catch (err) {
            setProductRequest((prev) => ({ ...prev, error: "Failed to load products." }));
        } finally {
            setProductRequest((prev) => ({ ...prev, loader: false }));
        }
    };

    // Delete-Function
    const handleDelete = async (productId, fileId) => {
        // console.log(productId, fileId);

        if (window.confirm("Do You Want To Delete ?")) {
            setProductRequest((prev) => ({ ...prev, loader: true }));

            try {
                if (fileId) {
                    await DeleteImageKit(fileId);
                }

                const res = await DeleteProduct(productId);
                console.log("Delete-Res-Product++", res);

                toast.success("product deleted successfully");

                // GetProduct();
                setProducts(prev => prev.filter(i => i.id !== productId));
            } catch (err) {
                toast.error("Something went wrong.");
            } finally {
                setProductRequest((prev) => ({ ...prev, loader: false }));
            }
        }
    }

    // Edit-handle
    const handleEdit = (product) => {
        setEditMode(true);
        setSelectedProductId(product.id);
        setFormData({
            name: product.name,
            description: product.description,
            image: product.image,
            imageFileId: product.imageFileId,
        });
    };

    // Put-Function
    const handleUpdate = async (e) => {
        e.preventDefault();

        console.log("Update++", formData);

        setSubmitLoader(true);

        let imageUrl= formData.image;
        let fileId= formData.imageFileId;

        try {
            if (typeof formData.image === 'object') {
                if (formData.imageFileId) {
                    await DeleteImageKit(formData.imageFileId);
                }

                const resImg = await PostImageKit(formData.image);
                console.log("Res-ImageKit++", resImg);

                imageUrl = resImg?.url;
                fileId = resImg?.fileId;
            }

            let productData = { ...formData, image: imageUrl, imageFileId: fileId };

            const res = await PutProduct(selectedProductId, productData);
            console.log("Res-Product++", res);

            toast.success("Product updated successfully");

            setEditMode(false);
            setSelectedProductId(null);

            GetProduct();
            setFormData(initialState);
            document.getElementById('image').value = "";

        } catch (err) {
            console.error("Error submitting product", err);
            toast.error("Failed to submit the product. Please try again.");
        } finally {
            setSubmitLoader(false);
        }
    }


    useEffect(() => {
        GetProduct();
        // GetImageKit();
    }, []);

    return (
        <>

            <div className='text-center mt-4'>
                <h2 style={{ textDecoration: 'underline' }}>Data Manage with Firebase & Imagekit</h2>
            </div>

            <div className='form'>
                <div className="card">
                    <div className="card-header" style={{ textAlign: 'left' }}>
                        <h2>
                            {/* Add Product */}
                            {editMode ? "Edit Product" : "Add Product"}
                        </h2>
                    </div>

                    <form onSubmit={editMode ? handleUpdate : handleSubmit}>
                        <div className="card-body" style={{ textAlign: 'left' }}>
                            <div className="row">
                                <div className="col-lg-12 mb-2">
                                    <div className="form-group">
                                        <label htmlFor='name'>Name</label>
                                        <input
                                            type='text'
                                            id="name"
                                            name="name"
                                            className="form-control"
                                            placeholder='Enter Name'
                                            value={formData.name}
                                            onChange={handleChange}
                                            required={!editMode}
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-12 mb-2">
                                    <div className="form-group">
                                        <label htmlFor='image'>Image</label>
                                        <input
                                            type='file'
                                            id="image"
                                            name="image"
                                            className="form-control"
                                            onChange={handleChange}
                                            accept='image/*'
                                            required={!editMode}
                                        />
                                        {formData.image && typeof formData.image === "string" && (
                                            <img src={formData.image} alt="Preview" style={{ width: "100px", marginTop: "10px" }} />
                                        )}
                                    </div>
                                </div>
                                <div className="col-lg-12 mb-2">
                                    <div className="form-group">
                                        <label htmlFor='description'>Description</label>
                                        <textarea
                                            type='description'
                                            id='description'
                                            name='description'
                                            className="form-control"
                                            placeholder='Enter Description'
                                            value={formData.description}
                                            onChange={handleChange}
                                            required={!editMode}
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="card-footer" style={{ textAlign: 'end' }}>
                            {editMode && (
                                <button
                                    type="button"
                                    className="btn btn-secondary me-2"
                                    onClick={() => {
                                        setEditMode(false);
                                        setSelectedProductId(null);
                                        setFormData(initialState);
                                    }}
                                >
                                    Cancel
                                </button>
                            )}

                            <button
                                type="submit"
                                className={`btn btn-primary ${submitLoader ? 'btn-loading' : ''}`}
                                disabled={submitLoader}
                            >
                                {submitLoader ?
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    :
                                    editMode ? "Update" : "Submit"
                                }
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div style={{ maxWidth: "90%", margin: 'auto', marginTop: "20px" }} className="">
                <div className="card">
                    {/* <div className="card-header d-flex justify-content-justify">
                        <Link to={'/add-user'} className="btn btn-success">Add User [+]</Link>

                        <button className="btn btn-danger ms-auto" onClick={HandleDeleteSelected} disabled={selectedUsers.length === 0}>
                            Delete Selected
                        </button>
                    </div> */}
                    <div className="card-body">
                        {
                            productRequest.loader ? (
                                <div className="d-flex justify-content-center align-items-center" style={{ height: '20vh' }}>
                                    <div className="spinner-border text-dark" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            )
                                :
                                productRequest.error ? (
                                    <div className="d-flex justify-content-center align-items-center" style={{ height: '20vh' }}>
                                        <div className='text-dark fs-4 fw-medium'>{productRequest.error}</div>
                                    </div>
                                )
                                    : (
                                        products?.length > 0 ? (
                                            <>
                                                <table className="table table-bordered">
                                                    <thead className="bg-dark text-white">
                                                        <tr>
                                                            <td>Sr No.</td>
                                                            {/* <td>Id</td> */}
                                                            <td>Name</td>
                                                            <td>Image</td>
                                                            <td>Description</td>
                                                            <td>Action</td>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            products?.map((i, index) => {
                                                                return (
                                                                    <tr key={i.id}>
                                                                        <td>{index + 1}.</td>
                                                                        <td>{i.name}</td>
                                                                        <td>
                                                                            <img src={i.image} alt="" style={{ width: "50%", height: "70px" }} />
                                                                        </td>
                                                                        <td>{i.description}</td>
                                                                        <td>
                                                                            <button
                                                                                type='button'
                                                                                className="btn btn-primary"
                                                                                onClick={() => handleEdit(i)}
                                                                            >
                                                                                Edit
                                                                            </button>
                                                                            &nbsp; | &nbsp;
                                                                            <button
                                                                                type='button'
                                                                                className="btn btn-danger"
                                                                                onClick={() => handleDelete(i.id, i.imageFileId)}
                                                                            >
                                                                                Delete
                                                                            </button>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                            </>
                                        ) : (
                                            <div className="d-flex justify-content-center align-items-center" style={{ height: '20vh' }}>
                                                <div className='text-dark fs-4 fw-medium'>Data Not Found</div>
                                            </div>
                                        )
                                    )
                        }

                    </div>

                </div>
            </div>

        </>
    )
}

export default Product;
