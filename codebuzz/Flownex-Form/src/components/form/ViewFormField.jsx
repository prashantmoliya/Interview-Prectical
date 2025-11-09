// import React from 'react'

// const ViewFormField = ({ fields = [] }) => {

//     console.log('Form-Field', fields);

//     return (
//         <div>

//             <form className="row"
//             // onSubmit={handleUpdate}
//             >
//                 {
//                     fields?.map((i, index) => {
//                         return (
//                             <div key={index} className="col-lg-6 col-12 mb-4 mt-1">
//                                 <label
//                                     htmlFor={i?.id}
//                                     className="form-label"
//                                 >
//                                     {i?.label} {i?.required && "*"}
//                                 </label>
//                                 <input
//                                     type={i?.type}
//                                     name={i?.id}
//                                     id={i?.id}
//                                     className="form-control"
//                                     autoComplete='off'
//                                     placeholder={i?.label}
//                                     required={i?.required}
//                                     readOnly
//                                 />
//                             </div>
//                         )
//                     })
//                 }






//             </form>

//         </div>
//     )
// }

// export default ViewFormField;
















// {/* <div className="col-lg-6 col-12 mb-4 mt-1">
//                     <label htmlFor="name" className="form-label">
//                         UCI Number (optional)
//                     </label>
//                     <input
//                         type="text"
//                         name="name"
//                         id="name"
//                         className="form-control"
//                         autoComplete='off'
//                         placeholder='Enter UCI number if available'
//                         required
//                     />
//                 </div>
//                 <div className="col-lg-6 col-12 mb-4 mt-1">
//                     <label htmlFor="name" className="form-label">
//                         Service Language *
//                     </label>
//                     <select
//                         className={`form-control`}
//                         name="service_language"
//                         required
//                     >
//                         <option value="">Select language</option>
//                         <option value="english">English</option>
//                         <option value="french">French</option>
//                     </select>
//                 </div>
//                 <div className="col-lg-6 col-12 mb-4 mt-1">
//                     <label htmlFor="name" className="form-label">
//                         Family Name *
//                     </label>
//                     <input
//                         type="text"
//                         name="name"
//                         id="name"
//                         className="form-control"
//                         autoComplete='off'
//                         readOnly
//                     />
//                 </div>
//                 <div className="col-lg-6 col-12 mb-4 mt-1">
//                     <label htmlFor="name" className="form-label">
//                         Given Names *
//                     </label>
//                     <input
//                         type="text"
//                         name="name"
//                         id="name"
//                         className="form-control"
//                         autoComplete='off'
//                         readOnly
//                     />
//                 </div>
//                 <div className="col-lg-6 col-12 mb-4 mt-1">
//                     <label htmlFor="name" className="form-label">
//                         Nicknames/Aliases
//                     </label>
//                     <input
//                         type="text"
//                         name="name"
//                         id="name"
//                         className="form-control"
//                         autoComplete='off'
//                         readOnly
//                     />
//                 </div>
//                 <div className="col-lg-6 col-12 mb-4 mt-1">
//                     <label htmlFor="name" className="form-label">
//                         Date of Birth *
//                     </label>
//                     <input
//                         type="date"
//                         name="name"
//                         id="name"
//                         className="form-control"
//                         autoComplete='off'
//                         readOnly
//                     />
//                 </div>
//                 <div className="col-lg-6 col-12 mb-4 mt-1">
//                     <label htmlFor="name" className="form-label">
//                         Place of Birth *
//                     </label>
//                     <input
//                         type="date"
//                         name="name"
//                         id="name"
//                         className="form-control"
//                         autoComplete='off'
//                         readOnly
//                     />
//                 </div>
//                 <div className="col-lg-6 col-12 mb-4 mt-1">
//                     <label htmlFor="name" className="form-label">
//                         Country of Birth *
//                     </label>
//                     <input
//                         type="date"
//                         name="name"
//                         id="name"
//                         className="form-control"
//                         autoComplete='off'
//                         readOnly
//                     />
//                 </div>
//                 <div className="col-lg-6 col-12 mb-4 mt-1">
//                     <label htmlFor="name" className="form-label">
//                         Citizenship/Nationality *
//                     </label>
//                     <input
//                         type="text"
//                         name="name"
//                         id="name"
//                         className="form-control"
//                         autoComplete='off'
//                         readOnly
//                     />
//                 </div>
//                 <div className="col-lg-6 col-12 mb-4 mt-1">
//                     <label htmlFor="name" className="form-label">
//                         Current Country of Residence *
//                     </label>
//                     <input
//                         type="text"
//                         name="name"
//                         id="name"
//                         className="form-control"
//                         autoComplete='off'
//                         readOnly
//                     />
//                 </div>
//                 <div className="col-lg-6 col-12 mb-4 mt-1">
//                     <label htmlFor="name" className="form-label">
//                         Marital Status *
//                     </label>
//                     <select
//                         className={`form-control`}
//                         name="service_language"
//                         required
//                     >
//                         <option value="">Select language</option>
//                         <option value="english">English</option>
//                         <option value="french">French</option>
//                     </select>
//                 </div> */}
// {/* <div className="col-lg-6 col-12 mb-4 mt-1">
//                                                     <label htmlFor="mobileNumber" className="form-label">
//                                                         Phone Number :
//                                                     </label>
//                                                     <input
//                                                         type="text"
//                                                         pattern='\d*'
//                                                         maxLength={12}
//                                                         name="mobileNumber"
//                                                         id="mobileNumber"
//                                                         className="form-control"
//                                                         autoComplete='off'
//                                                         onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
//                                                         required
//                                                     />
//                                                 </div> */}

