/*jshint esversion: 6 */
var express = require('express');
var path = require("path");
var app = express();
let net = require('net');
module.exports = {
    run: function() {
        //var ws = require("nodejs-websocket");

        app.use(express.static('.'));

        app.get('/controller', function(req, res) {
            //res.send('Hello World!');
            res.sendFile(path.join(__dirname + '/controller.html'));
        });

        app.get('/tablet', function(req, res) {
            res.sendFile(path.join(__dirname + '/tablet.html'));
        });

        app.listen(8080, function() {
            console.log('Listening on port 8080!');
        });

        /* websockets */

        const WebSocket = require('ws');
        const wss = new WebSocket.Server({ port: 8082 });

        function send(target, json) {
            console.log('sending:', json);
            target.send(JSON.stringify(json));
        }

        let tablet, controller;
        wss.on('connection', function(ws) {
            ws.on('message', function(txt) {
                console.log('received: %s', txt);
                message = JSON.parse(txt);
                if (message.hasOwnProperty('whoami')) {
                    if (message.whoami == 'controller')
                        controller = ws;
                    else if (message.whoami == 'tablet')
                        tablet = ws;
                    console.log({
                        cu: controller === undefined,
                        tu: tablet === undefined,
                        cw: controller == ws,
                        tw: tablet == ws
                    })
                    if (tablet == ws)
                        if (controller !== undefined) {
                            send(controller, { ready: true });
                            send(tablet, { ready: true });
                        }
                    if (controller == ws)
                        if (tablet !== undefined) {
                            send(tablet, { ready: true });
                            send(controller, { ready: true });
                        }
                }
                if (message.hasOwnProperty('text')) {
                    if (tablet !== undefined) {
                        send(tablet, { text: message.text });
                    }
                }
            });
            console.log('new user');
            ws.on("close", function() {
                if (ws == tablet) {
                    delete tablet;
                    if (controller !== undefined)
                        send(controller, { ready: false });
                }
                if (ws == controller) {
                    delete controller;
                    if (tablet !== undefined)
                        send(tablet, { ready: false });
                }
            });
        });
    }
}

if (require.main === module) {
    module.exports.run();
}
