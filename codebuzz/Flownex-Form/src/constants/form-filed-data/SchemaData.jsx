export const canadaProvincesMap = {
    AB: "Alberta",
    BC: "British Columbia",
    MB: "Manitoba",
    NB: "New Brunswick",
    NL: "Newfoundland and Labrador",
    NS: "Nova Scotia",
    NT: "Northwest Territories",
    NU: "Nunavut",
    ON: "Ontario",
    PE: "Prince Edward Island",
    QC: "Quebec",
    SK: "Saskatchewan",
    YT: "Yukon"
};

export const canadaProvinces = Object.keys(canadaProvincesMap);





// Data-Start


let applicantDetails = {
    label: "Applicant Details",
    fields: [
        { id: "given_name_s", label: "Given Name(s)", type: "text", required: true },
        { id: "family_name", label: "Family Name", type: "text", required: true },
        { id: "other_former_names", label: "Other/Former Names?", type: "yesno", required: true },
        { id: "other_former_names_details", label: "List all other/former names (e.g. nickname, maiden name, alias, etc.)", type: "text", required: true, showIf: { field: "other_former_names", equals: "Yes" } },
        { id: "gender", label: "Gender", type: "select", required: false, options: ["Male", "Female", "Unknown", "Another gender"] },
        { id: "date_of_birth", label: "Date of Birth", type: "date", required: true, dateLimit: "pastOrToday" },
        { id: "place_of_birth_city_town", label: "Place of Birth - City/Town", type: "text", required: false },
        { id: "place_of_birth_country_territory", label: "Place of Birth - Country/Territory", type: "select", required: true, options: "country", search: true },
        { id: "citizenship_s", label: "Citizenship(s)", type: "multiselect", required: true, options: "country_multi" },
        {
            id: "marital_status", label: "Marital Status", type: "select", required: true, search: true, options: ["Annulled Marriage", "Common-Law", "Divorced", "Married", "Separated", "Single", "Unknown", "Widowed"]
        },
        {
            id: 'married_common_law_status', label: "If you are married or in a common law relationship", type: 'repeater', required: false, showIf: {
                field: 'marital_status', equals: ["Married", "Common-Law"]
            },
            fields: [
                { id: "married_common_given_name_s", label: "Given Name(s)", type: "text", required: false },
                { id: "married_common_family_name", label: "Family name", type: "text", required: true },
                { id: "married_common_date", label: "Date", type: "date", required: false, dateLimit: "pastOrToday" },
            ]
        },
        { id: "previously_married_or_commonlaw", label: "Have you previously been married or in a common-law relationship?", type: "yesno", required: true },
        {
            id: "previous_relationship_details", label: "Previous spouse/common-law details", type: "repeater", required: true, showIf: { field: "previously_married_or_commonlaw", equals: "Yes" },
            fields: [
                { id: "partner_given_name_s", label: "Given Name(s)", type: "text", required: false },
                { id: "partner_family_name", label: "Family name", type: "text", required: true },
                { id: "partner_date_of_birth", label: "Date of Birth", type: "date", required: false, dateLimit: "pastOrToday" },
                { id: "partner_relationship_type", label: "Type of relationship", type: "select", required: true, options: ["Married", "Common-Law"] },
                { id: "partner_from_date", label: "From", type: "date", required: true, dateLimit: "futureOrToday" },
                { id: "partner_to_date", label: "To", type: "date", required: true, dateLimit: "futureOrToday" },
            ]
        },
        { id: "uci_if_known", label: "UCI (if known)", type: "text", required: false, validation: "pattern:^(\\d{8}|\\d{10}|\\d{4}-\\d{4}|\\d{2}-\\d{4}-\\d{4})$", maxLength: 10 }
    ]
};


let contactDetails = {
    label: "Contact Details",
    fields: [
        {
            id: "current_mailling_address", label: "Current Mailling Address", type: "repeater", required: false, fields: [
                { id: "current_mailling_apt_unit", label: "Apt/Unit", type: "text", required: false, maxLength: 10 },
                { id: "current_mailling_street_no", label: "Street no.", type: "text", required: false, maxLength: 10 },
                { id: "current_mailling_street_name", label: "Street name", type: "text", required: true },
                { id: "current_mailling_city_town", label: "City/Town", type: "text", required: true },
                { id: "current_mailling_country_territory", label: "Country or Territory", type: "select", required: true, options: "country", search: true },
                { id: "current_mailling_district", label: "District", type: "text", required: false, showIf: { field: "current_mailling_country_territory", notIn: ["Canada", "United States of America"] } },
                {
                    id: "current_mailling_province_state",
                    label: "Province/State",
                    type: "select",
                    required: false,
                    options: [],
                    search: true,
                    showIf: { field: "current_mailling_country_territory", equals: ["Canada", "United States of America"] }
                },
                { id: "current_mailling_postal_code", label: "Postal code", type: "text", required: false, maxLength: 10 },
            ]
        },
        { id: "mailing_address_same_as_residential", label: "Residential Mailing Address same as Residential?", type: "yesno", required: true },
        {
            id: "mailing_address_if_different", label: "Mailing Address (if different)", type: "repeater", required: false, showIf: { field: "mailing_address_same_as_residential", equals: "No" }, fields: [
                { id: "current_mailling_apt_unit", label: "Apt/Unit", type: "text", required: false, maxLength: 10 },
                { id: "current_mailling_street_no", label: "Street no.", type: "text", required: false, maxLength: 10 },
                { id: "current_mailling_street_name", label: "Street name", type: "text", required: false },
                { id: "current_mailling_city_town", label: "City/Town", type: "text", required: false },
                { id: "current_mailling_country_territory", label: "Country or Territory", type: "select", required: false, options: "country", search: true },
                { id: "current_mailling_district", label: "District", type: "text", required: false, showIf: { field: "current_mailling_country_territory", notIn: ["Canada", "United States of America"] } },
                {
                    id: "current_mailling_province_state",
                    label: "Province/State",
                    type: "select",
                    required: false,
                    options: [],
                    search: true,
                    showIf: { field: "current_mailling_country_territory", equals: ["Canada", "United States of America"] }
                },
                { id: "current_mailling_postal_code", label: "Postal code", type: "text", required: false, maxLength: 10 },
            ]
        },
        { id: "email", label: "Email", type: "email", required: true, validation: "email" },
        { id: "contact_details_telephone_no", label: "Telephone no.", type: "phone", required: false, validation: "phone", defaultCountry: "ca" },
        { id: "contact_details_al_telephone_no", label: "Alternate Telephone no.", type: "phone", required: false, validation: "phone", defaultCountry: "ca" },
    ]
};