// {/* <div className='col-12 mt-4 d-flex justify-content-end gap-4'>
//                     <button
//                         type="submit"
//                         className={`submit-btn w-100`}
//                     >
//                         Submit
//                     </button>
//                 </div> */}














// import React from "react";
// import DatePicker from "react-datepicker";
// import SelectInput from "./SelectInput";

// const ViewFormField = ({ fields = [], formData = {} }) => {
//     console.log('Form-Field', fields);


//     // Render a field type-wise
//     const renderField = (field, parentPath = "") => {
//         const key = parentPath ? `${parentPath}.${field.id}` : field.id;
//         const value = formData[key];

//         const safeOptions = Array.isArray(field.options) ? field.options : [];

//         switch (field.type) {
//             case "text":
//             case "number":
//             case "date":
//             case "email":
//             case "password":
//                 return (
//                     <input
//                         type={field.type}
//                         id={field.id}
//                         name={field.id}
//                         value={value || ""}
//                         placeholder={field.label}
//                         className="form-control"
//                         readOnly
//                     />
//                 );

//             case "textarea":
//                 return (
//                     <textarea
//                         id={field.id}
//                         name={field.id}
//                         value={value || ""}
//                         placeholder={field.label}
//                         className="form-control"
//                         rows={4}
//                         readOnly
//                     />
//                 );


//             case "yesno":
//                 return (
//                     <div>
//                         <SelectInput
//                             options={["Yes", "No"]}
//                             value={value}
//                             // onChange={(val) => handleChange(fieldId, val, field, parentPath)}
//                             onChange={() => {}}
//                             placeholder="Select..."
//                             // error={errors[fieldId]}
//                         />
//                     </div>
//                 );

//             case "select":
//                 return (
//                     <select
//                         id={field.id}
//                         name={field.id}
//                         value={value || ""}
//                         className="form-control"
//                         disabled
//                     >
//                         <option value="">Select {field.label}</option>
//                         {safeOptions.map((opt, idx) => (
//                             <option key={idx} value={opt.value}>
//                                 {opt.label}
//                             </option>
//                         ))}
//                     </select>
//                 );

