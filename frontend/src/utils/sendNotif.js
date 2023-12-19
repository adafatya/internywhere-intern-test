function sendNotif (setNotif, title, message) {
    setNotif({
        title: title,
        message: message,
        isActive: true
    })
}

module.exports = {sendNotif}