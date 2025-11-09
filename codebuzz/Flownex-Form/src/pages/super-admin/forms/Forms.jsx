import React, { useState } from 'react'
import Form from "../../../assets/images/forms.png";
import Share from "../../../assets/images/share.png";
import { CgEye } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';
import { visaCatagory, visaForm } from '../../../constants/Data';

const Forms = () => {

    const navigate = useNavigate();
    const [category, setCategory] = useState(null);

    const handleCategoryChange = (e) => {
        const selectedValue = e.target.value;
        const selectedCategory = visaForm?.find(i => i.value === selectedValue);
        setCategory(selectedCategory);
    };

    return (
        <>
            {/* {!category && ( */}
            <form className="dashboard form row">
                <div className="category-select col-xxl-4 col-xl-6 col-lg-8 col-md-7 col-12 mt-lg-5 mt-4">
                    <label htmlFor="category" className="form-label">Form for Visa :</label>

                    <select
                        className="form-select form-control"
                        id="category"
                        name="category"
                        onChange={handleCategoryChange}
                    >
                        <option selected>Select Form</option>
                        {
                            visaForm?.map((i, index) => {
                                return (
                                    <option value={i.value} key={index}>{i.category}</option>
                                )
                            })
                        }
                    </select>
                </div>
            </form>
            {/* )} */}

            {category && (
                <div className="dashboard">
                    <div className="row gx-5 mb-5">

                        <div className="col-xxl-4 col-xl-6 col-lg-8 col-md-7 col-12 mt-lg-5 mt-4 dashboard-card" >
                            <div>
                                <div className="card shadow border-0">
                                    <div className="card-body">
                                        <div className="row align-items-center">
                                            <div className="col">
                                                <div className="icon icon-shape bg-tertiary text-dark text-lg rounded-circle cursor-pointer">
                                                    <img src={Form} alt="Share" className='img-fluid' />
                                                </div>
                                                <span className="h6 fw-semibold text-muted text-sm d-block mt-3 mb-2 title">
                                                    {category.category} Application
                                                </span>
                                                <p className="mb-0">
                                                    Canteen provides affordable meals, supporting students’ daily nutrition needs.
                                                </p>
                                            </div>
                                            <div className="col-auto">
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-neutral text-nowrap eye-icon view-forms-icon"
                                                    style={{ width: '40px', height: '40px' }}
                                                    onClick={() => navigate(`/superadmin/forms/view/${category.key}`)}>
                                                    <CgEye size={21} color='#013369' />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div >
            )}

        </>
    )
}

export default Forms
