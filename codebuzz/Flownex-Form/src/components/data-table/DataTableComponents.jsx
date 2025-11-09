import React from 'react'
import DataTable from 'react-data-table-component'
import { loaders } from '../loader/Loader'
import { customStyles } from './DataTableStyle'

const DataTableComponents = ({
    columns,
    currentPageData,
    loader,
    filterDataLength,
    perPage,
    handleRowsPerPageChange,
    handlePageChange,
    onRowClicked,
    pointerOnHover = false,
    // highlightOnHover = false,
    conditionalRowStyles = []
}) => {
    return (
        <>

            <div className="overflow-x-auto w-full">
                <DataTable
                    columns={columns}
                    data={currentPageData}
                    keyField="_rowId"
                    progressPending={loader}
                    progressComponent={loaders.table}
                    noDataComponent={loaders.noDataTable}
                    pagination
                    paginationServer
                    paginationTotalRows={filterDataLength}
                    paginationPerPage={perPage}
                    onChangeRowsPerPage={handleRowsPerPageChange}
                    onChangePage={handlePageChange}
                    customStyles={customStyles}
                    responsive
                    onRowClicked={onRowClicked}        // 👈 hook row click
                    pointerOnHover={pointerOnHover} // 👈 makes cursor pointer
                    conditionalRowStyles={conditionalRowStyles}
                // highlightOnHover={highlightOnHover}
                // theme='blackTheme'
                />
            </div>

        </>
    )
}

export default DataTableComponents