import React, { useEffect, useRef, useState } from 'react'
import {
    defaultCountries,
    FlagImage,
    parseCountry,
    usePhoneInput,
} from "react-international-phone";
import "react-international-phone/style.css";

import { useOnClickOutside } from "./useOnClickOutside";
import searchIcon from "../../assets/images/searchIcon.svg";
import arrowIcon from "../../assets/images/arrow-down.svg";

const SelectPhoneNew = ({
    inputMobileData,
    onPhoneChange,
    detectedCountry,
    handleOnBlur,
    ...restProps
}) => {

    const countryRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [countries, setCountries] = useState(defaultCountries);
    const [searchInput, setSearchInput] = useState("");

    useOnClickOutside(countryRef, () => {
        if (isOpen) setTimeout(() => setIsOpen(false), 200);
    });

    const handleOnChangeSearch = (e) => setSearchInput(e.target.value);

    useEffect(() => {
        if (searchInput) {
            setCountries(
                defaultCountries.filter((c) =>
                    c[0].toLowerCase().includes(searchInput.toLowerCase())
                )
            );
        } else {
            setCountries(defaultCountries);
        }
    }, [searchInput]);

    const {
        inputValue,
        handlePhoneValueChange,
        inputRef,
        country,
        setCountry,
    } = usePhoneInput({
        forceDialCode: true,
        defaultCountry: (inputMobileData?.country_code || detectedCountry || 'ca')?.toLowerCase(),
        value: inputMobileData?.phone_number ?? "",
        countries: defaultCountries,
        disableCountryGuess: true,
        onChange: (data) => {
            onPhoneChange({
                country_code: data.countryIso2 || country.iso2,
                phone_number: data.inputValue,
            });
        },
    });


    return (
        <div className={`d-flex w-100 align-items-center border bg-white rounded position-relative react-international-phone`}>
            {/* Country selector */}
            <div className="px-3 d-flex align-items-center" style={{ width: "70px", cursor: "pointer" }}>
                <div onClick={() => setIsOpen(true)} className="d-flex align-items-center gap-2">
                    <FlagImage iso2={country.iso2} />
                    <div className="d-flex align-items-center justify-content-center" style={{ width: "14px", height: "14px" }}>
                        <img
                            src={arrowIcon}
                            alt="arrow icon"
                            className={`transition ${isOpen ? "rotate-180" : ""}`}
                            style={{ width: "14px", height: "14px" }}
                        />
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="border-start" style={{ height: "30px" }} />

            {/* Phone input */}
            <div className="flex-grow-1">
                <input
                    placeholder="Phone number"
                    type="tel"
                    value={inputValue}
                    onChange={handlePhoneValueChange}
                    ref={inputRef}
                    className="form-control s border-0"
                    onBlur={() => handleOnBlur?.()}
                    {...restProps}
                />
            </div>

            {/* Dropdown */}
            <div
                ref={countryRef}
                className={`dropdown-menu p-0 shadow position-absolute w-50 ${isOpen ? "show" : ""}`}
                style={{ top: "100%", left: 0, maxHeight: "320px", overflowY: "auto", zIndex: 1050 }}
            >
                {/* Search box */}
                <div className="position-relative">
                    <input
                        type="text"
                        placeholder="Search for country"
                        className="form-control border-0 border-bottom rounded-0 ps-5"
                        name="searchInput"
                        value={searchInput}
                        onChange={handleOnChangeSearch}
                        onKeyUp={(e) => e.stopPropagation()}
                        onKeyDown={(e) => e.stopPropagation()}
                    />
                    <div className="position-absolute top-50 end-0 translate-middle-y pe-3">
                        <img src={searchIcon} alt="search" />
                    </div>
                </div>

                {/* Country list */}
                <div className="list-group list-group-flush">
                    {countries.map((c) => {
                        const parsed = parseCountry(c);
                        return (
                            <button
                                key={parsed.iso2}
                                type="button"
                                onClick={() => {
                                    setIsOpen(false);
                                    setCountry(parsed.iso2);
                                }}
                                className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                            >
                                <div className="d-flex align-items-center">
                                    <FlagImage iso2={parsed.iso2} className="me-2" />
                                    <span className="small fw-medium">{parsed.name}</span>
                                </div>
                                <span className="fw-medium">+{parsed.dialCode}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>

    )
}

export default SelectPhoneNew;