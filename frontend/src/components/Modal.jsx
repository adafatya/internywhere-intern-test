function Modal ({title, content, onConfirm, onClose, isActive}) {
    return (
        <div className={`modal ${(isActive? 'is-active':'')}`}>
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title"> {title} </p>
                    <button className="delete" aria-label="close" onClick={onClose}></button>
                </header>
                <section className="modal-card-body">
                    {content}
                </section>
                <footer className="modal-card-foot">
                    <button className="button is-success" onClick={onConfirm}> Confirm </button>
                    <button className="button is-danger" onClick={onClose}> Cancel </button>
                </footer>
            </div>
        </div>
    )
}

module.exports = {Modal}