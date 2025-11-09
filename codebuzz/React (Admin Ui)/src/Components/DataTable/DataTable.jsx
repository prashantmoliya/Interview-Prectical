// DataTable
import { createTheme } from "react-data-table-component";

// Theme
createTheme('blackTheme', {
    text: {
        primary: '#ffffff',
        secondary: '#b2b2b2',
    },
    background: {
        default: '#000000',
    },
    divider: {
        default: '#333333',
    },
    pagination: {
        background: '#000000',
        color: '#ffffff',
    },
    rows: {
        highlightOnHoverBackground: '#333333',
    },
});

// css
export const customStyles = {
    table: {
        style: {
            border: '1px solid rgba(0, 0, 0, 0.2)',
        },
    },
    header: {
        style: {
            backgroundColor: '#101316 !important',
        },
    },
    headCells: {
        style: {
            fontSize: '15px',
            fontWeight: '700',
        },
    },
    cells: {
        style: {
            fontSize: '14px',
            fontWeight: '600',
            whiteSpace: 'pre-wrap !important'
        },
    },
    pagination: {
        style: {
            color: '#000',
            fontSize: '13px',
            fontWeight: '500',
            // backgroundColor: '#000',
            // borderTop: '1px solid rgba(255, 255, 255, 0.2)',
        },
        // pageButtonsStyle: {
        //     color: '#fff',
        //     fill: '#fff',
        //     backgroundColor: 'transparent',
        //     '&:hover': {
        //         backgroundColor: '#333',
        //     },
        //     '&:focus': {
        //         outline: 'none',
        //         backgroundColor: '#444',
        //     },
        //     '&:disabled': {
        //         fill: 'rgba(255, 255, 255, 0.2) ',
        //         color: 'rgba(255, 255, 255, 0.3)',
        //     },
        // },
    },
};





// -------------------------------------------------------------------------------
// Multiple Select-Input

// css  
export const customSelectStyles = {
    control: (provided) => ({
        ...provided,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, .4)',
        color: 'var(--white-text)',
        padding: '0 0 0 0px',
        fontSize: '1rem',
        '&:hover': {
            borderColor: '#555'
        }
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? 'rgba(255, 255, 255, .1)' : '#000',
        color: state.isSelected ? 'white' : 'white',
        fontSize: '1rem',
        '&:hover': {
            backgroundColor: '#555'
        }
    }),
    multiValue: (provided) => ({
        ...provided,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        color: 'var(--white-text)',
        fontSize: '16px',
    }),
    multiValueLabel: (provided) => ({
        ...provided,
        color: 'var(--white-text)',
    }),
    multiValueRemove: (provided) => ({
        ...provided,
        color: 'var(--white-text)',
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            color: 'var(--white-text)',
        }
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        color: 'var(--white-text)'
    }),
    indicatorSeparator: () => ({
        display: 'none'
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: 'black',
        border: '1px solid #333'
    }),
    placeholder: (provided) => ({
        ...provided,
        color: 'var(--white-text)',
    })
};