import react from 'react';

function PaginationLoader() {
    return (
        <>
            <i className="fa fa-refresh fa-spin fa-3x fa-fw" aria-hidden="true"></i>
            <span className="sr-only">Refreshing...</span>
        </>
    )
}

export default PaginationLoader;