import express from 'express';


const PORT = 3001;
const HOST = '/api';
const app = express();

app.get(`${HOST}/airport`, (req, res) => {
  console.log(`${HOST}/airport`);

  res.header('Access-Control-Allow-Origin', '*');

  res.json([
    { name: 'airport_name_1', iata: 'airport_iata_1' },
    { name: 'airport_name_2', iata: 'airport_iata_2' },
    { name: 'airport_name_3', iata: 'airport_iata_3' },
    { name: 'airport_name_4', iata: 'airport_iata_4' },
    { name: 'airport_name_5', iata: 'airport_iata_5' },
  ]);
});

app.listen(PORT, () => {
  console.log(`Сервер на ${PORT} порту.`);
});
