const env = (name) => process.env[name];

module.exports = {
  api_port: env('PORT') || 3000,
};
