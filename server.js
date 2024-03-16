const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');

dotenv.config();

console.log('DATABASE:', process.env.DATABASE_LOCAL);

const port = process.env.PORT;

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION!! Shutting Down....');
  console.log(err.name, err.message);
  process.exit(1);
});

mongoose
  .connect(process.env.DATABASE_LOCAL, { dbName: 'PE_SDN301m_TrialTest_SE161079DB' })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.listen(port || 4000, () => {
  console.log(`App running on port ${port}....`);
});
