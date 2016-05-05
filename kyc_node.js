
var client = require('swagger-client');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require("fs");


var api_url = 'http://localhost:5554/rest_api.json';
var recChaincodeId = "mycc";
var reqChaincodeId = "mycc2";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var swagger = new client({
  url: api_url,
  success: function() {
    console.log("Connected to REST API server!\n");
  },
  error: function() {
    console.log("Failed to connect to REST API server.\n");
    console.log("Exiting.\n");
  }
});

/*Record Endpoints*/

app.get('/records/recId/:recId', function (req, res) {
    var chaincodeOpPayload = {
        "jsonrpc": "2.0",
        "method": "query",
        "params" : {
            "type": 1,
            "chaincodeID": {
                "name": recChaincodeId
            },
            "ctorMsg": {
                "function": "recId",
                "args": [req.params.recId]
            }
        },
        "id": 1
    };
    var response = swagger.Chaincode.chaincodeOp({'ChaincodeOpPayload': chaincodeOpPayload},{responseContentType: 'application/json'}, function(Chaincode){
        console.log("record/reqId endpoint called");
        var response = JSON.stringify({
            "Records": Chaincode.obj.result.message
        });
        res.end(response);
    });
});

app.get('/records/name/:name', function (req, res) {
    var chaincodeOpPayload = {
        "jsonrpc": "2.0",
        "method": "query",
        "params" : {
            "type": 1,
            "chaincodeID": {
                "name": recChaincodeId
            },
            "ctorMsg": {
                "function": "searchIndex",
                "args": [req.params.name, "name"]
            }
        },
        "id": 1
    };
    var response = swagger.Chaincode.chaincodeOp({'ChaincodeOpPayload': chaincodeOpPayload},{responseContentType: 'application/json'}, function(Chaincode){
        console.log("record/name endpoint called");
        var response = JSON.stringify({
            "Records": Chaincode.obj.result.message
        });
        res.end(response);
    });
});

app.get('/records/id/:id', function (req, res) {
    var chaincodeOpPayload = {
        "jsonrpc": "2.0",
        "method": "query",
        "params" : {
            "type": 1,
            "chaincodeID": {
                "name": recChaincodeId
            },
            "ctorMsg": {
                "function": "searchIndex",
                "args": [req.params.id, "id"]
            }
        },
        "id": 1
    };
    var response = swagger.Chaincode.chaincodeOp({'ChaincodeOpPayload': chaincodeOpPayload},{responseContentType: 'application/json'}, function(Chaincode){
        console.log("record/id endpoint called");
        var response = JSON.stringify({
            "Records": Chaincode.obj.result.message
        });
        res.end(response);
    });
});

app.get('/records/newRecs/:date', function (req, res) {
    var chaincodeOpPayload = {
        "jsonrpc": "2.0",
        "method": "query",
        "params" : {
            "type": 1,
            "chaincodeID": {
                "name": recChaincodeId
            },
            "ctorMsg": {
                "function": "newRecs",
                "args": [req.params.date]
            }
        },
        "id": 1
    };
    var response = swagger.Chaincode.chaincodeOp({'ChaincodeOpPayload': chaincodeOpPayload},{responseContentType: 'application/json'}, function(Chaincode){
        console.log("record/newRecs endpoint called");
        var response = JSON.stringify({
            "Records": Chaincode.obj.result.message
        });
        res.end(response);
    });
});

app.post('/records', function (req, res) {
    var chaincodeOpPayload = {
        "jsonrpc": "2.0",
        "method": "invoke",
        "params" : {
            "type": 1,
            "chaincodeID": {
                "name": recChaincodeId
            },
            "ctorMsg": {
                "function": "addRec",
                "args": [req.body.CustomerId, req.body.CustomerName, req.body.RecordOwner, req.body.EncFor, req.body.EncData, req.body.DateCreated]
            }
        },
        "id": 1
    };
    var response = swagger.Chaincode.chaincodeOp({'ChaincodeOpPayload': chaincodeOpPayload},{responseContentType: 'application/json'}, function(Chaincode){
        console.log("record/newRecs endpoint called");
        var response = JSON.stringify({
            "Records": Chaincode.obj.result
        });
        res.end(response);
    });
});

/*app.post('/records/:custId/:custName/:recOwner/:encFor/:encData/:dateCreated', function (req, res) {
    var chaincodeOpPayload = {
        "jsonrpc": "2.0",
        "method": "invoke",
        "params" : {
            "type": 1,
            "chaincodeID": {
                "name": recChaincodeId
            },
            "ctorMsg": {
                "function": "addRec",
                "args": [req.params.custId, req.params.custName, req.params.recOwner, req.params.encFor, req.params.encData, req.params.dateCreated]
            }
        },
        "id": 1
    };
    var response = swagger.Chaincode.chaincodeOp({'ChaincodeOpPayload': chaincodeOpPayload},{responseContentType: 'application/json'}, function(Chaincode){
        console.log("record/newRecs endpoint called");
        var response = JSON.stringify({
            "Records": Chaincode
        });
        res.end(response);
    });
});*/

