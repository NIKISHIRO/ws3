"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var api_data_1 = require("./api/api.data");
var lodash_1 = require("lodash");
var cors_1 = __importDefault(require("cors"));
var shortid_1 = __importDefault(require("shortid"));
var PORT = 3001;
var HOST = '/api';
var app = express_1.default();
var airports = {
    kazan: { name: 'Kazan', iata: 'KZN' },
    moscow: { name: 'Moscow', iata: 'SVO' },
};
var STORAGE = {
    booking: {},
    users: {},
};
app.use(cors_1.default());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
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
app.post(HOST + "/booking", function (request, response) {
    var _a;
    console.log(HOST + "/booking", request.body);
    var code = 'QSASE';
    STORAGE.booking = (_a = {},
        _a[code] = request.body,
        _a);
    response.json({
        code: code,
    });
});
app.get(HOST + "/booking/:code", function (request, response) {
    var code = request.params.code;
    var booking = STORAGE.booking[code];
    console.log('STORAGE.booking', STORAGE.booking);
    if (!booking) {
        response.statusCode = 422;
        response.json({
            error: {
                code: 422,
                message: 'Validation error',
                errors: ['Код с таким экипажем не найден!'],
            },
        });
    }
    var cost = booking.flights.reduce(function (acc, flight) { return acc + flight.cost; }, 0);
    var data = __assign(__assign({}, booking), { cost: cost, code: code });
    response.json(data);
});
app.get(HOST + "/register", function (req, res) {
    var query = req.query, phone = req.query.phone;
    if (STORAGE.users[phone]) {
        return res.sendStatus(422);
    }
    STORAGE.users[phone] = {
        token: '',
        data: query,
    };
    res.sendStatus(204);
});
app.get(HOST + "/login", function (req, res) {
    var _a = req.query, phone = _a.phone, password = _a.password;
    if (!STORAGE.users[phone] || STORAGE.users[phone].data.password !== password) {
        return res.sendStatus(422);
    }
    var token = shortid_1.default.generate();
    STORAGE.users[phone] = __assign(__assign({}, STORAGE.users[phone]), { token: token });
    res.json({ token: token });
});
app.get(HOST + "/user", function (req, res) {
    console.log('req.headers.authorization', req.headers.authorization);
    var bearerHeader = req.headers.authorization;
    if (!bearerHeader)
        return res.sendStatus(401);
    var bearerToken = bearerHeader.split(' ')[1];
    console.log('STORAGE.users', STORAGE.users);
    var users = Object
        .keys(STORAGE.users)
        .reduce(function (acc, key) {
        console.log('STORAGE.users[key]', STORAGE.users[key]);
        if (STORAGE.users[key].token === bearerToken)
            return __spreadArrays(acc, [
                STORAGE.users[key],
            ]);
        return acc;
    }, []);
    console.log('users', users);
    if (users.length) {
        return res.json(__assign({}, users[0].data));
    }
    return res.sendStatus(401);
});
app.listen(PORT, function () {
    console.log("\u0421\u0435\u0440\u0432\u0435\u0440 \u043D\u0430 " + PORT + " \u043F\u043E\u0440\u0442\u0443.");
});
