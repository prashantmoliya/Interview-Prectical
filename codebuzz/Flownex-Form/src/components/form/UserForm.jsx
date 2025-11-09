import React, { useState, useEffect } from 'react'
import "./Form.css"
import { useParams } from 'react-router-dom';
import { visaCatagory } from '../../constants/Data';
import jsPDF from 'jspdf';


import { useLocation, useNavigate } from 'react-router-dom';
import { FaUserCog } from 'react-icons/fa';
import AdminLogo from "../../assets/images/admin-logo.png";
import { loaders } from '../loader/Loader';
import { Axios } from '../../redux-Toolkit/helper/Axios';
import { toast } from 'react-toastify';

const initialOtpState = ["", "", "", "", "", ""];


const initialState = {
    // Personal Information
    uci_number: "",
    service_language: "",
    family_name: "",
    given_names: "",
    nicknames: "",
    date_of_birth: "",
    place_of_birth: "",
    country_of_birth: "",
    citizenship: "",
    current_country: "",
    marital_status: "",
    spouse_name: "",
    spouse_dob: "",

    // Identity Documents
    passport_number: "",
    passport_issue_date: "",
    passport_expiry_date: "",
    passport_country: "",
    national_id: "",
    passport_copy: null,
    passport_photos: null,

    // Contact Information
    mailing_address: "",
    mailing_city: "",
    mailing_province: "",
    mailing_postal: "",
    mailing_country: "",
    phone_number: "",
    email: "",
    emergency_contact_name: "",
    emergency_contact_phone: "",

    // Study Details
    institution_name: "",
    dli_number: "",
    program_name: "",
    program_level: "",
    field_of_study: "",
    study_start_date: "",
    study_end_date: "",
    study_cost: "",
    letter_of_acceptance: "",
    pal_tal: "",
    studying_quebec: "",
    caq: "",

    // Financial Information
    funds_available: "",
    funding_source: "",
    financial_details: "",
    financial_proof: [],

    // Educational Background
    highest_education: "",
    prev_institution: "",
    prev_field_study: "",
    prev_from_date: "",
    prev_to_date: "",

    // Employment History
    current_occupation: "",
    company_name: "",
    job_title: "",
    employment_from: "",
    employment_to: "",

    // Family Information
    mother_name: "",
    mother_dob: "",
    mother_country: "",
    father_name: "",
    father_dob: "",
    father_country: "",
    has_children: "",
    children: [],

    // Background Questions
    prev_application: "",
    visa_refusal: "",
    criminal_history: "",
    military_service: "",

    // Document Uploads
    proof_payment: null,
    medical_exam: [],
    additional_docs: [],

    // Review and Submit
    declaration: false,
    electronic_signature: ""
}

const requiredFields = [
    // Personal Information
    "service_language", "family_name", "given_names",
    "date_of_birth", "place_of_birth", "country_of_birth",
    "citizenship", "current_country", "marital_status",

    // Identity Documents
    "passport_number", "passport_issue_date", "passport_expiry_date",
    "passport_country",

    // Contact Information
    "mailing_address", "mailing_city", "mailing_province", "mailing_postal", "mailing_country", "phone_number", "email",

    // Study Details
    "institution_name", "dli_number", "program_name", "program_level", "field_of_study", "study_start_date", "study_end_date", "study_cost",

    // Financial Information
    "funds_available", "funding_source",

    // Educational Background
    "highest_education", "prev_institution", "prev_field_study", "prev_from_date", "prev_to_date",

    // Family Information
    "mother_name", "mother_dob", "mother_country", "father_name", "father_dob", "father_country", "has_children",

    // Background Questions
    "prev_application", "visa_refusal", "criminal_history", "military_service",

    // Document Uploads

    // Review and Submit
    "declaration", "electronic_signature"
];

