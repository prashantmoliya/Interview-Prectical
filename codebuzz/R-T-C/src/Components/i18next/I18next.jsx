import React from 'react'
import { useTranslation } from 'react-i18next';

const I18next = () => {

    const { t, i18n } = useTranslation();
    // console.log("useTranslation++", t, i18n);

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
    }

    return (
        <>

            <div className='text-center mt-4'>
                <h2 style={{ textDecoration: 'underline' }}>react-i18next (translate) </h2>
            </div>


            <div className='row text-center mt-5'>
                <h3 className='mb-4'>react-i18next multi language translate.</h3>

                <div className="col-2 m-auto">
                    <select className="form-select" aria-label="Select language" onChange={(e) => changeLanguage(e.target.value)}>
                        <option value="en">English</option>
                        <option value="fr">French</option>
                    </select>
                </div>

                <div className='m-3'>

                    <p className='fs-5'>
                        {t('welcome')}
                        {/* Hello Welcome to React App */}
                    </p>
                </div>

            </div>
        </>
    )
}

export default I18next;