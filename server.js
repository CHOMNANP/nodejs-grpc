let grpc = require("grpc");
var protoLoader = require("@grpc/proto-loader");

const server = new grpc.Server();
const SERVER_ADDRESS = "0.0.0.0:5001";

const chatProtoPath = "protos/chat.proto";
const serviceProtoPath = "protos/service.proto";

//Load the protobuf
var proto = grpc.loadPackageDefinition(
    protoLoader.loadSync([chatProtoPath, serviceProtoPath], {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    })
);

// Receive message from client joining
function join(call, callback) {
    const resPayload = {
        msg: [
            { user: call.request.user, text: "new user joined ..." },
            { user: call.request.user, text: "second line" }
        ],
        activeUser: { name: "Punleu" },
        inactiveUser: [{ name: "kako" }, { name: "kiki" }]
    };


    console.log(resPayload, callback)
    callback(null, resPayload);

}

// Receive message from client
function send(call, callback) {
    // console.log("message recieved", call.request);
}

function bidirectionalStreamingMethod(call) {
    call.on('data', (request) => {
        // handle request
        call.write('Ohh man, this is response');
        console.log("got data: ", request);
    });

    call.on('end', () => {
        console.log("ended==>");
        call.end();
    });
}

// Define server with the methods and start it
server.addService(proto.demo.Chat.service, { join: join, send: send });
server.addService(proto.multi.Service.service, { bidirectionalStreamingMethod: bidirectionalStreamingMethod });

server.bind(SERVER_ADDRESS, grpc.ServerCredentials.createInsecure());

server.start();

const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
    ctx.body = 'Hello World';
});

app.listen(3000);