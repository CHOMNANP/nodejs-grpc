let grpc = require("grpc");
var protoLoader = require("@grpc/proto-loader");

//Load the protobuf
var proto = grpc.loadPackageDefinition(
    protoLoader.loadSync("protos/chat.proto", {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    })
);

const REMOTE_SERVER = "0.0.0.0:5001";

//Create gRPC client
let client = new proto.demo.Chat(
    REMOTE_SERVER,
    grpc.credentials.createInsecure()
);
const username = 'Punleu 1';
client.join({ user: username });
client.send({ user: username, text: 'hello 1' }, res => { });