let passportTravel = {
    label: "Passport",
    fields: [
        { id: "passport_number", label: "Passport Number", type: "text", required: true, validation: "/^[a-zA-Z0-9]{6,8}$/", maxLength: 8 },
        { id: "issuing_country", label: "Issue Country", type: "select", required: true, options: "country", search: true },
        { id: "issue_date", label: "Issue Date", type: "date", required: true, dateLimit: "pastOrToday" },
        { id: "expiry_date", label: "Expiry Date", type: "date", required: true, validation: "date>issue_date" },
        { id: "national_id_available", label: "National ID available?", type: "yesno", required: false },
        { id: "national_id_number", label: "National ID Number", type: "text", required: true, showIf: { field: "national_id_available", equals: "Yes" } },
        { id: "us_green_card", label: "US Green Card?", type: "yesno", required: false },
        { id: "uscis_number", label: "U.S. Citizenship and Immigration Services (USCIS) Number", type: "text", maxLength: 9, validation: "^\\d{9}$", required: true, showIf: { field: "us_green_card", equals: "Yes" } },
        { id: "uscis_expiry_date", label: "USCIS Expiry Date", type: "date", required: true, dateLimit: "futureOrToday", validation: "date<expiry_date", showIf: { field: "us_green_card", equals: "Yes" } },
        { id: "other_travel_docs", label: "Other Travel Docs?", type: "yesno", required: false },
        { id: "other_travel_doc_details", label: "Other Travel Doc Details", type: "textarea", required: true, showIf: { field: "other_travel_docs", equals: "Yes" } },
    ]
};


let nationalIdentity = {
    label: 'National identity document',
    fields: [
        { id: 'national_identity_document', label: 'Do you have a national identity document?', type: 'yesno', required: true },
        { id: 'document_number', label: 'Document Number', type: 'text', required: true, validation: "pattern:^[A-Z0-9]{6,20}$", maxLength: 15, showIf: { field: "national_identity_document", equals: "Yes" } },
        { id: 'territory_issue', label: 'Country or territory of issue', type: 'select', options: "country", required: true, showIf: { field: "national_identity_document", equals: "Yes" }, search: true },
        { id: 'document_issue_date', label: 'Issue Date', type: 'date', required: true, dateLimit: "pastOrToday", showIf: { field: "national_identity_document", equals: "Yes" } },
        { id: 'document_expiry_date', label: 'Expiry Date', type: 'date', required: true, dateLimit: "futureOrToday", validation: "date>=document_issue_date", showIf: { field: "national_identity_document", equals: "Yes" } }
    ]
};


let language = {
    label: "Language",
    fields: [
        { id: "native_language", label: "Native language / Mother Tongue", type: "select", required: true, options: "languages", search: true },
        { id: "language_most_at_ease", label: "In which language are you most at ease?", type: "select", required: true, options: ["English", "French", "Both", "Neither"] },
        { id: "language_test_taken", label: "Have you taken a test from a designated testing agency to assess your proficiency in English or French?", type: "yesno", required: true },
        { label: "Have language test results?", id: "have_language_test_results", type: "yesno", required: false },
        { label: "Test Type", id: "test_type", type: "select", required: false, showIf: { field: "have_language_test_results", equals: "Yes" }, options: ["IELTS", "CELPIP", "TEF", "TCF"] },
        { label: "Report Number", id: "report_number", type: "text", required: false, showIf: { field: "have_language_test_results", equals: "Yes" } },
        { label: "Scores:: Listening", id: "scores_listening", type: "number", required: false, showIf: { field: "have_language_test_results", equals: "Yes" } },
        { label: "Scores:: Reading", id: "scores_reading", type: "number", required: false, showIf: { field: "have_language_test_results", equals: "Yes" } },
        { label: "Scores:: Speaking", id: "scores_speaking", type: "number", required: false, showIf: { field: "have_language_test_results", equals: "Yes" } },
        { label: "Scores:: Writing", id: "scores_writing", type: "number", required: false, showIf: { field: "have_language_test_results", equals: "Yes" } },
        { label: "Test Date", id: "test_date", type: "date", required: false, showIf: { field: "have_language_test_results", equals: "Yes" } },
    ],
};