//             case "radio":
//                 return (
//                     <div>
//                         {safeOptions.map((opt, idx) => (
//                             <div key={idx} className="form-check">
//                                 <input
//                                     type="radio"
//                                     id={`${field.id}_${idx}`}
//                                     name={field.id}
//                                     value={opt.value}
//                                     checked={value === opt.value}
//                                     className="form-check-input"
//                                     disabled
//                                 />
//                                 <label htmlFor={`${field.id}_${idx}`} className="form-check-label">
//                                     {opt.label}
//                                 </label>
//                             </div>
//                         ))}
//                     </div>
//                 );

//             case "checkbox":
//                 return (
//                     <div>
//                         {safeOptions.map((opt, idx) => (
//                             <div key={idx} className="form-check">
//                                 <input
//                                     type="checkbox"
//                                     id={`${field.id}_${idx}`}
//                                     name={field.id}
//                                     value={opt.value}
//                                     checked={Array.isArray(value) && value.includes(opt.value)}
//                                     className="form-check-input"
//                                     disabled
//                                 />
//                                 <label htmlFor={`${field.id}_${idx}`} className="form-check-label">
//                                     {opt.label}
//                                 </label>
//                             </div>
//                         ))}
//                     </div>
//                 );

//             case "phone":
//                 return (
//                     <div className="d-flex gap-2">
//                         <input
//                             type="text"
//                             value={value?.country_code || ""}
//                             className="form-control w-25"
//                             readOnly
//                         />
//                         <input
//                             type="text"
//                             value={value?.phone_number || ""}
//                             className="form-control w-75"
//                             readOnly
//                         />
//                     </div>
//                 );

//             case "group":
//                 return (
//                     <div className="row">
//                         {field.fields?.map((subField, idx) => (
//                             <div key={idx} className="col-lg-6 col-12 mb-4 mt-1">
//                                 <label className="form-label">
//                                     {subField.label} {subField.required && "*"}
//                                 </label>
//                                 {renderField(subField, key)}
//                             </div>
//                         ))}
//                     </div>
//                 );

//             case "repeater":
//                 return (
//                     <div>
//                         {(formData[key] || []).map((row, rowIndex) => (
//                             <div key={rowIndex} className="row border p-2 mb-2">
//                                 {field.fields?.map((subField, idx) => (
//                                     <div key={idx} className="col-lg-6 col-12 mb-3">
//                                         <label className="form-label">
//                                             {subField.label} {subField.required && "*"}
//                                         </label>
//                                         {renderField(subField, `${key}.${rowIndex}`)}
//                                     </div>
//                                 ))}
//                             </div>
//                         ))}
//                     </div>
//                 );

//             default:
//                 return (
//                     <input
//                         type="text"
//                         id={field.id}
//                         name={field.id}
//                         value={value || ""}
//                         className="form-control"
//                         readOnly
//                     />
//                 );
//         }
//     };

//     return (
//         <div>
//             <form className="row">
//                 {fields?.map((field, index) => (
//                     <div key={index} className="col-lg-6 col-12 mb-4 mt-1">
//                         <label htmlFor={field.id} className="form-label">
//                             {field.label} {field.required && "*"}
//                         </label>
//                         {renderField(field)}
//                     </div>
//                 ))}
//             </form>
//         </div>
//     );
// };

// export default ViewFormField;









// import React from "react";
// import SelectInput from "./SelectInput";

// const ViewFormField = ({ fields = [], formData = {} }) => {
//     console.log('Form-Field', fields);



//     const isShown = (field, parentPath) => {
//         if (!field?.showIf) return true;

//         if (typeof field.showIf === "string") {
//             const [depField, depValue] = field.showIf.split(":");
//             const depKey = depField.includes(".")
//                 ? depField
//                 : `${parentPath}.${depField}`;
//             const val = formData[depKey];

//             if (val === undefined || val === null || val === "") return false;
//             return Array.isArray(val) ? val.includes(depValue) : val === depValue;
//         }

//         if (typeof field.showIf === "object") {
//             const depField = field.showIf.field || "";
//             const depKey = depField.includes(".")
//                 ? depField
//                 : `${parentPath}.${depField}`;
//             const val = formData[depKey];

//             if (val === undefined || val === null || val === "") return false;

