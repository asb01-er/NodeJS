const httpStatus = require("http-status-codes");

// Middleware to log errors to the console
exports.logErrors = (error, req, res, next) => {
    console.error(error.stack);  // Print the error details
    next(error);  // Pass the error to the next error handler
};

// Handle 404 - When user requests a page that doesn't exist
exports.respondNoResourceFound = (req, res) => {
    let errorCode = httpStatus.NOT_FOUND;  // 404 error code
    res.status(errorCode);
    // Send a custom 404 HTML page
    res.sendFile(`./public/${errorCode}.html`, {
        root: "./",  // Look for file from project root
    });
};

// Handle 500 - When something goes wrong on our server
exports.respondInternalError = (error, req, res, next) => {
    let errorCode = httpStatus.INTERNAL_SERVER_ERROR;  // 500 error code
    console.log(`ERROR occurred: ${error.stack}`);
    res.status(errorCode);
    res.send(
        `${errorCode} | Sorry, our application is experiencing a problem!`
    );
};