let entryStatusCanada = {
    label: "Entry / status in Canada",
    fields: [
        { id: "currently_in_canada", label: "Currently in Canada", type: "yesno", required: false },
        { id: "current_status_in_canada", label: "Current status in Canada", type: "select", required: false, options: ["Student", "Worker", "Visitor", "PR", "Citizen", "None"], showIf: { field: "currently_in_canada", equals: "Yes" } },
        { id: "document_used_to_enter", label: "Document used to enter", type: "select", required: false, options: ["Study", "eTA", "Passport", "Work", "Other"], showIf: { field: "currently_in_canada", equals: "Yes" } },
        { id: "most_recent_entry_date", label: "Most Recent Entry — Date", type: "date", required: false, showIf: { field: "currently_in_canada", equals: "Yes" }, dateLimit: "pastOrToday" },
        { id: "most_recent_entry_port_city", label: "Most Recent Entry — Port/City", type: "text", required: false, showIf: { field: "currently_in_canada", equals: "Yes" } },
        { id: "status_document_number", label: "Status Document Number", type: "text", required: false, showIf: { field: "currently_in_canada", equals: "Yes" } },
        { id: "status_issue_date", label: "Status Issue Date", type: "date", required: false, showIf: { field: "currently_in_canada", equals: "Yes" }, dateLimit: "pastOrToday" },
        { id: "status_expiry_date", label: "Status Expiry Date", type: "date", required: false, showIf: { field: "currently_in_canada", equals: "Yes" }, dateLimit: "futureOrToday" },
    ]
};


let employmentHistory = {
    label: "Employment History (last 10 years, no gaps)",
    fields: [
        {
            id: "employment_activity_last_10_years",
            label: "Employment/Activity",
            type: "repeater",
            required: true,
            fields: [
                { id: "employment_job_title_role", label: "Job Title/Role", type: "text", required: false },
                { id: "employment_activity_type", label: "Activity Type", type: "select", required: true, options: ["Employed", "Self-employed", "Student", "Unemployed", "Other"] },
                { id: "employment_employer_institution", label: "Employer/Institution", type: "text", required: true },
                { id: "employment_city_country", label: "City/Country", type: "text", required: true },
                { id: "employment_duties_notes", label: "Duties/Notes", type: "textarea", required: false },
                { id: "employment_from_yyyy_mm", label: "From (YYYY/MM)", type: "date", required: true },
                { id: "employment_to_yyyy_mm", label: "To (YYYY/MM)", type: "date", required: false },
            ]
        }
    ]
};


let addressHistory = {
    label: "Address History (last 10 years, no gaps)",
    fields: [
        {
            id: "address_history",
            label: "Address History",
            type: "repeater",
            required: true,
            fields: [
                { id: "address_street_city_province", label: "Street/City/Province", type: "text", required: true },
                { id: "address_country", label: "Country", type: "select", required: true, options: "country", search: true },
                { id: "address_postal_code", label: "Postal Code", type: "text", required: false },
                { id: "address_from_yyyy_mm", label: "From (YYYY-MM)", type: "date", required: true },
                { id: "address_to_yyyy_mm", label: "To (YYYY-MM)", type: "date", required: true },
            ]
        }
    ]
};


let educationHistory = {
    label: "Education History",
    fields: [
        // { id: "highest_level_completed", label: "Highest Level Completed", type: "select", required: true, options: ["High School", "Bachelor", "Master", "Doctorate", "Other"] },
        {
            id: "education_records",
            label: "Education",
            type: "repeater",
            required: true,
            fields: [
                // { id: "education_country", label: "Country", type: "select", required: true, options: "country", search: true },
                { id: "education_name_of_school", label: "Name of School", type: "text", required: true },
                { id: "education_level_of_study", label: "Field and Level of study", type: "text", required: true },
                { id: "education_my_field_study", label: "My Field of study will be", type: "select", required: false, options: ['Arts/Humanities/Social Science', 'Arts, Fine/Visual/Performing', 'Business/Commerce', 'Computing/IT', 'ESL/FSL', 'Flight Training', 'Hospitality/Tourism', 'Law', 'Medicine', 'Science, Applied', 'Sciences, General', 'Sciences, Health', 'Trades/Vocational', 'Theology/Religious Studies', 'Other', 'Agric/Agric Ops/Rel Sciences', 'Architecture and Rel Services', 'Biological/Biomed Sciences', 'Business/Mgmt/Marketing'], search: true },
                { id: "education_province", label: "Province", type: "select", required: true, search: true, options: [] },
                { id: "education_city_town", label: "City/Town", type: "select", required: true, search: true, options: [] },
                { id: "education_Address", label: "Address", type: "text", required: true },
                { id: "education_school_facility", label: "School/Facility name", type: "text", required: true },
                { id: "education_designated_learning", label: "Designated Learning Institution # (0#)", type: "text", required: false },
                { id: "education_student_id", label: "My Student ID # is:", type: "text", required: false },
                { id: "education_country_territory", label: "Country or Territory", type: "select", required: true, options: "country", search: true },
                { id: "education_funds_my_stay", label: "Funds available for my stay (CAD)", type: "text", required: true },
                { id: "education_expenses_paid_by", label: "My expenses in Canada will be paid by:", type: "select", required: true, options: ["Myself", 'Parents', 'Other'] },
                { id: "education_other", label: "Other", type: "text", required: true, showIf: { field: 'education_expenses_paid_by', equals: ['Other'] } },
                { id: "education_credential_awarded", label: "Credential Awarded?", type: "yesno", required: false },
                { id: "education_from_yyyy_mm", label: "From (YYYY/MM)", type: "date", required: true },
                { id: "education_to_yyyy_mm", label: "To (YYYY/MM)", type: "date", required: true },
            ]
        }
    ]
};