//             if (Array.isArray(field.showIf.notIn)) {
//                 return !field.showIf.notIn.includes(val);
//             }

//             const expected = field.showIf.equals ?? field.showIf.value;
//             if (Array.isArray(expected)) {
//                 return expected.includes(val);
//             }

//             return Array.isArray(val) ? val.includes(expected) : val === expected;
//         }

//         return true;
//     };

//     // ✅ Recursive renderer
//     const renderField = (field, parentPath = "") => {
//         if (!isShown(field, parentPath)) return null;

//         const key = parentPath ? `${parentPath}.${field.id}` : field.id;
//         const value = formData[key];

//         const safeOptions = Array.isArray(field.options) ? field.options : [];

//         // ✅ Handle showIf condition
//         if (field.showIf) {
//             const depKey = parentPath ? `${parentPath}.${field.showIf.field}` : field.showIf.field;
//             const depValue = formData[depKey];

//             // If condition not satisfied, skip rendering
//             if (Array.isArray(field.showIf.equals)) {
//                 if (!field.showIf.equals.includes(depValue)) return null;
//             } else {
//                 if (depValue !== field.showIf.equals) return null;
//             }
//         }

//         switch (field.type) {
//             case "text":
//             case "number":
//             case "date":
//             case "email":
//             case "password":
//                 return (
//                     <input
//                         type={field.type}
//                         id={field.id}
//                         name={field.id}
//                         value={value || ""}
//                         placeholder={field.label}
//                         className="form-control"
//                         readOnly
//                     />
//                 );

//             case "textarea":
//                 return (
//                     <textarea
//                         id={field.id}
//                         name={field.id}
//                         value={value || ""}
//                         placeholder={field.label}
//                         className="form-control"
//                         rows={4}
//                         readOnly
//                     />
//                 );

//             case "yesno":
//                 return (
//                     <SelectInput
//                         options={["Yes", "No"]}
//                         value={value}
//                         onChange={() => { }} // read-only
//                         placeholder="Select..."
//                     />
//                 );

//             case "select":
//                 return (
//                     <select
//                         id={field.id}
//                         name={field.id}
//                         value={value || ""}
//                         className="form-control"
//                         disabled
//                     >
//                         <option value="">Select {field.label}</option>
//                         {safeOptions.map((opt, idx) => (
//                             <option key={idx} value={opt.value || opt}>
//                                 {opt.label || opt}
//                             </option>
//                         ))}
//                     </select>
//                 );

//             case "radio":
//                 return (
//                     <div>
//                         {safeOptions.map((opt, idx) => (
//                             <div key={idx} className="form-check">
//                                 <input
//                                     type="radio"
//                                     id={`${field.id}_${idx}`}
//                                     name={field.id}
//                                     value={opt.value}
//                                     checked={value === opt.value}
//                                     className="form-check-input"
//                                     disabled
//                                 />
//                                 <label htmlFor={`${field.id}_${idx}`} className="form-check-label">
//                                     {opt.label}
//                                 </label>
//                             </div>
//                         ))}
//                     </div>
//                 );

//             case "checkbox":
//                 return (
//                     <div>
//                         {safeOptions.map((opt, idx) => (
//                             <div key={idx} className="form-check">
//                                 <input
//                                     type="checkbox"
//                                     id={`${field.id}_${idx}`}
//                                     name={field.id}
//                                     value={opt.value}
//                                     checked={Array.isArray(value) && value.includes(opt.value)}
//                                     className="form-check-input"
//                                     disabled
//                                 />
//                                 <label htmlFor={`${field.id}_${idx}`} className="form-check-label">
//                                     {opt.label}
//                                 </label>
//                             </div>
//                         ))}
//                     </div>
//                 );

//             case "phone":
//                 return (
//                     <div className="d-flex gap-2">
//                         <input
//                             type="text"
//                             value={value?.country_code || ""}
//                             className="form-control w-25"
//                             readOnly
//                         />
//                         <input
//                             type="text"
//                             value={value?.phone_number || ""}
//                             className="form-control w-75"
//                             readOnly
//                         />
//                     </div>
//                 );

