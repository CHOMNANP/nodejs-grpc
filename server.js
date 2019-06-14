let grpc = require("grpc");
var protoLoader = require("@grpc/proto-loader");

const server = new grpc.Server();
const SERVER_ADDRESS = "0.0.0.0:5001";

// Load protobuf
let proto = grpc.loadPackageDefinition(
    protoLoader.loadSync("protos/chat.proto", {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    })
);

// Receive message from client joining
function join(call, callback) {
    console.log({ user: "Server", text: "new user joined ..." })
}

// Receive message from client
function send(call, callback) {
    console.log("message recieved", call.request);
}

// Define server with the methods and start it
server.addService(proto.demo.Chat.service, { join: join, send: send });

server.bind(SERVER_ADDRESS, grpc.ServerCredentials.createInsecure());

server.start();


const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
    ctx.body = 'Hello World';
});

app.listen(3000);