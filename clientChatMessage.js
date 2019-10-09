let grpc = require("grpc");
var protoLoader = require("@grpc/proto-loader");

const protoPaths = [
    "protos/chatMessage.proto"
]
//Load the protobuf
var proto = grpc.loadPackageDefinition(
    protoLoader.loadSync(protoPaths, {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    })
);

const REMOTE_SERVER = "0.0.0.0:5001";

//Create gRPC client
let client = new proto.chat.ChatMessage(
    REMOTE_SERVER,
    grpc.credentials.createInsecure()
);

client.RequestTransfer(
    {
        // split_bill_header_id: '123'
    }
    , (err, res) => { console.log("res", res) });


