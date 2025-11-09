import { ChevronDown, X } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

const SelectInput = ({
    options,
    value,
    onChange,
    placeholder = "Select...",
    searchable = false,
    readOnly = false,
}) => {

    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const selectRef = useRef(null);

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    const handleOptionClick = (option) => {
        const optionValue = typeof option === "string" ? option : option.value;
        onChange(optionValue);
        setIsOpen(false);
        setSearch("");
    };

    const handleOutsideClick = (event) => {
        if (selectRef.current && !selectRef.current.contains(event.target)) {
            setIsOpen(false);
            setSearch("");
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleOutsideClick);
        return () => document.removeEventListener("click", handleOutsideClick);
    }, []);

    const normalizedOptions = options.map((opt) =>
        typeof opt === "string" ? { value: opt, label: opt } : opt
    );

    const filteredOptions = normalizedOptions.filter((opt) =>
        opt.label.toLowerCase().includes(search.toLowerCase())
    );

    const selectedOption = normalizedOptions.find((opt) => opt.value === value);
    const displayValue = selectedOption ? selectedOption.label : placeholder;
    const isPlaceholder = !selectedOption;

    return (
        // <div ref={selectRef} className="relative w-full">
        //     <button
        //         type="button"
        //         onClick={toggleDropdown}
        //         className="w-full flex items-center justify-between py-2 px-3 bg-white border rounded cursor-pointer focus:outline-none"
        //     >
        //         <span
        //             className={`${isPlaceholder ? "text-gray-400 italic" : "text-gray-700"
        //                 } truncate`}
        //         >
        //             {displayValue}
        //         </span>

        //         <div className="flex items-center gap-2">
        //             {value && (
        //                 <X
        //                     onClick={(e) => {
        //                         e.stopPropagation();
        //                         onChange("");
        //                     }}
        //                     className="h-4 w-4 text-gray-400 hover:text-red-500 cursor-pointer"
        //                 />
        //             )}
        //             <ChevronDown
        //                 className={`h-4 w-4 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""
        //                     }`}
        //             />
        //         </div>
        //     </button>

        //     {isOpen && (
        //         <div className="absolute left-0 w-full mt-1 bg-white border rounded-md shadow-lg z-10">
        //             {searchable && (
        //                 <div className="p-2 border-b">
        //                     <input
        //                         type="text"
        //                         value={search}
        //                         onChange={(e) => setSearch(e.target.value)}
        //                         placeholder="Search..."
        //                         className="w-full border rounded px-2 py-1 text-sm outline-none"
        //                     />
        //                 </div>
        //             )}

        //             <ul className="max-h-48 overflow-y-auto">
        //                 {(searchable ? filteredOptions : normalizedOptions).length > 0 ? (
        //                     (searchable ? filteredOptions : normalizedOptions).map((opt) => {
        //                         const isSelected = value === opt.value;
        //                         return (
        //                             <li
        //                                 key={opt.value}
        //                                 onClick={() => handleOptionClick(opt)}
        //                                 className={`px-3 py-2 cursor-pointer ${isSelected
        //                                     ? "bg-blue-100 text-blue-700 font-medium"
        //                                     : "text-gray-700 hover:bg-gray-100"
        //                                     }`}
        //                             >
        //                                 {opt.label}
        //                             </li>
        //                         );
        //                     })
        //                 ) : (
        //                     <li className="px-3 py-2 text-gray-400 italic">No results</li>
        //                 )}
        //             </ul>
        //         </div>
        //     )}
        // </div>
        <div ref={selectRef} className="position-relative w-100 selectinput">
            <button
                type="button"
                onClick={toggleDropdown}
                className="bg-transparent d-flex justify-content-between align-items-center w-100 text-start"
            >
                <span className={`${isPlaceholder ? "text-muted fst-italic" : ""} text-truncate`}>
                    {displayValue}
                </span>

                <div className="d-flex align-items-center gap-2">
                    {value && (
                        <X
                            onClick={(e) => {
                                e.stopPropagation();
                                onChange("");
                            }}
                            className="text-muted hover:text-danger"
                            style={{ cursor: "pointer", height: "16px", width: "16px" }}
                        />
                    )}
                    <ChevronDown
                        className={`text-secondary transition-transform ${isOpen ? "rotate-180" : ""}`}
                        style={{ height: "16px", width: "16px" }}
                    />
                </div>
            </button>

            {isOpen && (
                <div className="position-absolute start-0 w-100 mt-1 bg-white border rounded shadow overflow-auto" style={{ zIndex: 1000, maxHeight: "200px" }}>
                    {searchable && (
                        <div className="p-2 border-bottom">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search..."
                                className="form-control form-control-sm"
                            />
                        </div>
                    )}

                    <ul className="list-unstyled m-0 p-0">
                        {(searchable ? filteredOptions : normalizedOptions).length > 0 ? (
                            (searchable ? filteredOptions : normalizedOptions).map((opt) => {
                                const isSelected = value === opt.value;
                                return (
                                    <li
                                        key={opt.value}
                                        onClick={() => handleOptionClick(opt)}
                                        className={`px-3 py-2 ${isSelected ? "bg-primary text-white fw-bold" : "text-dark"} ${!isSelected ? "hover-bg-light" : ""}`}
                                        style={{ cursor: "pointer" }}
                                    >
                                        {opt.label}
                                    </li>
                                );
                            })
                        ) : (
                            <li className="px-3 py-2 text-muted fst-italic">No results</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default SelectInput;



