function Pagination ({ currentPage, totalPages, onPageChange, selectedLimit, limitOptions, onLimitChange}) {
    const pages = Array.from({length: totalPages}, (value, index) => index+1)

    return (
        <nav className="pagination" role="navigation" aria-label="pagination">
            <div className="field is-grouped">
                <div className="control">
                    <label className="label">Items per page:</label>
                </div>
                <div className="control">
                    <div className="select">
                        <select value={selectedLimit} onChange={(e) => onLimitChange(e.target.value)}>
                            {
                                limitOptions.map((option) => <option key={option} value={option}> {option} </option>)
                            }
                        </select>
                    </div>
                </div>
            </div>
            <div className="control">
                <ul className="pagination-list">
                    {
                        pages.map((page) => ( page === currentPage?
                            <li key={page}>
                                <a className="pagination-link is-current" aria-label={"Page "+page} aria-current="page">
                                    {page}
                                </a>
                            </li> :
                            <li key={page}>
                                <a className="pagination-link" aria-label={"Goto page "+page} onClick={() => onPageChange(page)}>
                                    {page}
                                </a>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </nav>
    )
}

module.exports = {Pagination}