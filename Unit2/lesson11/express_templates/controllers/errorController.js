exports.logErrors = (error, req, res) => {
    console.error(error.stack);
};

// 11.3 example
// exports.respondNoResourceFound = (req, res) => {
//     let errorCode = httpStatus.NOT_FOUND;
//     res.status(errorCode);
//     res.send(`${errorCode} | The Page does not exist!`);
// };

exports.respondNoResourceFound = (req, res) => {
    let errorCode = httpStatus.NOT_FOUND;
    res.status(errorCode);
    res.sendFile(`./public/${errorCode}.html`, {
        root: "./"
    });
};

exports.respondInternalError = (error, req, res) => {
    let errorCode = httpStatus_INTERNAL_SERVER_ERROR;
    console.log(`ERROR occurred: ${error.stack}`)
    res.status(errorCode);
    res.send(`${errorCode} | Sorry, our application is experiencing a problem!`);
};