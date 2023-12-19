const { sendNotif } = require("./sendNotif");

function handleError(setNotif, error) {
    let message = 'Terdapat masalah pada server';
    if (error.message === 'Bad Request') {
        message = 'Terdapat masalah pada input anda';
    }
    sendNotif(
        setNotif,
        error.message,
        message
    );
}

module.exports = {handleError}