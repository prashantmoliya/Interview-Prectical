import DataNotFoundTable from '../../assets/images/data_not_found.svg';


export const loaders = {
    small:
        <span
            className="spinner-border spinner-border-sm me-2"
            role="status"
            aria-hidden="true"
        ></span>,
    table:
        <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: '20vh' }}
        >
            <div className="spinner-border text-dark" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>,
    noDataTable:
        <div
            className="text-center my-5 d-flex flex-column justify-content-center"
            style={{
                height: 'calc(100vh - 345px)',
            }}
        >
            <div className='mb-5'>
                <img src={DataNotFoundTable} alt="Not Found" className='img-fluid' />
            </div>

            <span
                className=''
                style={{ fontSize: '22px', fontWeight: '600' }}
            >
                Data Not Found
            </span>
        </div >,
}