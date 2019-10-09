const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const grpcServer = new grpc.Server();

const grpcServicePath = ['protos/chatMessage.proto'];

//Load the protobuf
const proto = grpc.loadPackageDefinition(
    protoLoader.loadSync(grpcServicePath, {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    })
);

function RequestTransfer(payload, callback) {
    console.log("run===>")
    callback(null, {
        result: 1
    });
}

// Define server with the methods and start it

//------- Setup GRPC Server
grpcServer.addService(proto.chat.ChatMessage.service, {
    RequestTransfer
});

grpcServer.bind("0.0.0.0:5001", grpc.ServerCredentials.createInsecure());
grpcServer.start();

// logger.info(`GRPC server started: 192.168.10.7:5001`);

