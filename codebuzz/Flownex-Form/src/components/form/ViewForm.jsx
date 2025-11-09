import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import "./Form.css"
import FormBack from '../../assets/images/form-back.png';
import { visaCatagory, visaForm } from '../../constants/Data';
import { schemaFormData } from '../../constants/form-filed-data/SchemaData';
import ViewFormField from './ViewFormField';


const ViewForm = () => {

    const { userId, userFormId, category } = useParams();
    const { state = {} } = useLocation();
    console.log(state);
    const navigate = useNavigate();

    const selectedCategory = visaForm?.find(i => i.key === category);


    const formFinded = schemaFormData[selectedCategory?.key];
    console.log("form++", formFinded);


    const [activeField, setActiveField] = useState("");

    const formField = formFinded ? Object.entries(formFinded.fields) : [];
    console.log("Filed++", formField);


    useEffect(() => {
        if (formField.length > 0 && !activeField) {
            setActiveField(formField[0][0]);
        }
    }, [formField, activeField]);


    return (
        <section className="categorylist-section profile mt-3 mt-lg-3 mt-xl-4">
            <div className="row">
                {/* <div className="col-lg-12"> */}
                <div className="card pt-2 ps-0">
                    <div className="card-header pt-0 ps-2">
                        <div className="d-flex align-items-center justify-content-between flex-wrap">
                            <h3 className="mb-0 page-title">
                                <button type='button' className='bg-transparent border-0 me-4' onClick={() => navigate(-1)}>
                                    <img src={FormBack} alt="" />
                                </button>

                                {/* Work Visa Application */}
                                {selectedCategory?.category || ""}
                            </h3>
                        </div>
                    </div>

                    <div className="card-body table-responsive px-3">
                        <div className='form-menu mt-2 mb-5 group_btn d-flex align-items-center flex-wrap gap-4'>
                            {/* <button
                                type='button'
                                // className={`country_btn ${activeCountry === 'north-america' ? 'active' : ''}`}
                                className={`form_btn active`}
                            >
                                Personal Information
                            </button>
                            <button
                                type='button'
                                className={`form_btn`}
                            >
                                Identity Documents
                            </button>*/}


                            {formField?.map(([key, i]) => {
                                console.log(key, i);

                                return (
                                    <React.Fragment>
                                        <button
                                            type='button'
                                            // className={`country_btn ${activeCountry === 'north-america' ? 'active' : ''}`}
                                            className={`form_btn ${activeField === key ? 'active' : ''}`}
                                            onClick={() => setActiveField(key)}
                                        >
                                            {i?.label}
                                        </button>
                                    </React.Fragment>
                                )
                            })}
                        </div>

                        <div className="edit-user profile-user forms">
                            <div className="row">
                                <div className="d-flex align-items-center justify-content-between">
                                    <h2 className="title">
                                        {formFinded?.fields[activeField]?.label}
                                    </h2>
                                </div>

                                {/* Dynamic fields */}
                                <ViewFormField
                                    schema={formFinded}
                                    activeField={activeField}
                                />

                            </div>
                        </div>
                    </div>
                </div>
                {/* </div> */}
            </div >
        </section >
    )
}

export default ViewForm;