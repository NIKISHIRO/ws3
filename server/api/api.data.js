"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingData = exports.flightsData = void 0;
var flightsToData = [
    {
        flight_id: 2,
        flight_code: "FP1200",
        from: {
            city: "Kazan",
            airport: "Kazan",
            iata: "KZN",
            date: "2020-10-01",
            time: "12:00"
        },
        to: {
            city: "Moscow",
            airport: "Sheremetyevo",
            iata: "SVO",
            date: "2020-10-01",
            time: "13:35"
        },
        cost: 9500,
        availability: 156
    },
    {
        flight_id: 14,
        flight_code: "FP 1201",
        from: {
            city: "Kazan",
            airport: "Kazan",
            iata: "KZN",
            date: "2020-10-01",
            time: "08:35"
        },
        to: {
            city: "Moscow",
            airport: "Sheremetyevo",
            iata: "SVO",
            date: "2020-10-01",
            time: "10:05"
        },
        cost: 10500,
        availability: 156
    }
];
var flightBackData = [
    {
        flight_id: 1,
        flight_code: "FP 2100",
        from: {
            city: "Moscow",
            airport: "Sheremetyevo",
            iata: "SVO",
            date: "2020-10-10",
            time: "08:35"
        },
        to: {
            city: "Kazan",
            airport: "Kazan",
            iata: "KZN",
            date: "2020-10-10",
            time: "10:05"
        },
        cost: 10500,
        availability: 156
    },
    {
        flight_id: 13,
        flight_code: "FP 2101",
        from: {
            city: "Moscow",
            airport: "Sheremetyevo",
            iata: "SVO",
            date: "2020-10-10",
            time: "12:00"
        },
        to: {
            city: "Kazan",
            airport: "Kazan",
            iata: "KZN",
            date: "2020-10-10",
            time: "13:35"
        },
        cost: 12500,
        availability: 156
    }
];
exports.flightsData = {
    data: {
        flights_to: flightsToData,
        flights_back: flightBackData,
    }
};
exports.bookingData = {
    code: '',
    cost: 0,
    flights: [
        {
            flight_id: 1,
            flight_code: "FP2100",
            from: {
                city: "Moscow",
                airport: "Sheremetyevo",
                iata: "SVO",
                date: "2020-10-01",
                time: "08:35"
            },
            to: {
                city: "Kazan",
                airport: "Kazan",
                iata: "KZN",
                date: "2020-10-01",
                time: "10:05"
            },
            cost: 10500,
            availability: 56
        },
        {
            flight_id: 2,
            flight_code: "FP1200",
            from: {
                city: "Kazan",
                airport: "Kazan",
                iata: "KZN",
                date: "2020-10-12",
                time: "12:00"
            },
            to: {
                city: "Moscow",
                airport: "Sheremetyevo",
                iata: "SVO",
                date: "2020-10-12",
                time: "13:35"
            },
            cost: 9500,
            availability: 56
        }
    ],
    passengers: [
        {
            id: 1,
            first_name: "Ivan",
            last_name: "Ivanov",
            birth_date: "1990-02-20",
            document_number: "1234567890",
            place_from: "7B",
            place_back: null
        },
        {
            id: 2,
            first_name: "Ivan",
            last_name: "Larin",
            birth_date: "1990-03-20",
            document_number: "1224567890",
            place_from: null,
            place_back: null
        },
    ]
};