//             case "group":
//                 return (
//                     <div className="row">
//                         {field.fields?.map((subField, idx) => (
//                             <div key={idx} className="col-lg-6 col-12 mb-4 mt-1">
//                                 <label className="form-label">
//                                     {subField.label} {subField.required && "*"}
//                                 </label>
//                                 {renderField(subField, key)}
//                             </div>
//                         ))}
//                     </div>
//                 );

//             case "repeater":
//                 return (
//                     <div>
//                         {(formData[key] || []).map((row, rowIndex) => (
//                             <div key={rowIndex} className="row border p-2 mb-2">
//                                 {field.fields?.map((subField, idx) => (
//                                     <div key={idx} className="col-lg-6 col-12 mb-3">
//                                         <label className="form-label">
//                                             {subField.label} {subField.required && "*"}
//                                         </label>
//                                         {renderField(subField, `${key}.${rowIndex}`)}
//                                     </div>
//                                 ))}
//                             </div>
//                         ))}
//                     </div>
//                 );

//             default:
//                 return (
//                     <input
//                         type="text"
//                         id={field.id}
//                         name={field.id}
//                         value={value || ""}
//                         className="form-control"
//                         readOnly
//                     />
//                 );
//         }
//     };

//     return (
//         <div>
//             <form className="row">
//                 {fields?.map((field, index) => (
//                     <div key={index} className="col-lg-6 col-12 mb-4 mt-1">
//                         <label htmlFor={field.id} className="form-label">
//                             {field.label} {field.required && "*"}
//                         </label>
//                         {renderField(field)}
//                     </div>
//                 ))}
//             </form>
//         </div>
//     );
// };

// export default ViewFormField;




import React, { useState } from "react";
import SelectInput from "./SelectInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Calendar, PlusCircle, Trash2 } from "lucide-react";
import SelectPhoneNew from "./SelectPhoneNew";

const today = new Date();
today.setHours(0, 0, 0, 0);