let familySummary = {
    label: "Family Summary",
    fields: [
        { id: "have_a_spouse_partner", label: "Have a spouse/partner?", type: "yesno", required: true },
        {
            id: "spouse",
            label: "Spouse",
            type: "repeater",
            required: false,
            max: 5,
            showIf: { field: "have_a_spouse_partner", equals: "Yes" },
            fields: [
                { id: "spouse_given_name_s", label: "Given Name(s)", type: "text", required: true },
                { id: "spouse_dob", label: "DOB", type: "date", required: true, dateLimit: "pastOrToday" },
                { id: "spouse_country_of_birth", label: "Country of Birth", type: "select", required: false, options: "country", search: true },
                { id: "spouse_citizenship_s", label: "Citizenship(s)", type: "multiselect", required: false, options: "country_multi" },
                { id: "spouse_current_status_in_canada", label: "Current Status in Canada", type: "select", required: false, options: ["None", "Visitor", "Worker", "Student", "PR", "Citizen"] },
                { id: "spouse_will_accompany", label: "Will Accompany?", type: "yesno", required: false },
            ]
        },
        { id: "have_children", label: "Have children?", type: "yesno", required: true },
        {
            id: "children",
            label: "Children (Repeater)",
            type: "repeater",
            required: false,
            max: 5,
            showIf: { field: "have_children", equals: "Yes" },
            fields: [
                { id: "child_given_name_s", label: "Given Name(s)", type: "text", required: true },
                { id: "child_relationship", label: "Relationship", type: "select", required: true, options: ["Child", "Step-child", "Adopted"] },
                { id: "child_dob", label: "DOB", type: "date", required: true, dateLimit: "pastOrToday" },
                { id: "child_current_status_in_canada", label: "Current Status in Canada", type: "select", required: false, options: ["None", "Visitor", "Worker", "Student", "PR", "Citizen"] },
                { id: "child_will_accompany", label: "Will Accompany?", type: "yesno", required: false },
            ]
        },
        { id: "parents_information_available", label: "Parents’ information available?", type: "yesno", required: true },
        {
            id: "parents",
            label: "Parents",
            type: "repeater",
            required: false,
            max: 2,
            showIf: { field: "parents_information_available", equals: "Yes" },
            fields: [
                { id: "parent_given_name_s", label: "Given Name(s)", type: "text", required: true },
                { id: "parent_dob", label: "DOB", type: "date", required: false, dateLimit: "pastOrToday" },
                { id: "parent_alive", label: "Alive?", type: "yesno", required: false },
            ]
        }
    ]
};


let backgroundAdmissibility = {
    label: "Background & Admissibility",
    fields: [
        { id: "affiliation_with_violent_criminal_organizations", label: "Affiliation with violent/criminal organizations?", type: "yesno", required: false },
        { id: "background_details", label: "Background — Details", type: "textarea", required: false, showIf: { field: "affiliation_with_violent_criminal_organizations", equals: "Yes" } },
        { id: "criminal_charges_convictions_any_country", label: "Criminal charges/convictions (any country)?", type: "yesno", required: true },
        { id: "criminal_charges_convictions_explanation", label: "Criminal charges/convictions — Explanation", type: "textarea", required: true, showIf: { field: "criminal_charges_convictions_any_country", equals: "Yes" }, },
        { id: "ever_refused_visa_permit_or_removal_order_any_country", label: "Ever refused visa/permit or removal order (any country)?", type: "yesno", required: true },
        { id: "ever_refused_visa_permit_or_removal_order_explanation", label: "Refusal/Removal Explanation", type: "textarea", required: true, showIf: { field: "ever_refused_visa_permit_or_removal_order_any_country", equals: "Yes" } },
        { id: "ever_violated_immigration_status_any_country", label: "Ever violated immigration status (any country)?", type: "yesno", required: true },
        { id: "ever_violated_immigration_status_explanation", label: "Violation Explanation", type: "textarea", required: true, showIf: { field: "ever_violated_immigration_status_any_country", equals: "Yes" } },
        { id: "human_rights_violations", label: "Human rights violations?", type: "yesno", required: false },
        { id: "human_rights_violations_explanation", label: "Human Rights Explanation", type: "textarea", required: false, showIf: { field: "human_rights_violations", equals: "Yes" } },
        { id: "medical_condition_requiring_services", label: "Medical condition requiring services?", type: "yesno", required: false },
        { id: "medical_condition_requiring_services_explanation", label: "Medical Condition Explanation", type: "textarea", required: false, showIf: { field: "medical_condition_requiring_services", equals: "Yes" } },
        { id: "military_police_security_service", label: "Military/Police/Security service?", type: "yesno", required: false },
        { id: "military_police_security_service_explanation", label: "Military/Police/Security Explanation", type: "textarea", required: false, showIf: { field: "military_police_security_service", equals: "Yes" } },
        { id: "previously_applied_to_canada", label: "Previously applied to Canada?", type: "yesno", required: false },
        { id: "previously_applied_to_canada_explanation", label: "Previous Application Details", type: "textarea", required: false, showIf: { field: "previously_applied_to_canada", equals: "Yes" } },
        { id: "tuberculosis_contact_or_treatment", label: "Tuberculosis contact or treatment?", type: "yesno", required: false },
        { id: "tuberculosis_contact_or_treatment_explanation", label: "Tuberculosis Explanation", type: "textarea", required: false, showIf: { field: "tuberculosis_contact_or_treatment", equals: "Yes" } },
    ]
};


