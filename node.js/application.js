var server = require("./server"),
    router = require("./route"),
    requestHandlers = require("./requestHandler");

var handle = {}
handle["/index"] = requestHandlers.index;
handle["/admin"] = requestHandlers.admin;
handle["/test"] = requestHandlers.test;
handle["otherExt"] = requestHandlers.otherExt;
handle["/createNewEvent"] = requestHandlers.createNewEvent;
handle["/getAllArticles"] = requestHandlers.getAllArticles;
handle["/getAllEvents"] = requestHandlers.getAllEvents;

var port = 3000;
server.start(router.route, handle, port);