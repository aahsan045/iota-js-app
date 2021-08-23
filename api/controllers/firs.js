"use strict";
const iota_js_1 = require("@iota/iota.js");
const API_ENDPOINT = "http://172.16.21.147";
exports.fir_create = (req, res, next) => {
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });


function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const fs = require('fs')
        const msg = fs.readFileSync('C:/Users/Hira/aaa.png', 'utf8')
  

        const client = new iota_js_1.SingleNodeClient(API_ENDPOINT);
        const myIndex = iota_js_1.Converter.utf8ToBytes("hiraarzoimg");
        for (let i = 0; i < 10; i++) {
            console.log("Sending Data");
            const sendResult = yield iota_js_1.sendData(client, myIndex, iota_js_1.Converter.utf8ToBytes(msg));
            console.log("Received Message Id", sendResult.messageId);
        }
        console.log();
        console.log("Finding messages with index");
        const found = yield client.messagesFind(myIndex);
        if (found && found.messageIds.length > 0) {
            console.log(`Found: ${found.count} of ${found.maxResults}`);
            const firstResult = yield iota_js_1.retrieveData(client, found.messageIds[0]);
            if (firstResult) {
                console.log("First Result");
                console.log("\tIndex: ", iota_js_1.Converter.bytesToUtf8(firstResult.index));
                console.log("\tData: ", firstResult.data ? iota_js_1.Converter.bytesToUtf8(firstResult.data) : "None");
            }
        }
        else {
            console.log("Found no results");
        }
    });
}
run()
    .then(() => console.log("Done"))
    .catch((err) => console.error(err));
};