"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var PORT = 3001;
var HOST = '/api';
var app = express_1.default();
app.get(HOST + "/airport", function (req, res) {
    console.log(HOST + "/airport");
    res.header('Access-Control-Allow-Origin', '*');
    res.json([
        { name: 'airport_name_1', iata: 'airport_iata_1' },
        { name: 'airport_name_2', iata: 'airport_iata_2' },
        { name: 'airport_name_3', iata: 'airport_iata_3' },
        { name: 'airport_name_4', iata: 'airport_iata_4' },
        { name: 'airport_name_5', iata: 'airport_iata_5' },
    ]);
});
app.listen(PORT, function () {
    console.log("\u0421\u0435\u0440\u0432\u0435\u0440 \u043D\u0430 " + PORT + " \u043F\u043E\u0440\u0442\u0443.");
});
