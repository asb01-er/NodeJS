const httpStatus = require("http-status-codes");
const contentTypes = require("./contentTypes");
const utils = require("./utils");

const routes = {
    "GET": {},
    "POST": {}
};

exports.handle = (req, res) => {
    try {
        const route = routes[req.method][req.url];

        if (route) {
            return route(req, res);  // ✅ Return to prevent fallthrough
        }

        // ✅ Handle 404 if no route matched
        res.writeHead(httpStatus.NOT_FOUND, contentTypes.html);
        utils.getFile("views/error.html", res);

    } catch (e) {
        console.error("Router Error:", e);

        if (!res.headersSent) {  // ✅ Avoid double-send
            res.writeHead(httpStatus.INTERNAL_SERVER_ERROR, contentTypes.html);
            utils.getFiles("views/error.html", res);
        }
    }
};

exports.get = (url, action) => {
    routes["GET"][url] = action;
};

exports.post = (url, action) => {
    routes["POST"][url] = action;
};
