let grpc = require("grpc");
var protoLoader = require("@grpc/proto-loader");
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

const REMOTE_SERVER = "0.0.0.0:5001";
// const REMOTE_SERVER = "206.189.157.181:5001";

//Create gRPC client
let clientChat = new proto.demo.Chat(
    REMOTE_SERVER,
    grpc.credentials.createInsecure()
);

let clientService = new proto.multi.Service(
    REMOTE_SERVER,
    grpc.credentials.createInsecure()
);

const username = 'Punleu 1';
clientChat.join({ user: username });
clientChat.send({ user: username, text: 'hello 1' }, res => { });


try {

} catch (ex) {
    console.log("catch error")

}

const multiDirectionCall = clientService.bidirectionalStreamingMethod();

multiDirectionCall.on('data', (response) => {

    console.log("server response back:", multiDirectionCall)
    // handle response
});

multiDirectionCall.on('end', () => {
    console.log("server end")
    // handle end of server
});


multiDirectionCall.on('error', () => {

    console.log("server error")
    // handle end of server
});

// call N times
multiDirectionCall.write({ message: 'hello' });
multiDirectionCall.write({ message: 'hello 2' });
multiDirectionCall.write({ message: 'hello 3' });

// call once
// multiDirectionCall.end();