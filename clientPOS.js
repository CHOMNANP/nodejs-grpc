let grpc = require("grpc");
var protoLoader = require("@grpc/proto-loader");

const chatProtoPath = "protos/chat.proto";
const serviceProtoPath = "protos/service.proto";
const protoPaths = [
    "protos/pos.proto"
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

const REMOTE_SERVER = "0.0.0.0:5002";
// const REMOTE_SERVER = "206.189.157.181:5001";

//Create gRPC client
let clientPayment = new proto.pos.Payment(
    REMOTE_SERVER,
    grpc.credentials.createInsecure()
);

const username = 'Punleu 1';

clientPayment.completePayment({
    merchant_id: 222,
    transaction_number: 2,
    amount: 3,
    currency: 4,
    pos_sale_id: 5,
}, res => {
    console.log(res)
});