/*Request Endpoints*/

app.get('/requests/reqId/:reqId', function (req, res) {
    var chaincodeOpPayload = {
        "jsonrpc": "2.0",
        "method": "query",
        "params" : {
            "type": 1,
            "chaincodeID": {
                "name": reqChaincodeId
            },
            "ctorMsg": {
                "function": "reqId",
                "args": [req.params.reqId]
            }
        },
        "id": 1
    };
    var response = swagger.Chaincode.chaincodeOp({'ChaincodeOpPayload': chaincodeOpPayload},{responseContentType: 'application/json'}, function(Chaincode){
        console.log("request/reqId endpoint called");
        var response = JSON.stringify({
            "Records": Chaincode.obj.result.message
        });
        res.end(response);
    });
});

app.get('/requests/for/:for', function (req, res) {
    var chaincodeOpPayload = {
        "jsonrpc": "2.0",
        "method": "query",
        "params" : {
            "type": 1,
            "chaincodeID": {
                "name": reqChaincodeId
            },
            "ctorMsg": {
                "function": "searchIndex",
                "args": [req.params.for,"for"]
            }
        },
        "id": 1
    };
    var response = swagger.Chaincode.chaincodeOp({'ChaincodeOpPayload': chaincodeOpPayload},{responseContentType: 'application/json'}, function(Chaincode){
        console.log("requests/for endpoint called");
        var response = JSON.stringify({
            "Records": Chaincode.obj.result.message
        });
        res.end(response);
    });
});

app.get('/requests/by/:by', function (req, res) {
    var chaincodeOpPayload = {
        "jsonrpc": "2.0",
        "method": "query",
        "params" : {
            "type": 1,
            "chaincodeID": {
                "name": reqChaincodeId
            },
            "ctorMsg": {
                "function": "searchIndex",
                "args": [req.params.by,"by"]
            }
        },
        "id": 1
    };
    var response = swagger.Chaincode.chaincodeOp({'ChaincodeOpPayload': chaincodeOpPayload},{responseContentType: 'application/json'}, function(Chaincode){
        console.log("requests/by endpoint called");
        var response = JSON.stringify({
            "Records": Chaincode.obj.result.message
        });
        res.end(response);
    });
});

app.get('/requests/newReqs/:date', function (req, res) {
    var chaincodeOpPayload = {
        "jsonrpc": "2.0",
        "method": "query",
        "params" : {
            "type": 1,
            "chaincodeID": {
                "name": reqChaincodeId
            },
            "ctorMsg": {
                "function": "newReqs",
                "args": [req.params.date]
            }
        },
        "id": 1
    };
    var response = swagger.Chaincode.chaincodeOp({'ChaincodeOpPayload': chaincodeOpPayload},{responseContentType: 'application/json'}, function(Chaincode){
        console.log("requests/newReqs endpoint called");
        var response = JSON.stringify({
            "Records": Chaincode.obj.result.message
        });
        res.end(response);
    });
});

app.post('/requests', function (req, res) {
    var chaincodeOpPayload = {
        "jsonrpc": "2.0",
        "method": "invoke",
        "params" : {
            "type": 1,
            "chaincodeID": {
                "name": reqChaincodeId
            },
            "ctorMsg": {
                "function": "addReq",
                "args": [req.body.RecordId, req.body.RequestBy, req.body.DateCreated]
            }
        },
        "id": 1
    };
    var response = swagger.Chaincode.chaincodeOp({'ChaincodeOpPayload': chaincodeOpPayload},{responseContentType: 'application/json'}, function(Chaincode){
        console.log("requests endpoint called");
        var response = JSON.stringify({
            "Records": Chaincode.obj.result
        });
        res.end(response);
    });
});

app.post('/requests/giveAccess', function (req, res) {
    var chaincodeOpPayload = {
        "jsonrpc": "2.0",
        "method": "invoke",
        "params" : {
            "type": 1,
            "chaincodeID": {
                "name": reqChaincodeId
            },
            "ctorMsg": {
                "function": "giveAccess",
                "args": [req.body.RequestId, req.body.EncryptedData, req.body.DateCreated]
            }
        },
        "id": 1
    };
    var response = swagger.Chaincode.chaincodeOp({'ChaincodeOpPayload': chaincodeOpPayload},{responseContentType: 'application/json'}, function(Chaincode){
        console.log("requests/giveAccess endpoint called");
        var response = JSON.stringify({
            "Records": Chaincode.obj.result
        });
        res.end(response);
    });
});

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port
  console.log("App listening at http://%s:%s", host, port)

});