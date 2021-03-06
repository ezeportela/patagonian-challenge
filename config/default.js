const env = (name) => process.env[name];

module.exports = {
  api_port: env('PORT') || 3000,
  mongo_port: env('MONGO_PORT') || 4000,

  csv_columns: [
    'uuid',
    'vin',
    'make',
    'model',
    'mileage',
    'year',
    'price',
    'zip_code',
    'create_date',
    'update_date',
  ],

  chunk_size: 10000,
};
