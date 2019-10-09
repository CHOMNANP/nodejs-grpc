let grpc = require("grpc");
var protoLoader = require("@grpc/proto-loader");

const protoPaths = [
    "protos/auth.proto"
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

// const REMOTE_SERVER = "0.0.0.0:5001";
// const REMOTE_SERVER = "178.128.124.94:5001";
const REMOTE_SERVER = "grpc-qa.sdigroup.sg";
// const REMOTE_SERVER = "206.189.157.181:5001";

//Create gRPC client
let client = new proto.auth.Authentication(
    REMOTE_SERVER,
    grpc.credentials.createInsecure()
);

const accessToken = "Bearer ZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmhkWFJvWDJsa0lqb3hNREF3TURBd01EQXhMQ0p6ZEdGMGRYTWlPaUpoWTNScGRtVWlMQ0owYjJ0bGJpSTZJalV6YUhvMksxTmxlVkJxWjFoRFFVaEhjalJwUjAxc0swbFphWEIzVWtSVE5tcHNXa0pQWVhZMlRHdFhkbGRuWVZRemRtSlJhMnBaVmt4TmJGcHFSV3BwV1dwUVF6VnpMM0ozT1dSWVZqUldMemc1VlVGblBUMGlMQ0p6WldOeVpYUWlPaUpWTVZkaU5sQnVlVVZuVnpWMmVqUTRhRlZDYlVreFRYUlVSbk55VVVGWU5uSmpMM2hyTDB0cE9GUjVTa2hpY1RKak5ITnBiRTF1WWl0cU1IbEhORzV6VW1wNVUwWkJhRUoySzAxcVFXOWxSelkzUW5RclVUMDlJaXdpYVdGMElqb3hOVFl5TlRjNU5UazFmUS42XzZ6OUtBN2lkRDZLUGhTY0JCdUVReEJfWEV4c3hjVWk4TzBUbDVJcE9z";

client.verifyAuthorization({
    accessToken: accessToken
}, (error, response) => {
    // console.log("response===>", error, response)
    if (error) {
        console.error("This is error", error)
    }
    console.log("response===>", error, response)
}
);