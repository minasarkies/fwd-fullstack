"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importStar(require("express"));
var cors_1 = __importDefault(require("cors")); // simple Cross-origin resource sharing middleware for both express & connect (which is a middleware for an extendable http server framework)
var express_fileupload_1 = __importDefault(require("express-fileupload")); // Simple express middleware to help with file uploads
var resize_1 = __importDefault(require("./routers/resize"));
var exists_1 = __importDefault(require("./routers/exists")); //this is the router to check for availability
var upload_1 = __importDefault(require("./routers/upload"));
var app = (0, express_1.default)(); // Creating an express object
var port = 3000; // Variable port number makes testing or changing the port easier
// Next we will configure somethings into our express object
app.use((0, cors_1.default)());
app.use((0, express_1.json)());
app.use((0, express_1.urlencoded)({ extended: true }));
app.use((0, express_fileupload_1.default)({
    limits: { fileSize: 10 * 1024 * 1024 },
    useTempFiles: true,
    tempFileDir: './temp'
}));
app.get('/', function (req, res) {
    res.send(('Home Page -> Please add the following to the url: /resize or /exists or /upload <br> If no dimensions are specified then the default till be 1024 * 1024'));
});
app.use('/', resize_1.default); // Next the routes are created to created a structured and organized app.
// the paths we will use are: /home, /exists, /upload.
app.use('/exists', exists_1.default);
app.use('/uploads', upload_1.default);
// app.get('/upload', (req: express.Request, res: express.Response): void => {
//   res.status(404).send('Please include a valid filename in the URL');
// });                                                  // Simple ways to ensure nonvalid url errors are handled.
app.get('/resize', function (req, res) {
    res.status(404).send('Please include a valid filename in the URL');
});
app.get('/*', function (req, res) {
    res.status(404).send('404 ERROR');
});
app.listen(port, function () {
    "Server started on localhost:".concat(port);
    console.log("The server has started -> http://localhost:3000/");
});
exports.default = app;