let declarationConsent = {
    label: "Declaration & Consent",
    fields: [
        { id: "date", label: "Date", type: "date", required: true },
        { id: "i_certify_information_is_true_and_complete", label: "I certify information is true and complete", type: "yesno", required: true },
        { id: "signature_type_full_name", label: "Signature (type Given Name(s))", type: "text", required: true }
    ]
}


let detailsIntendedCanada = {
    label: 'Details of intended work in Canada',
    fields: [
        { id: "job_title", label: "Job Title", type: "text", required: true },
        { id: "brief_description_of_duties", label: "Brief description of duties", type: "text", required: true },
        { id: 'work_permit_applting', label: 'What type of work permit are you applting for', type: 'select', required: true, options: ['Open Work Permit', 'Start-up Business Class', 'Exemption from Labour Market Impact Assessment', 'Labour Market Impact Assessment Stream', 'Seasonal Agricultural Workers Program', 'Other',] },
        { id: 'name_of_employer', label: 'Name of Employer', type: 'text', required: true },
        { id: 'intended_location_employment', label: 'Intended location of Employment in Canada?', type: 'yesno', required: false },
        { id: 'complete_address_employer', label: 'Complete Address of Employer (Canadian of Foreign) :-', type: 'text', required: true },
        { id: "labour_market_impact", label: "Labour Market Impact Assessment (LMIA) N0.or offer of Employment (LMIA Exempt) No.", type: "text", required: false, },
        { id: 'location_employment_province', label: 'Province', type: 'select', required: true, search: true, options: [] },
        { id: "location_employment_city_town", label: "City/Town", type: "select", required: true, search: true, options: [] },
        { id: "location_employment_Address", label: "Address", type: "text", required: true },
        { id: "duration_employment_form", label: "Duration of expected employment Form", type: "date", required: false, dateLimit: 'future' },
        { id: "duration_employment_to", label: "Duration of expected employment To", type: "date", required: false, datdateLimit: 'future' },
    ]
}


let travelHistory = {
    label: "Travel History (last 10 years)",
    fields: [
        {
            id: "travel_history",
            label: "Travel",
            type: "repeater",
            required: false,
            fields: [
                { id: "travel_country", label: "Country", type: "select", required: true, options: "country" },
                { id: "travel_from_yyyy_mm", label: "From (YYYY-MM)", type: "date", required: true },
                { id: "travel_to_yyyy_mm", label: "To (YYYY-MM)", type: "date", required: true },
                { id: "travel_purpose", label: "Purpose", type: "text", required: false },
            ]
        }
    ]
};


let visitToCanada = {
    label: 'Details of Visit to canada',
    fields: [
        { id: 'purpose_of_my_visit', label: 'Purpose of my visit', type: 'select', required: true, options: ['Tourism', 'Business', 'Family Visit', 'Short-Term Studies', 'Returning Student', 'Super Visa: For Parents or Grandparents', 'Returning Worker', 'Other',] },
        { id: "visit_to_canada_other", label: "Other", type: "text", required: true, showIf: { field: 'purpose_of_my_visit', equals: ['Other'] } },
        { id: "visit_to_canada_from", label: "From", type: "date", required: true, dateLimit: 'future' },
        { id: "visit_to_canada_to", label: "To", type: "date", required: true, dateLimit: 'future' },
        { id: "visit_to_canada_funds", label: "Funds available for my stay (CAD)", type: "text", required: true, maxLength: 12 },
        {
            id: "visit_to_canada_relationship", label: "Name,address and relationship of any person(s) of Institution(S) I will visit:", type: "repeater", required: true, fields: [
                { id: 'relationship_name', label: 'Name', type: 'text', required: true },
                { id: 'relationship_to_me', label: 'Relationship to me', type: 'text', required: false },
                { id: 'relationship_address_in_canada', label: 'Address in Canada', type: 'text', required: true }
            ]
        },
    ]
}



