import React from 'react'

// Css
import "./Pagination.scss";

// Image
// Light
import LeftLight from "../../assets/images/pagination/left-light.svg";
import RightLight from "../../assets/images/pagination/right-light.svg";
// Dark
import LeftDark from "../../assets/images/pagination/left-dark.svg";
import RightDark from "../../assets/images/pagination/right-dark.svg";

import useThemeMode from '../../hooks/useThemeMode';

const Pagination = ({ pagination, currentPage, onPageChange }) => {

    const ThemeMode = useThemeMode();

    console.log(pagination);

    return (
        <div className='paginate'>
            <nav aria-label="Page navigation example" className='navigation'>
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button
                            type='button'
                            className="page-link d-flex align-items-center"
                            onClick={() => onPageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            <img src={ThemeMode ? LeftLight : LeftDark} alt="Left" className='img-fluid me-2' draggable={false} />

                            Prev
                        </button>
                    </li>

                    {
                        Array.from({ length: pagination?.lastPage }, (_, index) => (
                            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`} >
                                <button type='button' className="page-link cursor-pointer" onClick={() => onPageChange(index + 1)}>
                                    {index + 1}
                                </button>
                            </li>
                        ))
                    }

                    <li className={`page-item ${currentPage === pagination?.lastPage ? 'disabled' : ''}`}>
                        <button
                            type='button'
                            className="page-link d-flex align-items-center"
                            onClick={() => onPageChange(currentPage + 1)}
                            disabled={currentPage === pagination?.lastPage}
                        >
                            Next

                            <img src={ThemeMode ? RightLight : RightDark} alt="Right" className='img-fluid ms-2' draggable={false} />
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Pagination;