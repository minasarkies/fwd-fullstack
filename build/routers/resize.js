"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var jimp_1 = __importDefault(require("jimp"));
var resizeR = express_1.default.Router(); //Creating an express router obj
resizeR.get("/resize/:imgname/:width?/:height?", // Here we are retreveing our image name, and dimensions from the encoded url, alternatively the default dimentions if not places are 1280*720
function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var imgName, newWidth, newHeight, img;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                imgName = req.params.imgname;
                newWidth = parseInt(req.params.width) || 720;
                newHeight = parseInt(req.params.height) || 1280;
                if (!(!fs_1.default.existsSync("./src/images/full/".concat(imgName, ".jpg")))) return [3 /*break*/, 1];
                console.log("no image with name: '".concat(imgName, "' was found"));
                res
                    .status(404)
                    .send("No image with this name was found, Please enter a valid filename in the URL");
                return [3 /*break*/, 5];
            case 1:
                if (!!(fs_1.default.existsSync("images_out/".concat(imgName, "_").concat(newWidth, "_").concat(newHeight, ".png")))) return [3 /*break*/, 4];
                console.log("Now resizing...");
                return [4 /*yield*/, jimp_1.default.read("./src/images/full/".concat(imgName, ".jpg"))];
            case 2:
                img = _a.sent();
                img.resize(newWidth, newHeight); // Next we resize the image based on the recieved dimentions
                return [4 /*yield*/, img.writeAsync("./images_out/".concat(imgName, "_").concat(newWidth, "_").concat(newHeight, ".png"))];
            case 3:
                _a.sent(); // Finally the file is saved to an image_out dir
                res.sendFile("".concat(imgName, "_").concat(newWidth, "_").concat(newHeight, ".png"), {
                    root: path_1.default.join(__dirname, "./images_out"),
                });
                return [3 /*break*/, 5];
            case 4:
                console.log("This image with this size already existed");
                res.sendFile("".concat(imgName, "_").concat(newWidth, "_").concat(newHeight, ".png"), {
                    root: path_1.default.join(__dirname, "../../images_out"),
                });
                _a.label = 5;
            case 5: return [2 /*return*/];
        }
    });
}); });
exports.default = resizeR;
