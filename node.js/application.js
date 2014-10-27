var server = require("./server"),
    router = require("./route"),
    requestHandlers = require("./requestHandler");

var handle = {}
handle["/index.html"] = requestHandlers.index;
handle["/admin.html"] = requestHandlers.admin;
handle["otherExt"] = requestHandlers.otherExt;

var port = 3000;
server.start(router.route, handle, port);