const UserForm = () => {

    const { category, userUniqueId, formUniqueId } = useParams();

    const location = useLocation();

    const formShowLocal = localStorage.getItem("form-show");
    const [formShow, setFormShow] = useState(formShowLocal || false);


    const [loader, setLoader] = useState(false);
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [otpError, setOtpError] = useState("");

    const handleOTPChange = (e, index) => {
        const value = e.target.value.replace(/\D/g, ''); // Only digits
        if (value.length === 1) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Focus next input
            const nextInput = document.getElementById(`otp-input-${index + 1}`);
            if (nextInput) nextInput.focus();
        } else {
            // Clear the current box if not a valid single digit
            const newOtp = [...otp];
            newOtp[index] = "";
            setOtp(newOtp);
        }

        setOtpError("");
    }

    const handleBackspace = (e, index) => {
        // if (e.key === "Backspace" && otp[index] === "" && index > 0) {
        //     document.getElementById(`otp-input-${index - 1}`).focus();
        // }

        if (e.key === "Backspace") {
            const newOtp = [...otp];

            if (otp[index] === "") {
                // Go to previous input
                if (index > 0) {
                    const prevInput = document.getElementById(`otp-input-${index - 1}`);
                    if (prevInput) prevInput.focus();
                }
            } else {
                // Clear current input
                newOtp[index] = "";
                setOtp(newOtp);
            }
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData("text").trim();

        if (/^\d{6}$/.test(pasteData)) {
            // only accept exactly 6 digits
            setOtp(pasteData.split(""));
            // focus last input
            const lastInput = document.getElementById(`otp-input-5`);
            if (lastInput) lastInput.focus();
        }
    };


    const handleOTPSubmit = async (e) => {
        e.preventDefault();

        const enteredOtp = otp?.join('');
        if (enteredOtp.length === 6) {

            setLoader(true);

            try {
                const payload = {
                    type: "Form",
                    userUniqueId: userUniqueId,
                    formUniqueId: formUniqueId,
                    otp: enteredOtp,
                }
                const res = await Axios.post("/company-api/user/otpVerification", payload, {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    }
                });

                if (res?.data?.status) {
                    const formRes = res?.data;

                    toast.success(res.data?.message);
                    setOtp(initialOtpState);

                    localStorage.setItem("user-form-token", formRes?.accessToken);
                    localStorage.setItem("form-show", true);
                    setFormShow(true);
                    // navigate(`/forms/${formRes.category}/${formRes.userUniqueId}/${formRes.formUniqueId}`);
                } else {
                    toast.error(res.data?.message);
                }
            } catch (err) {
                throw err
            }
            finally {
                setLoader(false);

            }
        }
        else {
            setOtpError("Please enter 6 digits");
        }
    }





    const [formData, setFormData] = useState(initialState);

    const [errors, setErrors] = useState({});
    const [accordionOpen, setAccordionOpen] = useState([]);
    const [referenceNumber, setReferenceNumber] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isAutoSaved, setIsAutoSaved] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [progress, setProgress] = useState(0);

    const selectedCategory = visaCatagory?.find(i => i.route === category);



    const toggleAccordion = (sectionId) => {
        setAccordionOpen(prev =>
            prev.includes(sectionId)
                ? prev?.filter(id => id !== sectionId)
                : [...prev, sectionId]
        );

        updateProgress();
    };

    const updateProgress = () => {
        const filledFields = requiredFields?.filter(field => {
            const value = formData[field];
            return value !== "" && value !== null && value !== false;
        });

        const percentComplete = Math.floor((filledFields.length / requiredFields.length) * 100);
        setProgress(percentComplete);
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));

        setTimeout(() => {
            setIsAutoSaved(true);
        }, 1000);
    };

    const handleFileChange = async (e) => {
        // const { name, files } = e.target;
        // const isMultiple = e.target.multiple;
        // setFormData((prevData) => ({
        //     ...prevData,
        //     [name]: isMultiple ? Array.from(files) : files[0]
        // }));

        const { name, files } = e.target;
        const fileArray = Array.from(files);

        const filePromises = fileArray.map(file => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => {
                    resolve({
                        name: file.name,
                        type: file.type,
                        size: file.size,
                        base64: reader.result, // This is the Base64 string
                    });
                };
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        });

        const base64Files = await Promise.all(filePromises);

        setFormData(prev => ({
            ...prev,
            [name]: e.target.multiple ? [...(prev[name] || []), ...base64Files] : base64Files[0],
        }));


        setTimeout(() => {
            setIsAutoSaved(true);
        }, 1000);
    };

    const removeFile = (fieldName, index = null) => {
        // setFormData(prev => {
        //     if (index === null) {
        //         return { ...prev, [field]: null };
        //     }
        //     const updated = [...prev[field]];
        //     updated.splice(index, 1);
        //     return { ...prev, [field]: updated };
        // });

        setFormData(prev => {
            const updated = { ...prev };
            if (Array.isArray(prev[fieldName]) && index !== null) {
                updated[fieldName] = prev[fieldName]?.filter((_, i) => i !== index);
            } else {
                updated[fieldName] = null;
            }
            return updated;
        });

        setTimeout(() => {
            setIsAutoSaved(true);
        }, 1000);
    };


    const addChild = () => {
        setFormData(prev => ({
            ...prev,
            children: [
                ...prev.children,
                { name: "", dob: "", country: "", accompanying: "no" }
            ]
        }));

        setTimeout(() => {
            setIsAutoSaved(true);
        }, 1000);
    };

    const removeChild = (index) => {
        setFormData(prev => ({
            ...prev,
            children: prev.children?.filter((_, i) => i !== index)
        }));

        setTimeout(() => {
            setIsAutoSaved(true);
        }, 1000);
    };

    const handleChildChange = (index, field, value) => {
        const updatedChildren = [...formData.children];
        updatedChildren[index][field] = value;
        setFormData(prev => ({
            ...prev,
            children: updatedChildren
        }));

        setTimeout(() => {
            setIsAutoSaved(true);
        }, 1000);
    };

    // Form validation
    const validateForm = () => {
        const newErrors = {};
        const sectionsWithErrors = new Set();

        // Required fields validation
        const requiredFieldsValidation = [
            'service_language',
            'family_name',
            'given_names',
            'date_of_birth',
            'place_of_birth',
            'country_of_birth',
            'citizenship',
            'current_country',
            'marital_status',
            'passport_number',
            'passport_issue_date',
            'passport_expiry_date',
            'passport_country',
            'mailing_address',
            'mailing_city',
            'mailing_province',
            'mailing_postal',
            'mailing_country',
            'phone_number',
            'email',
            'institution_name',
            'dli_number',
            'program_name',
            'program_level',
            'field_of_study',
            'study_start_date',
            'study_end_date',
            'study_cost',
            'funds_available',
            'funding_source',
            'highest_education',
            'prev_institution',
            'prev_field_study',
            'prev_from_date',
            'prev_to_date',
            'mother_name',
            'mother_dob',
            'mother_country',
            'father_name',
            'father_dob',
            'father_country',
            'prev_application',
            'visa_refusal',
            'criminal_history',
            'military_service'
        ]
        const fieldSectionMap = {
            service_language: 'personal-info',
            family_name: 'personal-info',
            given_names: 'personal-info',
            date_of_birth: 'personal-info',
            place_of_birth: 'personal-info',
            country_of_birth: 'personal-info',
            citizenship: 'personal-info',
            current_country: 'personal-info',
            marital_status: 'personal-info',
            passport_number: 'identity-docs',
            passport_issue_date: 'identity-docs',
            passport_expiry_date: 'identity-docs',
            passport_country: 'identity-docs',
            mailing_address: 'contact-info',
            mailing_city: 'contact-info',
            mailing_province: 'contact-info',
            mailing_postal: 'contact-info',
            mailing_country: 'contact-info',
            phone_number: 'contact-info',
            email: 'contact-info',
            institution_name: 'study-details',
            dli_number: 'study-details',
            program_name: 'study-details',
            program_level: 'study-details',
            field_of_study: 'study-details',
            study_start_date: 'study-details',
            study_end_date: 'study-details',
            study_cost: 'study-details',
            funds_available: 'financial-info',
            funding_source: 'financial-info',
            highest_education: 'education-background',
            prev_institution: 'education-background',
            prev_field_study: 'education-background',
            prev_from_date: 'education-background',
            prev_to_date: 'education-background',
            mother_name: 'family-info',
            mother_dob: 'family-info',
            mother_country: 'family-info',
            father_name: 'family-info',
            father_dob: 'family-info',
            father_country: 'family-info',
            prev_application: 'background-questions',
            visa_refusal: 'background-questions',
            criminal_history: 'background-questions',
            military_service: 'background-questions',
            criminal_history: 'review-submit',
            military_service: 'review-submit'
        };

        // if (!formData.service_language
        //     || !formData.family_name
        //     || !formData.given_names
        //     || !formData.date_of_birth
        //     || !formData.place_of_birth
        //     || !formData.country_of_birth
        //     || !formData.citizenship
        //     || !formData.current_country
        //     || !formData.passport_number
        //     || !formData.passport_issue_date
        //     || !formData.passport_expiry_date
        //     || !formData.passport_country
        //     || !formData.mailing_address
        //     || !formData.mailing_city
        //     || !formData.mailing_province
        //     || !formData.mailing_postal
        //     || !formData.mailing_country
        //     || !formData.phone_number
        //     || !formData.email
        //     || !formData.institution_name
        //     || !formData.dli_number
        //     || !formData.program_name
        //     || !formData.program_level
        //     || !formData.field_of_study
        //     || !formData.study_start_date
        //     || !formData.study_end_date
        //     || !formData.study_cost
        //     || !formData.funds_available
        //     || !formData.funding_source
        //     || !formData.highest_education
        //     || !formData.prev_institution
        //     || !formData.prev_field_study
        //     || !formData.prev_from_date
        //     || !formData.prev_to_date
        //     || !formData.mother_name
        //     || !formData.mother_dob
        //     || !formData.mother_country
        //     || !formData.father_name
        //     || !formData.father_dob
        //     || !formData.father_country
        //     || !formData.prev_application
        //     || !formData.visa_refusal
        //     || !formData.criminal_history
        //     || !formData.military_service
        // ) {
        //     newErrors.required = "This field is required.";
        // }
        requiredFieldsValidation.forEach((field) => {
            if (!formData[field]) {
                newErrors[field] = "This field is required.";

                if (fieldSectionMap[field]) {
                    sectionsWithErrors.add(fieldSectionMap[field]);
                }
            }
        });

        // Email validation
        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address.";
            sectionsWithErrors.add('contact-info');
        }

        // Date validation
        if (formData.passport_expiry_date && formData.passport_issue_date) {
            const issueDate = new Date(formData.passport_issue_date);
            const expiryDate = new Date(formData.passport_expiry_date);
            if (expiryDate <= issueDate) {
                newErrors.passport_expiry_date = "Expiry date must be after issue date.";
                sectionsWithErrors.add('identity-docs');
            }
        }

        // Electronic signature validation
        if (!formData.declaration) {
            sectionsWithErrors.add('review-submit');
        }
        if (!formData.electronic_signature) {
            newErrors.electronic_signature = "Electronic signature is required.";
            sectionsWithErrors.add('review-submit');
        }

        if (formData.has_children === 'yes' && Array.isArray(formData.children)) {
            formData.children.forEach((child, index) => {
                if (!child.name) {
                    newErrors[`child_name_${index}`] = "This field is required.";
                    sectionsWithErrors.add('family-info');
                }
                if (!child.dob) {
                    newErrors[`child_dob_${index}`] = "This field is required.";
                    sectionsWithErrors.add('family-info');
                }
                if (!child.country) {
                    newErrors[`child_country_${index}`] = "This field is required.";
                    sectionsWithErrors.add('family-info');
                }
            });
        }

        setErrors(newErrors);
        setAccordionOpen([...sectionsWithErrors]);
        return Object.keys(newErrors).length === 0;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            alert('Please complete all required fields before submitting.');
            return;
        }

        if (!formData.declaration) {
            alert('Please check the declaration checkbox to proceed.');
            return;
        }

        setIsSubmitting(true);

        try {
            // Simulate form submission and generate a reference number
            const ref = "CAN-" + Math.floor(Math.random() * 1000000);
            setReferenceNumber(ref);
            setIsModalVisible(true);

            setAccordionOpen([...accordionOpen, "review-submit"])

            // ------- PDF GENERATION -------
            // const doc = new jsPDF();

            // doc.setFontSize(18);
            // doc.text("Form Submission Details", 14, 20);

            // doc.setFontSize(12);
            // doc.text(`Reference Number: ${ref}`, 14, 30);

            // let yPos = 40;
            // Object.entries(formData).forEach(([key, value]) => {
            //     if (Array.isArray(value)) {
            //         doc.text(`${key}: ${value.join(", ")}`, 14, yPos);
            //     } else {
            //         doc.text(`${key}: ${value}`, 14, yPos);
            //     }
            //     yPos += 10;
            // });

            // // Save PDF
            // doc.save(`Form_Submission_${ref}.pdf`);
            // // ------------------------------


            // // Create PDF
            // const doc = new jsPDF();
            // let y = 10;

            // // Header
            // doc.setFontSize(16);
            // doc.text(`Visa Application - ${ref}`, 10, y);
            // y += 8;
            // doc.setFontSize(12);
            // doc.text(`Date: ${new Date().toLocaleDateString()}`, 10, y);
            // y += 10;

            // // Section builder helper
            // const addSection = (title, fields) => {
            //     doc.setFontSize(14);
            //     doc.text(title, 10, y);
            //     y += 6;
            //     doc.setFontSize(11);
            //     fields.forEach(([label, key]) => {
            //         let value = formData[key];
            //         if (Array.isArray(value)) value = value.join(", ");
            //         if (value === null || value === "" || value === false) value = "N.A";
            //         doc.text(`${label}: ${value}`, 12, y);
            //         y += 5;
            //     });
            //     y += 4;
            // };

            // // Sections based on initialState
            // addSection("Personal Information", [
            //     ["UCI Number", "uci_number"],
            //     ["Service Language", "service_language"],
            //     ["Family Name", "family_name"],
            //     ["Given Names", "given_names"],
            //     ["Nicknames", "nicknames"],
            //     ["Date of Birth", "date_of_birth"],
            //     ["Place of Birth", "place_of_birth"],
            //     ["Country of Birth", "country_of_birth"],
            //     ["Citizenship", "citizenship"],
            //     ["Current Country", "current_country"],
            //     ["Marital Status", "marital_status"],
            //     ["Spouse Name", "spouse_name"],
            //     ["Spouse DOB", "spouse_dob"]
            // ]);

            // addSection("Identity Documents", [
            //     ["Passport Number", "passport_number"],
            //     ["Issue Date", "passport_issue_date"],
            //     ["Expiry Date", "passport_expiry_date"],
            //     ["Issuing Country", "passport_country"],
            //     ["National ID", "national_id"]
            // ]);

            // addSection("Contact Information", [
            //     ["Mailing Address", "mailing_address"],
            //     ["City", "mailing_city"],
            //     ["Province", "mailing_province"],
            //     ["Postal Code", "mailing_postal"],
            //     ["Country", "mailing_country"],
            //     ["Phone Number", "phone_number"],
            //     ["Email", "email"],
            //     ["Emergency Contact Name", "emergency_contact_name"],
            //     ["Emergency Contact Phone", "emergency_contact_phone"]
            // ]);

            // addSection("Study Details", [
            //     ["Institution Name", "institution_name"],
            //     ["DLI Number", "dli_number"],
            //     ["Program Name", "program_name"],
            //     ["Program Level", "program_level"],
            //     ["Field of Study", "field_of_study"],
            //     ["Start Date", "study_start_date"],
            //     ["End Date", "study_end_date"],
            //     ["Cost", "study_cost"]
            // ]);

            // addSection("Financial Information", [
            //     ["Funds Available", "funds_available"],
            //     ["Funding Source", "funding_source"],
            //     ["Details", "financial_details"]
            // ]);

            // addSection("Educational Background", [
            //     ["Highest Education", "highest_education"],
            //     ["Previous Institution", "prev_institution"],
            //     ["Previous Field of Study", "prev_field_study"],
            //     ["From Date", "prev_from_date"],
            //     ["To Date", "prev_to_date"]
            // ]);

            // addSection("Employment History", [
            //     ["Current Occupation", "current_occupation"],
            //     ["Company Name", "company_name"],
            //     ["Job Title", "job_title"],
            //     ["From", "employment_from"],
            //     ["To", "employment_to"]
            // ]);

            // addSection("Family Information", [
            //     ["Mother Name", "mother_name"],
            //     ["Mother DOB", "mother_dob"],
            //     ["Mother Country", "mother_country"],
            //     ["Father Name", "father_name"],
            //     ["Father DOB", "father_dob"],
            //     ["Father Country", "father_country"],
            //     ["Has Children", "has_children"]
            // ]);

            // addSection("Background Questions", [
            //     ["Previous Application", "prev_application"],
            //     ["Visa Refusal", "visa_refusal"],
            //     ["Criminal History", "criminal_history"],
            //     ["Military Service", "military_service"]
            // ]);

            // addSection("Declaration", [
            //     ["Electronic Signature", "electronic_signature"]
            // ]);

            // // Save PDF
            // doc.save(`Visa_Application_${ref}.pdf`);


            const doc = new jsPDF();
            const pageHeight = doc.internal.pageSize.height;
            const marginTop = 10;
            let y = marginTop;

            // Helper: Page break if needed
            const checkPageBreak = (lines = 1) => {
                if (y + lines * 6 > pageHeight - 10) {
                    doc.addPage();
                    y = marginTop;
                }
            };

            // Helper: Each section starts on a new page
            const addSection = (title, fields, isFirstSection = false) => {
                if (!isFirstSection) {
                    doc.addPage();
                    y = marginTop;
                }
                doc.setFontSize(14);
                doc.text(title, 10, y);
                y += 8;

                doc.setFontSize(11);
                fields.forEach(([label, key]) => {
                    checkPageBreak(1);
                    let value = formData[key];
                    if (Array.isArray(value)) value = value.join(", ");
                    if (value === null || value === "" || value === false) value = "N.A";
                    doc.text(`${label}: ${value}`, 12, y);
                    y += 5;
                });
            };

            // First page header
            doc.setFontSize(16);
            doc.text(`Visa Application - ${ref}`, 10, y);
            y += 8;
            doc.setFontSize(12);
            doc.text(`Date: ${new Date().toLocaleDateString()}`, 10, y);
            y += 10;

            // Sections - first one on same page as header, others on new pages
            addSection("Personal Information", [
                ["UCI Number", "uci_number"],
                ["Service Language", "service_language"],
                ["Family Name", "family_name"],
                ["Given Names", "given_names"],
                ["Nicknames", "nicknames"],
                ["Date of Birth", "date_of_birth"],
                ["Place of Birth", "place_of_birth"],
                ["Country of Birth", "country_of_birth"],
                ["Citizenship", "citizenship"],
                ["Current Country", "current_country"],
                ["Marital Status", "marital_status"],
                ["Spouse Name", "spouse_name"],
                ["Spouse DOB", "spouse_dob"]
            ], true);

            addSection("Identity Documents", [
                ["Passport Number", "passport_number"],
                ["Issue Date", "passport_issue_date"],
                ["Expiry Date", "passport_expiry_date"],
                ["Issuing Country", "passport_country"],
                ["National ID", "national_id"]
            ]);

            addSection("Contact Information", [
                ["Mailing Address", "mailing_address"],
                ["City", "mailing_city"],
                ["Province", "mailing_province"],
                ["Postal Code", "mailing_postal"],
                ["Country", "mailing_country"],
                ["Phone Number", "phone_number"],
                ["Email", "email"],
                ["Emergency Contact Name", "emergency_contact_name"],
                ["Emergency Contact Phone", "emergency_contact_phone"]
            ]);

            addSection("Study Details", [
                ["Institution Name", "institution_name"],
                ["DLI Number", "dli_number"],
                ["Program Name", "program_name"],
                ["Program Level", "program_level"],
                ["Field of Study", "field_of_study"],
                ["Start Date", "study_start_date"],
                ["End Date", "study_end_date"],
                ["Cost", "study_cost"]
            ]);

            addSection("Financial Information", [
                ["Funds Available", "funds_available"],
                ["Funding Source", "funding_source"],
                ["Details", "financial_details"]
            ]);

            addSection("Educational Background", [
                ["Highest Education", "highest_education"],
                ["Previous Institution", "prev_institution"],
                ["Previous Field of Study", "prev_field_study"],
                ["From Date", "prev_from_date"],
                ["To Date", "prev_to_date"]
            ]);

            addSection("Employment History", [
                ["Current Occupation", "current_occupation"],
                ["Company Name", "company_name"],
                ["Job Title", "job_title"],
                ["From", "employment_from"],
                ["To", "employment_to"]
            ]);

            addSection("Family Information", [
                ["Mother Name", "mother_name"],
                ["Mother DOB", "mother_dob"],
                ["Mother Country", "mother_country"],
                ["Father Name", "father_name"],
                ["Father DOB", "father_dob"],
                ["Father Country", "father_country"],
                ["Has Children", "has_children"]
            ]);

            addSection("Background Questions", [
                ["Previous Application", "prev_application"],
                ["Visa Refusal", "visa_refusal"],
                ["Criminal History", "criminal_history"],
                ["Military Service", "military_service"]
            ]);

            // addSection("Declaration", [
            //     ["Electronic Signature", "electronic_signature"]
            // ]);
            const pdfBlob = doc.output("blob");
            const formData1 = new FormData();
            formData1.append("file", pdfBlob, `Visa_Application_${ref}.pdf`);

            // doc.save(`Visa_Application_${ref}.pdf`);



        } catch (error) {
            throw error
            alert('Error submitting form. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    // Auto-save functionality
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (isAutoSaved) {
                localStorage.setItem('clientFormData', JSON.stringify(formData));
                setIsAutoSaved(false);
            }
        }, 2000);

        return () => clearTimeout(timeoutId);
    }, [formData, isAutoSaved]);

    // Load saved data on component mount
    useEffect(() => {
        const savedData = localStorage.getItem('clientFormData');
        if (savedData) {
            try {
                const parsedData = JSON.parse(savedData);
                setFormData(prev => ({ ...prev, ...parsedData }));
            } catch (error) {
                throw error
            }
        }
    }, []);


    useEffect(() => {
        updateProgress();
    }, [formData]);


    return (

        <>

            {
                formShow ?
                    (
                        <div className='form_container'>
                            <div className="container">
                                <header className="app-header">
                                    <h1>{selectedCategory.category} Application</h1>
                                    <p>Application For {selectedCategory.category} </p>
                                    <div className="progress-bar">
                                        <div className="progress-fill" id="progressFill" style={{ width: `${progress}%` }}></div>
                                    </div>
                                    <p className="progress-text">Progress: <span id="progressText">{progress}%</span></p>
                                </header>

                                <main className="app-main pb-4">
                                    <div className="accordion" id="applicationAccordion">

                                        {/* <!-- Section 1: Personal Information --> */}
                                        <div className="accordion-item">
                                            <div className={`accordion-header ${accordionOpen.includes("personal-info") ? "active" : ""}`} data-target="personal-info" onClick={() => toggleAccordion('personal-info')}>
                                                <h3>1. Personal Information</h3>
                                                <span className="accordion-icon">{accordionOpen.includes("personal-info") ? "▲" : "▼"}</span>
                                            </div>
                                            <div className={`accordion-content ${accordionOpen.includes("personal-info") ? "active" : ""}`} id="personal-info">
                                                <div className="form-group">
                                                    <label className="form-label">UCI Number (optional)</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="uci_number"
                                                        value={formData.uci_number}
                                                        onChange={handleChange}
                                                        placeholder="Enter UCI number if available"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Service Language *</label>
                                                    <select
                                                        className={`form-control ${errors.service_language ? 'error' : ''}`}
                                                        name="service_language"
                                                        value={formData.service_language}
                                                        onChange={handleChange}
                                                        required
                                                    >
                                                        <option value="">Select language</option>
                                                        <option value="english">English</option>
                                                        <option value="french">French</option>
                                                    </select>
                                                    <div className={`error-message ${errors.service_language ? 'visible' : ''}`}>{errors.service_language}</div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Family Name *</label>
                                                    <input
                                                        type="text"
                                                        className={`form-control ${errors.family_name ? 'error' : ''}`}
                                                        name="family_name"
                                                        value={formData.family_name}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    <div className={`error-message ${errors.family_name ? 'visible' : ''}`}>{errors.family_name}</div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Given Names *</label>
                                                    <input
                                                        type="text"
                                                        className={`form-control ${errors.given_names ? 'error' : ''}`}
                                                        name="given_names"
                                                        value={formData.given_names}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    <div className={`error-message ${errors.given_names ? 'visible' : ''}`}>{errors.given_names}</div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Nicknames/Aliases</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="nicknames"
                                                        value={formData.nicknames}
                                                        onChange={handleChange}
                                                        placeholder="Enter any nicknames or aliases"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Date of Birth *</label>
                                                    <input
                                                        type="date"
                                                        className={`form-control ${errors.date_of_birth ? 'error' : ''}`}
                                                        name="date_of_birth"
                                                        value={formData.date_of_birth}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    <div className={`error-message ${errors.date_of_birth ? 'visible' : ''}`}>{errors.date_of_birth}</div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Place of Birth *</label>
                                                    <input
                                                        type="text"
                                                        className={`form-control ${errors.place_of_birth ? 'error' : ''}`}
                                                        name="place_of_birth"
                                                        value={formData.place_of_birth}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    <div className={`error-message ${errors.place_of_birth ? 'visible' : ''}`}>{errors.place_of_birth}</div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Country of Birth *</label>
                                                    <input
                                                        type="text"
                                                        className={`form-control ${errors.country_of_birth ? 'error' : ''}`}
                                                        name="country_of_birth"
                                                        value={formData.country_of_birth}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    <div className={`error-message ${errors.country_of_birth ? 'visible' : ''}`}>{errors.country_of_birth}</div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Citizenship/Nationality *</label>
                                                    <input
                                                        type="text"
                                                        className={`form-control ${errors.citizenship ? 'error' : ''}`}
                                                        name="citizenship"
                                                        value={formData.citizenship}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    <div className={`error-message ${errors.citizenship ? 'visible' : ''}`}>{errors.citizenship}</div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Current Country of Residence *</label>
                                                    <input
                                                        type="text"
                                                        className={`form-control ${errors.current_country ? 'error' : ''}`}
                                                        name="current_country"
                                                        value={formData.current_country}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    <div className={`error-message ${errors.current_country ? 'visible' : ''}`}>{errors.current_country}</div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Marital Status *</label>
                                                    <select
                                                        className={`form-control ${errors.marital_status ? 'error' : ''}`}
                                                        name="marital_status"
                                                        value={formData.marital_status}
                                                        onChange={handleChange}
                                                        required
                                                    >
                                                        <option value="">Select marital status</option>
                                                        <option value="single">Single</option>
                                                        <option value="married">Married</option>
                                                        <option value="divorced">Divorced</option>
                                                        <option value="widowed">Widowed</option>
                                                        <option value="separated">Separated</option>
                                                    </select>
                                                    <div className={`error-message ${errors.marital_status ? 'visible' : ''}`}>{errors.marital_status}</div>
                                                </div>
                                                {formData.marital_status === 'married' && (
                                                    <div className="conditional-section" id="spouse-details">
                                                        <h4>Spouse Details</h4>
                                                        <div className="form-group">
                                                            <label className="form-label">Spouse Full Name</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="spouse_name"
                                                                value={formData.spouse_name}
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="form-label">Spouse Date of Birth</label>
                                                            <input
                                                                type="date"
                                                                className="form-control"
                                                                name="spouse_dob"
                                                                value={formData.spouse_dob}
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* <!-- Section 2: Identity Documents --> */}
                                        <div className="accordion-item">
                                            <div className={`accordion-header ${accordionOpen.includes("identity-docs") ? "active" : ""}`} data-target="identity-docs" onClick={() => toggleAccordion('identity-docs')}>
                                                <h3>2. Identity Documents</h3>
                                                <span className="accordion-icon">{accordionOpen.includes("identity-docs") ? "▲" : "▼"}</span>
                                            </div>
                                            <div className={`accordion-content ${accordionOpen.includes("identity-docs") ? "active" : ""}`} id="identity-docs">
                                                <div className="form-group">
                                                    <label className="form-label">Passport Number *</label>
                                                    <input
                                                        type="text"
                                                        className={`form-control ${errors.passport_number ? 'error' : ''}`}
                                                        name="passport_number"
                                                        value={formData.passport_number}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    <div className={`error-message ${errors.passport_number ? 'visible' : ''}`}>{errors.passport_number}</div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Passport Issue Date *</label>
                                                    <input
                                                        type="date"
                                                        className={`form-control ${errors.passport_issue_date ? 'error' : ''}`}
                                                        name="passport_issue_date"
                                                        value={formData.passport_issue_date}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    <div className={`error-message ${errors.passport_issue_date ? 'visible' : ''}`}>{errors.passport_issue_date}</div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Passport Expiry Date *</label>
                                                    <input
                                                        type="date"
                                                        className={`form-control ${errors.passport_expiry_date ? 'error' : ''}`}
                                                        name="passport_expiry_date"
                                                        value={formData.passport_expiry_date}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    <div className={`error-message ${errors.passport_expiry_date ? 'visible' : ''}`}>{errors.passport_expiry_date}</div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Passport Issuing Country *</label>
                                                    <input
                                                        type="text"
                                                        className={`form-control ${errors.passport_country ? 'error' : ''}`}
                                                        name="passport_country"
                                                        value={formData.passport_country}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    <div className={`error-message ${errors.passport_country ? 'visible' : ''}`}>{errors.passport_country}</div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">National Identity Document Number</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="national_id"
                                                        value={formData.national_id}
                                                        onChange={handleChange}
                                                        placeholder="If applicable"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Passport Copy Upload *</label>
                                                    <div className="file-upload-area" data-upload="passport_copy">
                                                        <p>Drag and drop passport copy here or click to browse</p>
                                                        <input
                                                            type="file"
                                                            className="file-input"
                                                            name="passport_copy"
                                                            accept=".pdf,.jpg,.jpeg,.png"
                                                            onChange={handleFileChange}
                                                        />

                                                        {
                                                            formData.passport_copy && (
                                                                <div className="file-list">
                                                                    <div className="file-item">
                                                                        <span className="file-name">{formData.passport_copy.name}</span>
                                                                        <button type="button" className="file-remove" onClick={() => removeFile('passport_copy')}>Remove</button>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }

                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Passport Photos Upload *</label>
                                                    <div className="file-upload-area" data-upload="passport_photos">
                                                        <p>Drag and drop passport photos here or click to browse</p>
                                                        <input
                                                            type="file"
                                                            className="file-input"
                                                            name="passport_photos"
                                                            accept=".jpg,.jpeg,.png"
                                                            multiple
                                                            onChange={handleFileChange}
                                                        />

                                                        {formData.passport_photos && formData.passport_photos.length > 0 && (
                                                            <div className="file-list">
                                                                {formData.passport_photos.map((file, index) => (
                                                                    <div key={index} className="file-item">
                                                                        <span className="file-name">{file.name}</span>
                                                                        <button type="button" className="file-remove" onClick={() => removeFile('passport_photos', index)}>Remove</button>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* <!-- Section 3: Contact Information --> */}
                                        <div className="accordion-item">
                                            <div className={`accordion-header ${accordionOpen.includes("contact-info") ? "active" : ""}`} data-target="contact-info" onClick={() => toggleAccordion('contact-info')}>
                                                <h3>3. Contact Information</h3>
                                                <span className="accordion-icon">{accordionOpen.includes("contact-info") ? "▲" : "▼"}</span>
                                            </div>
                                            <div className={`accordion-content ${accordionOpen.includes("contact-info") ? "active" : ""}`} id="contact-info">
                                                <h4>Current Mailing Address</h4>
                                                <div className="form-group">
                                                    <label className="form-label">Street Address *</label>
                                                    <input
                                                        type="text"
                                                        className={`form-control ${errors.mailing_address ? 'error' : ''}`}
                                                        name="mailing_address"
                                                        value={formData.mailing_address}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    <div className={`error-message ${errors.mailing_address ? 'visible' : ''}`}>{errors.mailing_address}</div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">City *</label>
                                                    <input
                                                        type="text"
                                                        className={`form-control ${errors.mailing_city ? 'error' : ''}`}
                                                        name="mailing_city"
                                                        value={formData.mailing_city}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    <div className={`error-message ${errors.mailing_city ? 'visible' : ''}`}>{errors.mailing_city}</div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Province/State *</label>
                                                    <input
                                                        type="text"
                                                        className={`form-control ${errors.mailing_province ? 'error' : ''}`}
                                                        name="mailing_province"
                                                        value={formData.mailing_province}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    <div className={`error-message ${errors.mailing_province ? 'visible' : ''}`}>{errors.mailing_province}</div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Postal/Zip Code *</label>
                                                    <input
                                                        type="text"
                                                        className={`form-control ${errors.mailing_postal ? 'error' : ''}`}
                                                        name="mailing_postal"
                                                        value={formData.mailing_postal}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    <div className={`error-message ${errors.mailing_postal ? 'visible' : ''}`}>{errors.mailing_postal}</div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Country *</label>
                                                    <input
                                                        type="text"
                                                        className={`form-control ${errors.mailing_country ? 'error' : ''}`}
                                                        name="mailing_country"
                                                        value={formData.mailing_country}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    <div className={`error-message ${errors.mailing_country ? 'visible' : ''}`}>{errors.mailing_country}</div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Phone Number *</label>
                                                    <input
                                                        type="tel"
                                                        className={`form-control ${errors.phone_number ? 'error' : ''}`}
                                                        name="phone_number"
                                                        value={formData.phone_number}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    <div className={`error-message ${errors.phone_number ? 'visible' : ''}`}>{errors.phone_number}</div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Email Address *</label>
                                                    <input
                                                        type="email"
                                                        className={`form-control ${errors.email ? 'error' : ''}`}
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    <div className={`error-message ${errors.email ? 'visible' : ''}`}>{errors.email}</div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Emergency Contact Name</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="emergency_contact_name"
                                                        value={formData.emergency_contact_name}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Emergency Contact Phone</label>
                                                    <input
                                                        type="tel"
                                                        className="form-control"
                                                        name="emergency_contact_phone"
                                                        value={formData.emergency_contact_phone}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* <!-- Section 4: Study Details --> */}
                                        <div className="accordion-item">
                                            <div className={`accordion-header ${accordionOpen.includes("study-details") ? "active" : ""}`} data-target="study-details" onClick={() => toggleAccordion('study-details')}>
                                                <h3>4. Study Details</h3>
                                                <span className="accordion-icon">{accordionOpen.includes("study-details") ? "▲" : "▼"}</span>
                                            </div>
                                            <div className={`accordion-content ${accordionOpen.includes("study-details") ? "active" : ""}`} id="study-details">
                                                <div className="form-group">
                                                    <label className="form-label">Institution Name *</label>
                                                    <input
                                                        type="text"
                                                        className={`form-control ${errors.institution_name ? 'error' : ''}`}
                                                        name="institution_name"
                                                        value={formData.institution_name}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    <div className={`error-message ${errors.institution_name ? 'visible' : ''}`}>{errors.institution_name}</div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">DLI Number *</label>
                                                    <input
                                                        type="text"
                                                        className={`form-control ${errors.dli_number ? 'error' : ''}`}
                                                        name="dli_number"
                                                        value={formData.dli_number}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    <div className={`error-message ${errors.dli_number ? 'visible' : ''}`}>{errors.dli_number}</div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Program Name *</label>
                                                    <input
                                                        type="text"
                                                        className={`form-control ${errors.program_name ? 'error' : ''}`}
                                                        name="program_name"
                                                        value={formData.program_name}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    <div className={`error-message ${errors.program_name ? 'visible' : ''}`}>{errors.program_name}</div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Program Level *</label>
                                                    <select
                                                        className={`form-control ${errors.program_level ? 'error' : ''}`} name="program_level" value={formData.program_level} onChange={handleChange} required>
                                                        <option value="">Select program level</option>
                                                        <option value="secondary">Secondary School</option>
                                                        <option value="certificate">Certificate Program</option>
                                                        <option value="diploma">Diploma Program</option>
                                                        <option value="bachelor">Bachelor's Degree</option>
                                                        <option value="master">Master's Degree</option>
                                                        <option value="doctorate">Doctorate</option>
                                                    </select>
                                                    <div className={`error-message ${errors.program_level ? 'visible' : ''}`}>{errors.program_level}</div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Field of Study *</label>
                                                    <input
                                                        type="text"
                                                        className={`form-control ${errors.field_of_study ? 'error' : ''}`}
                                                        name="field_of_study"
                                                        value={formData.field_of_study}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    <div className={`error-message ${errors.field_of_study ? 'visible' : ''}`}>{errors.field_of_study}</div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Study Start Date *</label>
                                                    <input
                                                        type="date"
                                                        className={`form-control ${errors.study_start_date ? 'error' : ''}`}
                                                        name="study_start_date"
                                                        value={formData.study_start_date}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    <div className={`error-message ${errors.study_start_date ? 'visible' : ''}`}>{errors.study_start_date}</div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Study End Date *</label>
                                                    <input
                                                        type="date"
                                                        className={`form-control ${errors.study_end_date ? 'error' : ''}`}
                                                        name="study_end_date"
                                                        value={formData.study_end_date}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    <div className={`error-message ${errors.study_end_date ? 'visible' : ''}`}>{errors.study_end_date}</div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Cost of Studies (CAD) *</label>
                                                    <input
                                                        type="number"
                                                        className={`form-control ${errors.study_cost ? 'error' : ''}`}
                                                        name="study_cost"
                                                        value={formData.study_cost}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    <div className={`error-message ${errors.study_cost ? 'visible' : ''}`}>{errors.study_cost}</div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Letter of Acceptance Upload *</label>
                                                    <div className="file-upload-area" data-upload="letter_of_acceptance">
                                                        <p>Drag and drop letter of acceptance here or click to browse</p>
                                                        <input
                                                            type="file"
                                                            className="file-input"
                                                            name="letter_of_acceptance"
                                                            accept=".pdf,.jpg,.jpeg,.png"
                                                            onChange={handleFileChange}
                                                        />

                                                        {
                                                            formData.letter_of_acceptance && (
                                                                <div className="file-list">
                                                                    <div className="file-item">
                                                                        <span className="file-name">{formData.letter_of_acceptance.name}</span>
                                                                        <button type="button" className="file-remove" onClick={() => removeFile('letter_of_acceptance')}>Remove</button>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Provincial Attestation Letter (PAL/TAL) Upload *</label>
                                                    <div className="file-upload-area" data-upload="pal_tal">
                                                        <p>Drag and drop PAL/TAL here or click to browse</p>
                                                        <input
                                                            type="file"
                                                            className="file-input"
                                                            name="pal_tal"
                                                            accept=".pdf,.jpg,.jpeg,.png"
                                                            onChange={handleFileChange}
                                                        />

                                                        {
                                                            formData.pal_tal && (
                                                                <div className="file-list">
                                                                    <div className="file-item">
                                                                        <span className="file-name">{formData.pal_tal.name}</span>
                                                                        <button type="button" className="file-remove" onClick={() => removeFile('pal_tal')}>Remove</button>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Studying in Quebec?</label>
                                                    <select className="form-control" name="studying_quebec" value={formData.studying_quebec} onChange={handleChange}>
                                                        <option value="no">No</option>
                                                        <option value="yes">Yes</option>
                                                    </select>
                                                </div>

                                                {
                                                    formData.studying_quebec === 'yes' && (
                                                        <div className="conditional-section" id="quebec-caq">
                                                            <div className="form-group">
                                                                <label className="form-label">Quebec Acceptance Certificate (CAQ) Upload *</label>
                                                                <div className="file-upload-area" data-upload="caq">
                                                                    <p>Drag and drop CAQ here or click to browse</p>
                                                                    <input
                                                                        type="file"
                                                                        className="file-input"
                                                                        name="caq"
                                                                        accept=".pdf,.jpg,.jpeg,.png"
                                                                        onChange={handleFileChange}
                                                                    />

                                                                    {
                                                                        formData.caq && (
                                                                            <div className="file-list">
                                                                                <div className="file-item">
                                                                                    <span className="file-name">{formData.caq.name}</span>
                                                                                    <button type="button" className="file-remove" onClick={() => removeFile('caq')}>Remove</button>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>

                                        {/* <!-- Section 5: Financial Information --> */}
                                        <div className="accordion-item">
                                            <div className={`accordion-header ${accordionOpen.includes("financial-info") ? "active" : ""}`} data-target="financial-info" onClick={() => toggleAccordion('financial-info')}>
                                                <h3>5. Financial Information</h3>
                                                <span className="accordion-icon">{accordionOpen.includes("financial-info") ? "▲" : "▼"}</span>
                                            </div>
                                            <div className={`accordion-content ${accordionOpen.includes("financial-info") ? "active" : ""}`} id="financial-info">
                                                <div className="form-group">
                                                    <label className="htmlForm-label">Funds Available for Stay (CAD) *</label>
                                                    <input
                                                        type="number"
                                                        className={`form-control ${errors.funds_available ? 'error' : ''}`}
                                                        name="funds_available"
                                                        value={formData.funds_available}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    <div className={`error-message ${errors.funds_available ? 'visible' : ''}`}>{errors.funds_available}</div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Source of Funding *</label>
                                                    <select
                                                        className={`form-control ${errors.funding_source ? 'error' : ''}`} name="funding_source" value={formData.funding_source} onChange={handleChange} required>
                                                        <option value="">Select funding source</option>
                                                        <option value="personal">Personal funds</option>
                                                        <option value="family">Family support</option>
                                                        <option value="scholarship">Scholarship</option>
                                                        <option value="loan">Student loan</option>
                                                        <option value="other">Other</option>
                                                    </select>
                                                    <div className={`error-message ${errors.funding_source ? 'visible' : ''}`}>{errors.funding_source}</div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Financial Support Details</label>
                                                    <textarea className="form-control" name="financial_details" rows="4" placeholder="Provide additional details about your financial support" value={formData.financial_details} onChange={handleChange}></textarea>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Proof of Financial Support Upload *</label>
                                                    <div className="file-upload-area" data-upload="financial_proof">
                                                        <p>Drag and drop financial documents here or click to browse</p>
                                                        <input
                                                            type="file"
                                                            className="file-input"
                                                            name="financial_proof"
                                                            accept=".pdf,.jpg,.jpeg,.png"
                                                            multiple
                                                            onChange={handleFileChange}
                                                        />

                                                        {formData.financial_proof && formData.financial_proof.length > 0 && (
                                                            <div className="file-list">
                                                                {formData.financial_proof.map((file, index) => (
                                                                    <div key={index} className="file-item">
                                                                        <span className="file-name">{file.name}</span>
                                                                        <button type="button" className="file-remove" onClick={() => removeFile('financial_proof', index)}>Remove</button>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}

                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* <!-- Section 6: Educational Background --> */}
                                        <div className="accordion-item">
                                            <div className={`accordion-header ${accordionOpen.includes("education-background") ? "active" : ""}`} data-target="education-background" onClick={() => toggleAccordion('education-background')}>
                                                <h3>6. Educational Background</h3>
                                                <span className="accordion-icon">{accordionOpen.includes("education-background") ? "▲" : "▼"}</span>
                                            </div>
                                            <div className={`accordion-content ${accordionOpen.includes("education-background") ? "active" : ""}`} id="education-background">
                                                <div className="form-group">
                                                    <label className="form-label">Highest Level of Education *</label>
                                                    <select
                                                        className={`form-control ${errors.highest_education ? 'error' : ''}`} name="highest_education" value={formData.highest_education} onChange={handleChange} required>
                                                        <option value="">Select highest education</option>
                                                        <option value="secondary">Secondary School</option>
                                                        <option value="college">College</option>
                                                        <option value="bachelor">Bachelor's Degree</option>
                                                        <option value="master">Master's Degree</option>
                                                        <option value="doctorate">Doctorate</option>
                                                    </select>
                                                    <div className={`error-message ${errors.highest_education ? 'visible' : ''}`}>{errors.highest_education}</div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Institution Name *</label>
                                                    <input
                                                        type="text"
                                                        className={`form-control ${errors.prev_institution ? 'error' : ''}`}
                                                        name="prev_institution"
                                                        value={formData.prev_institution}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    <div className={`error-message ${errors.prev_institution ? 'visible' : ''}`}>{errors.prev_institution}</div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Field of Study *</label>
                                                    <input
                                                        type="text"
                                                        className={`form-control ${errors.prev_field_study ? 'error' : ''}`}
                                                        name="prev_field_study"
                                                        value={formData.prev_field_study}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    <div className={`error-message ${errors.prev_field_study ? 'visible' : ''}`}>{errors.prev_field_study}</div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">From Date *</label>
                                                    <input
                                                        type="date"
                                                        className={`form-control ${errors.prev_from_date ? 'error' : ''}`}
                                                        name="prev_from_date"
                                                        value={formData.prev_from_date}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    <div className={`error-message ${errors.prev_from_date ? 'visible' : ''}`}>{errors.prev_from_date}</div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">To Date *</label>
                                                    <input
                                                        type="date"
                                                        className={`form-control ${errors.prev_to_date ? 'error' : ''}`}
                                                        name="prev_to_date"
                                                        value={formData.prev_to_date}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    <div className={`error-message ${errors.prev_to_date ? 'visible' : ''}`}>{errors.prev_to_date}</div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* <!-- Section 7: Employment History --> */}
                                        <div className="accordion-item">
                                            <div className={`accordion-header ${accordionOpen.includes("employment-history") ? "active" : ""}`} data-target="employment-history" onClick={() => toggleAccordion('employment-history')}>
                                                <h3>7. Employment History</h3>
                                                <span className="accordion-icon">{accordionOpen.includes("employment-history") ? "▲" : "▼"}</span>
                                            </div>
                                            <div className={`accordion-content ${accordionOpen.includes("employment-history") ? "active" : ""}`} id="employment-history">
                                                <div className="form-group">
                                                    <label className="form-label">Current Occupation</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="current_occupation"
                                                        placeholder="Enter current occupation or 'Student' if applicable"
                                                        value={formData.current_occupation}
                                                        onChange={handleChange}
                                                    // required
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Company Name</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="company_name"
                                                        value={formData.company_name}
                                                        onChange={handleChange}
                                                    // required
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Job Title</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="job_title"
                                                        value={formData.job_title}
                                                        onChange={handleChange}
                                                    // required
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Employment From Date</label>
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        name="employment_from"
                                                        value={formData.employment_from}
                                                        onChange={handleChange}
                                                    // required
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Employment To Date</label>
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        name="employment_to"
                                                        value={formData.employment_to}
                                                        onChange={handleChange}
                                                    // required
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* <!-- Section 8: Family Information --> */}
                                        <div className="accordion-item">
                                            <div className={`accordion-header ${accordionOpen.includes("family-info") ? "active" : ""}`} data-target="family-info" onClick={() => toggleAccordion('family-info')}>
                                                <h3>8. Family Information (IMM 5707)</h3>
                                                <span className="accordion-icon">{accordionOpen.includes("family-info") ? "▲" : "▼"}</span>
                                            </div>
                                            <div className={`accordion-content ${accordionOpen.includes("family-info") ? "active" : ""}`} id="family-info">
                                                <h4>Mother's Information</h4>
                                                <div className="form-group">
                                                    <label className="form-label">Mother's Full Name *</label>
                                                    <input
                                                        type="text"
                                                        className={`form-control ${errors.mother_name ? 'error' : ''}`}
                                                        name="mother_name"
                                                        value={formData.mother_name}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    <div className={`error-message ${errors.mother_name ? 'visible' : ''}`}>{errors.mother_name}</div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Mother's Date of Birth *</label>
                                                    <input
                                                        type="date"
                                                        className={`form-control ${errors.mother_dob ? 'error' : ''}`}
                                                        name="mother_dob"
                                                        value={formData.mother_dob}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    <div className={`error-message ${errors.mother_dob ? 'visible' : ''}`}>{errors.mother_dob}</div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Mother's Country of Birth *</label>
                                                    <input
                                                        type="text"
                                                        className={`form-control ${errors.mother_country ? 'error' : ''}`}
                                                        name="mother_country"
                                                        value={formData.mother_country}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    <div className={`error-message ${errors.mother_country ? 'visible' : ''}`}>{errors.mother_country}</div>
                                                </div>

                                                <h4>Father's Information</h4>
                                                <div className="form-group">
                                                    <label className="form-label">Father's Full Name *</label>
                                                    <input
                                                        type="text"
                                                        className={`form-control ${errors.father_name ? 'error' : ''}`}
                                                        name="father_name"
                                                        value={formData.father_name}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    <div className={`error-message ${errors.father_name ? 'visible' : ''}`}>{errors.father_name}</div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Father's Date of Birth *</label>
                                                    <input
                                                        type="date"
                                                        className={`form-control ${errors.father_dob ? 'error' : ''}`}
                                                        name="father_dob"
                                                        value={formData.father_dob}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    <div className={`error-message ${errors.father_dob ? 'visible' : ''}`}>{errors.father_dob}</div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Father's Country of Birth *</label>
                                                    <input
                                                        type="text"
                                                        className={`form-control ${errors.father_country ? 'error' : ''}`}
                                                        name="father_country"
                                                        value={formData.father_country}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    <div className={`error-message ${errors.father_country ? 'visible' : ''}`}>{errors.father_country}</div>
                                                </div>

                                                <h4>Children Information</h4>
                                                <div className="form-group">
                                                    <label className="form-label">Do you have children?</label>
                                                    <select className="form-control" name="has_children" value={formData.has_children} onChange={handleChange}>
                                                        <option value="no">No</option>
                                                        <option value="yes">Yes</option>
                                                    </select>
                                                </div>

                                                {
                                                    formData.has_children === 'yes' && (
                                                        <div className="conditional-section" id="children-section">
                                                            <div id="children-container">

                                                                {/* <!-- Children will be added dynamically --> */}
                                                                {
                                                                    formData?.children?.map((i, index) => {
                                                                        return (
                                                                            <div className="child-item" key={index}>
                                                                                <div className="child-header">
                                                                                    <h5>Child {index + 1}</h5>
                                                                                    <button type="button" className="remove-child" onClick={() => removeChild(index)}>
                                                                                        Remove
                                                                                    </button>
                                                                                </div>

                                                                                <div className="form-group">
                                                                                    <label className="form-label">Child's Full Name *</label>
                                                                                    <input
                                                                                        type="text"
                                                                                        className={`form-control ${errors[`child_name_${index}`] ? 'error' : ''}`}
                                                                                        name="child_name_1"
                                                                                        value={i.name}
                                                                                        onChange={(e) => handleChildChange(index, "name", e.target.value)}
                                                                                        required
                                                                                    />
                                                                                    <div className={`error-message ${errors[`child_name_${index}`] ? 'visible' : ''}`}>{errors[`child_name_${index}`]}</div>
                                                                                </div>
                                                                                <div className="form-group">
                                                                                    <label className="form-label">Child's Date of Birth *</label>
                                                                                    <input
                                                                                        type="date"
                                                                                        className={`form-control ${errors[`child_dob_${index}`] ? 'error' : ''}`}
                                                                                        name="child_dob_1"
                                                                                        value={i.dob}
                                                                                        onChange={(e) => handleChildChange(index, "dob", e.target.value)}
                                                                                        required
                                                                                    />
                                                                                    <div className={`error-message ${errors[`child_dob_${index}`] ? 'visible' : ''}`}>{errors[`child_dob_${index}`]}</div>
                                                                                </div>
                                                                                <div className="form-group">
                                                                                    <label className="form-label">Child's Country of Birth *</label>
                                                                                    <input
                                                                                        type="text"
                                                                                        className={`form-control ${errors[`child_country_${index}`] ? 'error' : ''}`}
                                                                                        name="child_country_1"
                                                                                        value={i.country}
                                                                                        onChange={(e) => handleChildChange(index, "country", e.target.value)}
                                                                                        required
                                                                                    />
                                                                                    <div className={`error-message ${errors[`child_country_${index}`] ? 'visible' : ''}`}>{errors[`child_country_${index}`]}</div>
                                                                                </div>
                                                                                <div className="form-group">
                                                                                    <label className="form-label">Accompanying to Canada?</label>
                                                                                    <select
                                                                                        className={`form-control ${errors[`child_accompanying_${index}`] ? 'error' : ''}`}
                                                                                        name="child_accompanying_1"
                                                                                        value={i.accompanying}
                                                                                        onChange={(e) => handleChildChange(index, "accompanying", e.target.value)}
                                                                                    >
                                                                                        <option value="no">No</option>
                                                                                        <option value="yes">Yes</option>
                                                                                    </select>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    })
                                                                }

                                                            </div>

                                                            <button type="button" className="btn btn--secondary" id="add-child" onClick={addChild}>
                                                                Add Child
                                                            </button>
                                                        </div>
                                                    )
                                                }

                                            </div>
                                        </div>

                                        {/* <!-- Section 9: Background Questions --> */}
                                        <div className="accordion-item">
                                            <div className={`accordion-header ${accordionOpen.includes("background-questions") ? "active" : ""}`} data-target="background-questions" onClick={() => toggleAccordion('background-questions')}>
                                                <h3>9. Background Questions</h3>
                                                <span className="accordion-icon">{accordionOpen.includes("background-questions") ? "▲" : "▼"}</span>
                                            </div>
                                            <div className={`accordion-content ${accordionOpen.includes("background-questions") ? "active" : ""}`} id="background-questions">
                                                <div className="form-group">
                                                    <label className="htmlForm-label">Have you previously applied for admission to Canada? *</label>
                                                    <select
                                                        className={`form-control ${errors.prev_application ? 'error' : ''}`}
                                                        name="prev_application"
                                                        value={formData.prev_application}
                                                        onChange={handleChange}
                                                        required
                                                    >
                                                        <option value="">Select answer</option>
                                                        <option value="no">No</option>
                                                        <option value="yes">Yes</option>
                                                    </select>
                                                    <div className={`error-message ${errors.prev_application ? 'visible' : ''}`}>{errors.prev_application}</div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Have you ever been refused a visa or denied entry to Canada? *</label>
                                                    <select
                                                        className={`form-control ${errors.visa_refusal ? 'error' : ''}`}
                                                        name="visa_refusal"
                                                        value={formData.visa_refusal}
                                                        onChange={handleChange}
                                                        required
                                                    >
                                                        <option value="">Select answer</option>
                                                        <option value="no">No</option>
                                                        <option value="yes">Yes</option>
                                                    </select>
                                                    <div className={`error-message ${errors.visa_refusal ? 'visible' : ''}`}>{errors.visa_refusal}</div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Have you ever been convicted of a crime? *</label>
                                                    <select
                                                        className={`form-control ${errors.criminal_history ? 'error' : ''}`}
                                                        name="criminal_history"
                                                        value={formData.criminal_history}
                                                        onChange={handleChange}
                                                        required
                                                    >
                                                        <option value="">Select answer</option>
                                                        <option value="no">No</option>
                                                        <option value="yes">Yes</option>
                                                    </select>
                                                    <div className={`error-message ${errors.criminal_history ? 'visible' : ''}`}>{errors.criminal_history}</div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Have you ever served in the military? *</label>
                                                    <select
                                                        className={`form-control ${errors.military_service ? 'error' : ''}`}
                                                        name="military_service"
                                                        value={formData.military_service}
                                                        onChange={handleChange}
                                                        required
                                                    >
                                                        <option value="">Select answer</option>
                                                        <option value="no">No</option>
                                                        <option value="yes">Yes</option>
                                                    </select>
                                                    <div className={`error-message ${errors.military_service ? 'visible' : ''}`}>{errors.military_service}</div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* <!-- Section 10: Document Uploads --> */}
                                        <div className="accordion-item">
                                            <div className={`accordion-header ${accordionOpen.includes("document-uploads") ? "active" : ""}`} data-target="document-uploads" onClick={() => toggleAccordion('document-uploads')}>
                                                <h3>10. Document Uploads (IMM 5483 Checklist)</h3>
                                                <span className="accordion-icon">{accordionOpen.includes("document-uploads") ? "▲" : "▼"}</span>
                                            </div>
                                            <div className={`accordion-content ${accordionOpen.includes("document-uploads") ? "active" : ""}`} id="document-uploads">
                                                <div className="form-group">
                                                    <label className="form-label">Proof of Payment Upload *</label>
                                                    <div className="file-upload-area" data-upload="proof_payment">
                                                        <p>Drag and drop proof of payment here or click to browse</p>
                                                        <input
                                                            type="file"
                                                            className="file-input"
                                                            name="proof_payment"
                                                            accept=".pdf,.jpg,.jpeg,.png"
                                                            required
                                                            onChange={handleFileChange}
                                                        />

                                                        {
                                                            formData.proof_payment && (
                                                                <div className="file-list">
                                                                    <div className="file-item">
                                                                        <span className="file-name">{formData.proof_payment.name}</span>
                                                                        <button type="button" className="file-remove" onClick={() => removeFile('proof_payment')}>Remove</button>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }

                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Medical Exam Documents (if required)</label>
                                                    <div className="file-upload-area" data-upload="medical_exam">
                                                        <p>Drag and drop medical exam documents here or click to browse</p>
                                                        <input
                                                            type="file"
                                                            className="file-input"
                                                            name="medical_exam"
                                                            accept=".pdf,.jpg,.jpeg,.png"
                                                            multiple
                                                            onChange={handleFileChange}
                                                        />

                                                        {formData.medical_exam && formData.medical_exam.length > 0 && (
                                                            <div className="file-list">
                                                                {formData.medical_exam.map((file, index) => (
                                                                    <div key={index} className="file-item">
                                                                        <span className="file-name">{file.name}</span>
                                                                        <button type="button" className="file-remove" onClick={() => removeFile('medical_exam', index)}>Remove</button>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}

                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Additional Documents</label>
                                                    <div className="file-upload-area" data-upload="additional_docs">
                                                        <p>Drag and drop additional documents here or click to browse</p>
                                                        <input
                                                            type="file"
                                                            className="file-input"
                                                            name="additional_docs"
                                                            accept=".pdf,.jpg,.jpeg,.png"
                                                            multiple
                                                            onChange={handleFileChange}
                                                        />

                                                        {formData.additional_docs && formData.additional_docs.length > 0 && (
                                                            <div className="file-list">
                                                                {formData.additional_docs.map((file, index) => (
                                                                    <div key={index} className="file-item">
                                                                        <span className="file-name">{file.name}</span>
                                                                        <button type="button" className="file-remove" onClick={() => removeFile('additional_docs', index)}>Remove</button>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}

                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* <!-- Section 11: Review and Submit -->  */}
                                        <div className="accordion-item">
                                            <div className={`accordion-header ${accordionOpen.includes("review-submit") ? "active" : ""}`} data-target="review-submit" onClick={() => toggleAccordion('review-submit')}>
                                                <h3>11. Review and Submit</h3>
                                                <span className="accordion-icon">{accordionOpen.includes("review-submit") ? "▲" : "▼"}</span>
                                            </div>
                                            <div className={`accordion-content ${accordionOpen.includes("review-submit") ? "active" : ""}`} id="review-submit">
                                                <div className="review-section">
                                                    <h4>Application Summary</h4>

                                                    {
                                                        referenceNumber &&
                                                        <div id="application-summary">
                                                            {/* <!-- Summary will be generated dynamically --> */}

                                                            <h5 style={{ marginTop: '18px' }}>Personal Information</h5>
                                                            <div className="review-item">
                                                                <span className="review-label">Family Name *</span>
                                                                <span className="review-value">Dale Mullins</span>
                                                            </div>

                                                            <div className="review-item">
                                                                <span className="review-label">Given Names *</span>
                                                                <span className="review-value">Marny Sanders</span>
                                                            </div>

                                                            <div className="review-item">
                                                                <span className="review-label">Date of Birth *</span>
                                                                <span className="review-value">1979-04-06</span>
                                                            </div>

                                                            <div className="review-item">
                                                                <span className="review-label">Citizenship/Nationality *</span>
                                                                <span className="review-value">Quia sed aut qui sol</span>
                                                            </div>

                                                            <h5 style={{ marginTop: '18px' }}>Contact Information</h5>
                                                            <div className="review-item">
                                                                <span className="review-label">Email Address *</span>
                                                                <span className="review-value">fopybyrot@mailinator.com</span>
                                                            </div>

                                                            <div className="review-item">
                                                                <span className="review-label">Phone Number *</span>
                                                                <span className="review-value">+1 (855) 411-6322</span>
                                                            </div>

                                                            <div className="review-item">
                                                                <span className="review-label">Street Address *</span>
                                                                <span className="review-value">Sed magni deserunt d</span>
                                                            </div>

                                                            <h5 style={{ marginTop: '18px' }}>Study Details</h5>
                                                            <div className="review-item">
                                                                <span className="review-label">Institution Name *</span>
                                                                <span className="review-value">Henry Bennett</span>
                                                            </div>

                                                            <div className="review-item">
                                                                <span className="review-label">Program Name *</span>
                                                                <span className="review-value">Hannah Mcknight</span>
                                                            </div>

                                                            <div className="review-item">
                                                                <span className="review-label">Study Start Date *</span>
                                                                <span className="review-value">2010-09-23</span>
                                                            </div>

                                                            <h5 style={{ marginTop: '18px' }}>Financial Information</h5>
                                                            <div className="review-item">
                                                                <span className="review-label">Funds Available htmlFor Stay (CAD) *</span>
                                                                <span className="review-value">82</span>
                                                            </div>

                                                            <div className="review-item">
                                                                <span className="review-label">Source of Funding *</span>
                                                                <span className="review-value">family</span>
                                                            </div>
                                                        </div>
                                                    }

                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">
                                                        <input
                                                            type="checkbox"
                                                            name="declaration"
                                                            style={{ marginRight: "5px" }}
                                                            checked={formData.declaration}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                        I declare that the information provided in this application is complete, true, and accurate to the best of my knowledge.
                                                    </label>
                                                    <div className="error-message d-block">{errors.declaration}</div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Electronic Signature *</label>
                                                    <input
                                                        type="text"
                                                        className={`form-control ${errors.electronic_signature ? 'error' : ''}`}
                                                        name="electronic_signature"
                                                        value={formData.electronic_signature}
                                                        onChange={handleChange}
                                                        placeholder="Type your full name as electronic signature"
                                                        required
                                                    />
                                                    <div className={`error-message ${errors.electronic_signature ? 'visible' : ''}`}>{errors.electronic_signature}</div>
                                                </div>
                                                <div className="form-group">
                                                    <button
                                                        type="submit"
                                                        className="btn btn--primary btn--lg btn--full-width"
                                                        id="submit-application"
                                                        disabled={isSubmitting}
                                                        onClick={handleSubmit}
                                                    >
                                                        {isSubmitting ? 'Submitting...' : 'Submit Application'}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </main >

                                <div className={`auto-save-indicator ${isAutoSaved ? 'visible' : ''}`} id="autoSaveIndicator">
                                    <span className="status status--success">Auto-saved</span>
                                </div>
                            </div >


                            {isModalVisible && (
                                <div className="modal" id="confirmationModal">
                                    <div className="modal-content">
                                        <h2>Application Submitted Successfully!</h2>
                                        <p>
                                            Your application has been submitted with reference number: <br />
                                            <strong>{referenceNumber}</strong>
                                        </p>
                                        <p>You will receive a confirmation email shortly.</p>
                                        <button className="btn btn--primary" onClick={closeModal}>Close</button>
                                    </div>
                                </div>
                            )}

                        </div>
                    )

                    :

                    (
                        <section className="login-section admin">
                            <div className="row align-items-center justify-content-center min-vh-100">
                                <div className='col-xxl-4 col-xl-5 col-lg-6 col-md-7 col-sm-8 px-0 bg-white shadow login-box admin-login'>
                                    <div className="left-box">
                                        <div className="header-text my-4">
                                            <div className="mb-5">
                                                <img src={AdminLogo} className="img-fluid login-logo" draggable="false" />
                                            </div>

                                            <h4 className="mb-2">Form OTP
                                                <span>
                                                    <FaUserCog style={{ marginLeft: "13px", marginBottom: "2px" }} />
                                                </span>
                                            </h4>
                                            <p className='otp-p'>
                                                {/* Check your email inbox! Enter the 6-digit verification code sent to <span>test@gmail.com</span>. */}
                                                Check your email inbox! Enter the 6-degit verification code sent to your email
                                            </p>
                                        </div>
                                        <form onSubmit={handleOTPSubmit}>
                                            <div className="mb-3">
                                                {/* <label htmlFor="otp" className="form-label">Otp:</label> */}

                                                <div className='d-flex justify-content-between'>
                                                    {otp?.map((digit, index) => (
                                                        <input
                                                            key={index}
                                                            type="text"
                                                            maxLength="1"
                                                            id={`otp-input-${index}`}
                                                            name="otp"
                                                            className={`form-control otp-input ${digit ? "filled" : ""}`}
                                                            value={digit}
                                                            onChange={(e) => handleOTPChange(e, index)}
                                                            onKeyDown={(e) => handleBackspace(e, index)}
                                                            autoFocus={index === 0}
                                                            onPaste={(e) => handlePaste(e)}
                                                        />
                                                    ))}
                                                </div>

                                                {otpError &&
                                                    <div className='mt-2'>
                                                        <small className="text-danger">{otpError}</small>
                                                    </div>
                                                }
                                            </div>

                                            <div className="mt-4">
                                                <button
                                                    className={`login-btn ${loader ? 'btn-loading' : ''}`}
                                                    disabled={loader}
                                                >
                                                    {loader && loaders.small}
                                                    {loader ? 'Submitting...' : 'Submit Otp'}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )
            }

        </>

    )
}

export default UserForm;