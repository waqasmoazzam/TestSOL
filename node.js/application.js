var server = require("./server"),
    router = require("./route"),
    requestHandlers = require("./requestHandler");

var handle = {}
handle["/index"] = requestHandlers.index;
handle["/admin"] = requestHandlers.admin;

var port = 3000;
server.start(router.route, handle, port);