const ViewFormField = ({ schema = [], activeField = '' }) => {
    console.log("schema", schema);


    const [formData, setFormData] = useState({});


    const handleChange = (id, value, field, parentPath) => {
        console.log("handleChange", id, value, field, parentPath);

        setFormData((prev) => ({ ...prev, [id]: value }));
    };


    const isShown = (field, parentPath) => {
        if (!field?.showIf) return true;

        if (typeof field.showIf === "string") {
            const [depField, depValue] = field.showIf.split(":");
            const depKey = depField.includes(".")
                ? depField
                : `${parentPath}.${depField}`;
            const val = formData[depKey];

            if (val === undefined || val === null || val === "") return false;
            return Array.isArray(val) ? val.includes(depValue) : val === depValue;
        }

        if (typeof field.showIf === "object") {
            const depField = field.showIf.field || "";
            const depKey = depField.includes(".")
                ? depField
                : `${parentPath}.${depField}`;
            const val = formData[depKey];

            if (val === undefined || val === null || val === "") return false;

            if (Array.isArray(field.showIf.notIn)) {
                return !field.showIf.notIn.includes(val);
            }

            const expected = field.showIf.equals ?? field.showIf.value;
            if (Array.isArray(expected)) {
                return expected.includes(val);
            }

            return Array.isArray(val) ? val.includes(expected) : val === expected;
        }

        return true;
    };


    const renderDate = ({ field, fieldId, value, parentPath }) => {
        let maxDate = null;
        let minDate = null;

        if (field.dateLimit === "past" || field.dateLimit === "pastOrToday") {
            maxDate = today;
        }
        if (field.dateLimit === "future" || field.dateLimit === "futureOrToday") {
            minDate = today;
        }

        return (
            <div className="col-lg-6 col-12 mb-4 mt-1" key={fieldId} data-field-id={fieldId}>
                <label htmlFor={field.id} className="form-label">
                    {field.label} {field.required && "*"}
                </label>
                <div className="position-relative">
                    <DatePicker
                        selected={value ? new Date(value) : null}
                        onChange={(date) =>
                            handleChange(
                                fieldId,
                                date ? date.toISOString().split("T")[0] : "",
                                field,
                                parentPath
                            )
                        }
                        className="form-control ps-3 react-date-input"
                        style={{
                            paddingLeft: '40px !important'
                        }}
                        placeholderText="Select a date"
                        dateFormat="yyyy-MM-dd"
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        minDate={minDate}
                        maxDate={maxDate}
                        shouldCloseOnSelect
                        onChangeRaw={(e) => e.preventDefault()}
                    />
                    <Calendar
                        className="position-absolute text-secondary"
                        style={{
                            right: "12px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            pointerEvents: "none",
                            height: "20px",
                            width: "20px"
                        }}
                    />
                </div>
            </div>
        );
    };

    const addRepeaterRow = (repPath, fields, max) => {
        const rows = formData[repPath] || [];
        if (max && rows.length >= max) {
            toast.error(`You can only add up to ${max} entries`);
            return;
        }

        const newRow = {};
        fields.forEach(f => {
            if (f.type === "group") newRow[f.id] = {};
            else if (f.type === "repeater") newRow[f.id] = [];
            else newRow[f.id] = "";
        });

        handleChange(repPath, [...rows, newRow]);
    };

    // Recursive renderer
    const renderField = (field, parentPath = "") => {
        if (!isShown(field, parentPath)) return null;

        const key = parentPath ? `${parentPath}.${field.id}` : field.id;

        const fieldId = `${parentPath}.${field.id}`;
        const value = formData[fieldId];

        const safeOptions = Array.isArray(field.options) ? field.options : [];

        // console.log("fieldId", fieldId);


        // Handle showIf logic
        // if (field.showIf) {
        //     const depKey = parentPath ? `${parentPath}.${field.showIf.field}` : field.showIf.field;
        //     const depValue = formData[depKey];

        //     if (Array.isArray(field.showIf.equals)) {
        //         if (!field.showIf.equals.includes(depValue)) return null;
        //     } else {
        //         if (depValue !== field.showIf.equals) return null;
        //     }
        // }

        switch (field.type) {
            case "date":
                return renderDate({ field, fieldId, value, parentPath });

            case "text":
            case "number":
            case "email":
            case "password":
                return (
                    <div className="col-lg-6 col-12 mb-4 mt-1" key={fieldId} data-field-id={fieldId}>
                        <label htmlFor={field.id} className="form-label">
                            {field.label} {field.required && "*"}
                        </label>

                        <input
                            type={field.type}
                            id={field.id}
                            name={field.id}
                            value={value || ""}
                            placeholder={field.label}
                            className="form-control"
                            readOnly
                        />
                    </div>
                );

            case "textarea":
                return (
                    <div className="col-lg-6 col-12 mb-4 mt-1" key={fieldId} data-field-id={fieldId}>
                        <label htmlFor={field.id} className="form-label">
                            {field.label} {field.required && "*"}
                        </label>
                        <textarea
                            id={field.id}
                            name={field.id}
                            value={value || ""}
                            placeholder={field.label}
                            className="form-control"
                            rows={3}
                            readOnly
                        />
                    </div>
                );

            case "yesno":
                return (
                    <div className="col-lg-6 col-12 mb-4 mt-1" key={fieldId} data-field-id={fieldId}>
                        <label htmlFor={field.id} className="form-label">
                            {field.label} {field.required && "*"}
                        </label>

                        <SelectInput
                            options={["Yes", "No"]}
                            value={value}
                            onChange={(value) => handleChange(fieldId, value, field, parentPath)}
                            placeholder="Select..."
                            readOnly={true}
                        />
                    </div>
                );

            case "select":
                return (<div className="col-lg-6 col-12 mb-4 mt-1" key={fieldId} data-field-id={fieldId}>
                    <label htmlFor={field.id} className="form-label">
                        {field.label} {field.required && "*"}
                    </label>

                    <SelectInput
                        options={safeOptions}
                        value={value}
                        onChange={(value) => handleChange(fieldId, value, field, parentPath)}
                        placeholder={`Select ${field.label}`}
                        readOnly={true}
                    />
                </div>
                );

            case "multiselect":
                return (
                    <div className="col-lg-6 col-12 mb-4 mt-1" key={fieldId} data-field-id={fieldId}>
                        <label htmlFor={field.id} className="form-label">
                            {field.label} {field.required && "*"}
                        </label>

                        <SelectInput
                            options={safeOptions}
                            value={value || []}
                            onChange={() => { }}
                            placeholder={`Select ${field.label}`}
                            readOnly={true}
                            searchable={true}
                        />
                    </div>
                );

            case "radio":
                return (
                    <div className="col-lg-6 col-12 mb-4 mt-1" key={fieldId} data-field-id={fieldId}>
                        <label htmlFor={field.id} className="form-label">
                            {field.label} {field.required && "*"}
                        </label>

                        {safeOptions.map((opt, idx) => (
                            <div key={idx} className="form-check">
                                <input
                                    type="radio"
                                    id={`${field.id}_${idx}`}
                                    name={field.id}
                                    value={opt.value || opt}
                                    checked={value === (opt.value || opt)}
                                    className="form-check-input"
                                    disabled
                                />
                                <label htmlFor={`${field.id}_${idx}`} className="form-check-label">
                                    {opt.label || opt}
                                </label>
                            </div>
                        ))}

                    </div>
                );

            case "checkbox":
                return (
                    <div className="col-lg-6 col-12 mb-4 mt-1" key={fieldId} data-field-id={fieldId}>
                        <label htmlFor={field.id} className="form-label">
                            {field.label} {field.required && "*"}
                        </label>

                        {safeOptions.map((opt, idx) => (
                            <div key={idx} className="form-check">
                                <input
                                    type="checkbox"
                                    id={`${field.id}_${idx}`}
                                    name={field.id}
                                    value={opt.value || opt}
                                    checked={Array.isArray(value) && value.includes(opt.value || opt)}
                                    className="form-check-input"
                                    disabled
                                />
                                <label htmlFor={`${field.id}_${idx}`} className="form-check-label">
                                    {opt.label || opt}
                                </label>
                            </div>
                        ))}

                    </div>
                );

            case "phone":
                return (
                    <div className="col-lg-6 col-12 mb-4 mt-1" key={fieldId} data-field-id={fieldId}>
                        <label htmlFor={field.id} className="form-label">
                            {field.label} {field.required && "*"}
                        </label>
                        
                        <SelectPhoneNew
                            inputMobileData={formData[fieldId] || { country_code: "", phone_number: "" }}
                            onPhoneChange={(newData) => handleChange(fieldId, newData, field, parentPath)}
                        />
                    </div>
                );

            case "group":
                return (
                    <div className="row">
                        {/* {schema?.fields?.map((subField, idx) => (
                            <div key={idx} className="col-lg-6 col-12 mb-4 mt-1">
                                <label className="form-label">
                                    {subField.label} {subField.required && "*"}
                                </label>
                                {renderField(subField, key)}
                            </div>
                        ))} */}
                    </div>
                );

            case "repeater":
                const repPath = `${parentPath}.${field.id}`;
                const rows = formData[repPath] || [];

                return (
                    <div className="col-lg-12 col-12 mb-4 mt-1" key={fieldId} data-field-id={fieldId}>
                        <label htmlFor={field.id} className="form-label">
                            {field.label} {field.required && "*"}
                        </label>

                        {/* {(formData[key] || []).map((row, rowIndex) => (
                            <div key={rowIndex} className="row border p-2 mb-2">
                                {Object.entries(schema.fields)?.map((subField, idx) => (
                                    <div key={idx} className="col-lg-6 col-12 mb-3">
                                        <label className="form-label">
                                            {subField.label} {subField.required && "*"}
                                        </label>
                                        {renderField(subField, `${key}.${rowIndex}`)}
                                    </div>
                                ))}
                            </div>
                        ))} */}


                        {rows.map((_, index) => (
                            <div key={`${repPath}.${index}`} className="repeater border rounded p-4 mb-3 bg-light">
                                {(field.fields || []).map((sf) => renderField(sf, `${repPath}.${index}`))}

                                {/* 🔧 Improved remove button with reindexing */}
                                <button
                                    type="button"
                                    onClick={() => {
                                        const updatedRows = rows.filter((__, i) => i !== index);
                                        handleChange(repPath, updatedRows);

                                        // Clean + reindex formData
                                        setFormData((prev) => {
                                            const cleaned = { ...prev };
                                            Object.keys(cleaned).forEach((key) => {
                                                if (key.startsWith(`${repPath}.${index}`)) delete cleaned[key];
                                            });

                                            const shifted = {};
                                            Object.keys(cleaned).forEach((key) => {
                                                if (key.startsWith(`${repPath}.`)) {
                                                    const match = key.match(new RegExp(`^${repPath}\\.(\\d+)(.*)$`));
                                                    if (match) {
                                                        const rowNum = parseInt(match[1], 10);
                                                        if (rowNum > index) {
                                                            const newKey = `${repPath}.${rowNum - 1}${match[2]}`;
                                                            shifted[newKey] = cleaned[key];
                                                            delete cleaned[key];
                                                        }
                                                    }
                                                }
                                            });

                                            return { ...cleaned, ...shifted };
                                        });

                                        // Clean + reindex errors
                                        setErrors((prev) => {
                                            const next = { ...prev };
                                            Object.keys(next).forEach((key) => {
                                                if (key.startsWith(`${repPath}.${index}`)) delete next[key];
                                            });

                                            const shifted = {};
                                            Object.keys(next).forEach((key) => {
                                                if (key.startsWith(`${repPath}.`)) {
                                                    const match = key.match(new RegExp(`^${repPath}\\.(\\d+)(.*)$`));
                                                    if (match) {
                                                        const rowNum = parseInt(match[1], 10);
                                                        if (rowNum > index) {
                                                            const newKey = `${repPath}.${rowNum - 1}${match[2]}`;
                                                            shifted[newKey] = next[key];
                                                            delete next[key];
                                                        }
                                                    }
                                                }
                                            });

                                            return { ...next, ...shifted };
                                        });
                                    }}
                                    className="d-flex align-items-center mt-2 p-0 bg-transparent remove-btn"
                                >
                                    <Trash2 className="me-1" /> Remove
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => addRepeaterRow(repPath, field.fields, field.max)}
                            className="d-flex align-items-center mt-2 p-0 bg-transparent add-btn"
                        >
                            <PlusCircle className="me-2" /> Add {field.label}
                        </button>

                    </div>
                );

            default:
                return (
                    <div className="col-lg-6 col-12 mb-4 mt-1" key={fieldId} data-field-id={fieldId}>
                        <label htmlFor={field.id} className="form-label">
                            {field.label} {field.required && "*"}
                        </label>

                        <input
                            type="text"
                            id={field.id}
                            name={field.id}
                            value={value || ""}
                            className="form-control"
                            readOnly
                        />
                    </div>
                );
        }
    };

    return (
        <div>
            <form className="row">
                {/* {Object.entries(schema.fields)?.map(([key, section]) => {
                    console.log("key, field", key, section);

                    // if (!isShown(section, key)) return null;

                    return (
                        <> */}
                {/* <div className="col-lg-6 col-12 mb-4 mt-1">
                                <label htmlFor={field.id} className="form-label">
                                    {field.label} {field.required && "*"}
                                </label>
                            </div> */}
                {/* {(section?.fields || []).map((field) => renderField(field, key))}
                        </>
                    )
                })} */}

                {(schema?.fields?.[activeField]?.fields || []).map((field) => {
                    console.log("key, field", activeField, field);

                    return renderField(field, activeField);
                }
                )}
            </form>
        </div>
    );
};

export default ViewFormField;
