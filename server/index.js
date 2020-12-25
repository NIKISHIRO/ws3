"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var api_data_1 = require("./api/api.data");
var lodash_1 = require("lodash");
var PORT = 3001;
var HOST = '/api';
var app = express_1.default();
var airports = {
    kazan: { name: 'Kazan', iata: 'KZN' },
    moscow: { name: 'Moscow', iata: 'SVO' },
};
app.get(HOST + "/airport", function (req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    console.log(HOST + "/airport");
    res.json([
        { name: airports.kazan.name, iata: airports.kazan.iata },
        { name: airports.moscow.name, iata: airports.moscow.iata },
    ]);
});
app.get(HOST + "/flight", function (request, response) {
    response.header('Access-Control-Allow-Origin', '*');
    var query = request.query, _a = request.query, from = _a.from, to = _a.to, date1 = _a.date1, date2 = _a.date2, passengers = _a.passengers;
    console.log(HOST + "/flight", query);
    /*
    * Если пользователь не указал дату возвращения обратно (Returning),
    * то список рейсов должен включать в себя только перелеты из точки А в точку В.
    * */
    if (!date2)
        return response.json(lodash_1.omit(api_data_1.flightsData, 'data.flights_back'));
    response.json(api_data_1.flightsData);
});
app.listen(PORT, function () {
    console.log("\u0421\u0435\u0440\u0432\u0435\u0440 \u043D\u0430 " + PORT + " \u043F\u043E\u0440\u0442\u0443.");
});
