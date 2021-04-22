const env = (name) => process.env[name];

module.exports = {
  api_port: env('PORT') || 3000,

  csv_columns: [
    'UUID',
    'VIN',
    'Make',
    'Model',
    'Mileage',
    'Year',
    'Price',
    'Zip Code',
    'Create Date',
    'Update Date',
  ],
};