export const schemaFormData = {
    study_intake: {
        label: "Study Intake",
        fields: {
            applicantDetails,
            contactDetails,
            passportTravel,
            nationalIdentity,
            language,
            entryStatusCanada,
            employmentHistory,
            addressHistory,
            // languageDetails,
            educationHistory,
            // travelHistory,
            // programSpecific,
            familySummary,
            backgroundAdmissibility,
            declarationConsent
        }
    },

    // study_permit_outside: {
    //     label: "Study Permit (Outside)",
    //     fields: {
    //         G01_PersonalInfo,
    //         G02_Passport,
    //         G03_EducationHistory,
    //         G04_FamilyInfo,
    //         G05_Financials,
    //         G06_StudyPlan,
    //         G07_TravelHistory,
    //         G17_ProofOfFunds
    //     }
    // },

    // study_permit_inside: {
    //     label: "Study Permit (Inside)",
    //     fields: {
    //         G01_PersonalInfo,
    //         G02_Passport,
    //         G03_EducationHistory,
    //         G04_FamilyInfo,
    //         G05_Financials,
    //         G06_StudyPlan,
    //         G09_ComingIntoCanada
    //     }
    // },

    // visitor_visa_trv_outside: {
    //     label: "Visitor Visa TRV (Outside)",
    //     fields: {
    //         G01_PersonalInfo,
    //         G02_Passport,
    //         G10_EmploymentHistory,
    //         G05_Financials,
    //         G04_FamilyInfo,
    //         G07_TravelHistory,
    //     }
    // },

    // trv_inside_workers_student: {
    //     label: "TRV Inside (Workers/Students)",
    //     fields: {
    //         G01_PersonalInfo,
    //         G02_Passport,
    //         G10_EmploymentHistory,
    //         G06_StudyPlan,
    //         G05_Financials,
    //         G09_ComingIntoCanada
    //     }
    // },

    // visitor_record_imm_5708: {
    //     label: "Visitor Record (IMM 5708)",
    //     fields: {
    //         G01_PersonalInfo,
    //         G02_Passport,
    //         G05_Financials,
    //         G09_ComingIntoCanada
    //     }
    // },

    // work_permit_outside_imm: {
    //     label: "Work Permit (Outside IMM)",
    //     fields: {
    //         G01_PersonalInfo,
    //         G02_Passport,
    //         G11_JobOffer,
    //         G12_LMIA_or_Exempt,
    //         G10_EmploymentHistory,
    //         G04_FamilyInfo,
    //     }
    // },

    // work_permit_inside_imm_5: {
    //     label: "Work Permit (Inside IMM 5)",
    //     fields: {
    //         G01_PersonalInfo,
    //         G02_Passport,
    //         G11_JobOffer,
    //         G12_LMIA_or_Exempt,
    //         G10_EmploymentHistory,
    //         G09_ComingIntoCanada
    //     }
    // },

    postgraduation_work_permi: {
        label: "Post-Graduation Work Permit",
        fields: {
            applicantDetails,
            contactDetails,
            passportTravel,
            language,
            entryStatusCanada,
            detailsIntendedCanada,
            employmentHistory,
            addressHistory,
            educationHistory,
            travelHistory,
            programSpecific: {
                label: "Program-Specific",
                fields: [
                    { id: "canadian_institution", label: "Canadian Institution", type: "text", required: true },
                    { id: "completion_date", label: "Completion Date", type: "date", required: true, dateLimit: "futureOrToday" },
                    { label: "Current Study Permit Number (if any)", id: "current_study_permit_number_if_any", type: "text", required: false },
                    { id: "program_length_years", label: "Program Length (years)", type: "number", required: true },
                    { id: "program_of_study", label: "Program of Study", type: "text", required: true },
                ]
            },
            familySummary,
            backgroundAdmissibility,
            declarationConsent
        }
    },

    wp_lmia_based_intake: {
        label: "WP LMIA-Based – Intake",
        fields: {
            applicantDetails,
            contactDetails,
            passportTravel,
            language,
            entryStatusCanada,
            detailsIntendedCanada,
            employmentHistory,
            addressHistory,
            educationHistory,
            travelHistory,
            programSpecific: {
                label: "Program-Specific",
                fields: [
                    { id: "employer_name", label: "Employer Name", type: "text", required: true },
                    { id: "hours_per_week", label: "Hours per Week", type: "number", required: false },
                    { label: "Job Title", id: "job_title", type: "text", required: true },
                    { id: "lmia_expiry_date", label: "LMIA Expiry Date", type: "date", required: false, dateLimit: "futureOrToday" },
                    { id: "lmia_number", label: "LMIA Number", type: "text", required: true },
                    { id: "noc_teer_if_known", label: "NOC/TEER (if known)", type: "text", required: false },
                    { id: "wage_hourly", label: "Wage (hourly)", type: "Currency", required: false },
                    { id: "work_location_city_province", label: "Work Location (City/Province)", type: "text", required: true }
                ]
            },
            familySummary,
            backgroundAdmissibility,
            declarationConsent
        }
    },

    wp_lmia_exempt_intake: {
        label: "WP LMIA-Exempt – Intake",
        fields: {
            applicantDetails,
            contactDetails,
            passportTravel,
            language,
            entryStatusCanada,
            employmentHistory,
            addressHistory,
            educationHistory,
            travelHistory,
            programSpecific: {
                label: "Program-Specific",
                fields: [
                    { id: "employer_compliance_submission_a", label: "Employer Compliance Submission # (A#)", type: "text", required: true },
                    { id: "employer_name", label: "Employer Name", type: "text", required: false },
                    { id: "exemption_category", label: "Exemption Category", type: "text", required: true },
                    { label: "Exemption Rationale", id: "exemption_rationale", type: "textarea", required: false },
                    { id: "job_title", label: "Job Title", type: "text", required: false, },
                    { id: "offer_of_employment_number", label: "Offer of Employment Number", type: "text", required: true },
                ]
            },
            familySummary,
            backgroundAdmissibility,
            declarationConsent
        }
    },

    trv_outside_intake: {
        label: "TRV (Outside) – Intake",
        fields: {
            applicantDetails,
            contactDetails,
            passportTravel,
            language,
            entryStatusCanada,
            employmentHistory,
            addressHistory,
            educationHistory,
            travelHistory,
            programSpecific: {
                label: "Program-Specific",
                fields: [
                    { id: "funds_monthly_income", label: "Funds: Monthly Income", type: "Currency", required: false },
                    { id: "funds_savings_available_cad", label: "Funds: Savings Available (CAD)", type: "Currency", required: false },
                    { id: "host_details_name_status_address_phone", label: "Host Details (Name/Status/Address/Phone)", type: "textarea", required: false },
                    { label: "Intended Arrival Date", id: "intended_arrival_date", type: "date", required: true, dateLimit: "futureOrToday" },
                    { id: "length_of_stay_days", label: "Length of Stay (days)", type: "number", required: true, },
                    { id: "purpose_of_visit", label: "Purpose of Visit", type: "textarea", required: true },
                    { id: "staying_with_host_in_canada", label: "Staying with Host in Canada?", type: "yesno", required: false },
                ]
            },
            familySummary,
            backgroundAdmissibility,
            declarationConsent
        }
    },

    trv_inside_extension_intake: {
        label: "TRV (Inside Extension) – Intake",
        fields: {
            applicantDetails,
            contactDetails,
            passportTravel,
            language,
            entryStatusCanada,
            visitToCanada,
            employmentHistory,
            addressHistory,
            educationHistory,
            travelHistory,
            programSpecific: {
                label: "Program-Specific",
                fields: [
                    { id: "planned_departure_date", label: "Planned Departure Date", type: "date", required: false, dateLimit: "futureOrToday" },
                    { id: "reason_for_extension", label: "Reason for Extension", type: "textarea", required: true },
                ]
            },
            familySummary,
            backgroundAdmissibility,
            declarationConsent
        }
    },

    sowp_intake: {
        label: "SOWP – Intake",
        fields: {
            applicantDetails,
            contactDetails,
            passportTravel,
            language,
            entryStatusCanada,
            employmentHistory,
            addressHistory,
            educationHistory,
            travelHistory,
            programSpecific: {
                label: "Program-Specific",
                fields: [
                    { id: "cohabitation_start_date", label: "Cohabitation Start Date", type: "date", required: false, dateLimit: "futureOrToday" },
                    { id: "marriage_date_or_cl_start", label: "Marriage Date (or CL start)", type: "date", required: true, dateLimit: "pastOrToday" },
                    { id: "principal_spouse_employer_school", label: "Principal Spouse Employer/School", type: "text", required: true },
                    { id: "principal_spouse_permit_number", label: "Principal Spouse Permit Number", type: "text", required: false },
                    { id: "principal_spouse_status", label: "Principal Spouse Status", type: "select", required: true, options: ['Worker', 'Student'] },
                ]
            },
            familySummary,
            backgroundAdmissibility,
            declarationConsent
        }
    },

    pr_economic_intake: {
        label: "PR Economic – Intake",
        fields: {
            applicantDetails,
            contactDetails,
            passportTravel,
            language,
            entryStatusCanada,
            employmentHistory,
            addressHistory,
            educationHistory,
            travelHistory,
            programSpecific: {
                label: "Program-Specific",
                fields: [
                    { id: "arranged_employment", label: "Arranged Employment?", type: "yesno", required: false },
                    { id: "eca_report_available", label: "ECA Report Available?", type: "yesno", required: false },
                    { id: "language_report_number", label: "Language Report Number", type: "text", required: false },
                    { id: "language_test_date", label: "Language Test Date", type: "date", required: false, dateLimit: "pastOrToday" },
                    { id: "language_test_type_if_any", label: "Language Test Type (if any)", type: "select", required: false, options: ['IELTS', 'CELPIP', 'TEF', 'TCF'] },
                    { id: "pnp_nomination", label: "PNP Nomination?", type: "yesno", required: false },
                    { id: "relative_in_canada_pr_citizen", label: "Relative in Canada (PR/Citizen)?", type: "yesno", required: false },
                ]
            },
            familySummary,
            backgroundAdmissibility,
            declarationConsent
        }
    },

    pr_family_spon_intake: {
        label: "PR Family Sponsorship – Intake",
        fields: {
            applicantDetails,
            contactDetails,
            passportTravel,
            language,
            entryStatusCanada,
            employmentHistory,
            addressHistory,
            educationHistory,
            travelHistory,
            programSpecific: {
                label: "Program-Specific",
                fields: [
                    { id: "cohabitation_if_applicable_start_date", label: "Cohabitation (if applicable) — Start Date", type: "date", required: false, dateLimit: "futureOrToday" },
                    { id: "marriage_date_if_applicable", label: "Marriage Date (if applicable)", type: "date", required: false, dateLimit: "pastOrToday" },
                    { id: "relationship_start_date", label: "Relationship Start Date", type: "date", required: false, dateLimit: "pastOrToday" },
                    {
                        id: "relationship_type", label: "Relationship Type", type: "select", required: true, options: ['Spouse', 'Common-law', 'Conjugal', 'Parent', 'Child']
                    },
                    { id: "sponsor_full_name", label: "Sponsor Full Name", type: "text", required: true },
                    { id: "sponsor_status_in_canada", label: "Sponsor Status in Canada", type: "select", required: true, options: ['PR', 'Citizen'] },
                ]
            },
            familySummary,
            backgroundAdmissibility,
            declarationConsent
        }
    },

    citizenship_intake: {
        label: "Citizenship – Intake",
        fields: {
            applicantDetails,
            contactDetails,
            passportTravel,
            language,
            entryStatusCanada,
            employmentHistory,
            addressHistory,
            educationHistory,
            travelHistory,
            programSpecific: {
                label: "Program-Specific",
                fields: [
                    {
                        id: "activities_last_5_years", label: "Activities (last 5 years)", type: "repeater", required: true,
                        fields: [
                            {
                                id: 'activity_type', label: 'Activity:: Type', type: 'select', required: true, options: ['Employed', 'Self-employed', 'Student', 'Homemaker', 'Volunteer', 'Retired', 'Other']
                            },
                            { id: 'activity_from_yyyy_mm', label: 'Activity:: From (YYYY-MM)', type: 'date', required: true, dateLimit: "futureOrToday" },
                            { id: 'activity_to_yyyy_mm', label: 'Activity:: To (YYYY-MM)', type: 'date', required: true, dateLimit: "futureOrToday" },
                        ]
                    },
                    {
                        id: 'age_group', label: 'Age Group', type: 'select', required: true, options: ['Minor 0 - 18', 'Adult 18 - 54', 'Senior citizen 55 - 100 ']
                    },
                    { id: 'any_prohibitions_making_you_ineligible', label: 'Any prohibitions making you ineligible?', type: 'yesno', required: true },
                    { id: 'any_prohibitions_explanation', label: 'Please explain', type: 'textarea', required: true, showIf: [{ field: 'any_prohibitions_making_you_ineligible', equals: "Yes" }] },
                    { id: 'date_became_pr', label: 'Date Became PR', type: 'date', required: true, dateLimit: 'future' },
                    { id: 'language_proof_available_18_54', label: 'Language Proof Available (18–54)', type: 'yesno', required: true, showIf: { field: 'age_group', equals: ['Adult 18 - 54'] } },
                    {
                        id: "trips_outside_canada_last_5_years", label: "Trips Outside Canada (last 5 years)", type: "repeater", required: false,
                        fields: [
                            { id: 'trip_country', label: 'Trip:: Country', type: 'select', required: false, options: "country", search: true },
                            { id: 'trip_from_yyyy_mm_dd', label: 'Trip:: From (YYYY-MM-DD)', type: 'date', required: false, dateLimit: "futureOrToday" },
                            { id: 'trip_to_yyyy_mm_dd', label: 'Trip:: To (YYYY-MM-DD)', type: 'date', required: false, dateLimit: "futureOrToday" },
                        ]
                    },
                ]
            },
            familySummary,
            backgroundAdmissibility,
            declarationConsent
        }
    },

    client_evaluation_intake: {
        label: "Client Evaluation – Intake",
        fields: {
            applicantDetails,
            contactDetails,
            passportTravel,
            language,
            entryStatusCanada,
            employmentHistory,
            addressHistory,
            educationHistory,
            travelHistory,
            programSpecific: {
                label: "Program-Specific",
                fields: [
                    { id: "interested_pr_pathways_if_any", label: "Interested PR pathways (if any)", type: "multiselect", required: false, options: ['CEC', 'FSW', 'FST', 'PNP', 'AIPP', 'RNIP', 'Other'] },
                    { id: "open_to_french_pathway_tef_tcf", label: "Open to French pathway (TEF/TCF)?", type: "yesno", required: false },
                    { id: "target_provinces_cities", label: "Target provinces/cities", type: "multiselect", required: false, options: canadaProvinces },
                    { id: "willing_to_study_work_in_canada", label: "Willing to study/work in Canada?", type: "yesno", required: false },
                ]
            },
            familySummary,
            backgroundAdmissibility,
            declarationConsent
        }
    },
    // spouse_common_law_owp_school: {
    //     label: "Spouse/Common Law OWP (School)",
    //     fields: {
    //         G01_PersonalInfo,
    //         G02_Passport,
    //         G04_FamilyInfo,
    //         G09_ComingIntoCanada
    //     }
    // },

    // express_entry_pr_cec_fsw: {
    //     label: "Express Entry e-APR (CEC/FSW/FST)",
    //     fields: {
    //         G01_PersonalInfo,
    //         G02_Passport,
    //         G13_IMM0008_Generic,
    //         G03_EducationHistory,
    //         G10_EmploymentHistory,
    //         G07_TravelHistory,
    //         G17_ProofOfFunds,
    //         G16_IMM5669_ScheduleA,
    //         G15_IMM5406_Family,
    //         G14_IMM5562_Travels
    //     }
    // }
};