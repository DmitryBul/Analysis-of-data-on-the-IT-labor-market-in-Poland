import fs from 'fs';
import mongoose from 'mongoose';

const url = 'mongodb://localhost:27017/docker-projekt';

const dataSchema = new mongoose.Schema({
  companyName: { type: String, default: '-' },
  location: { type: String, default: '-' },
  technology: { type: String, default: '-' },
  seniority: { type: String, default: '-' },
  avg_Salary: { type: mongoose.Mixed, default: '-' },
  year: { type: String, default: '2024' },
  month: { type: String, default: '06' }
});

const Data = mongoose.model('Data', dataSchema);

const calculateAvgSalary = (minSalary, maxSalary) => {
  const min = parseFloat(minSalary);
  const max = parseFloat(maxSalary);
  if (isNaN(min) || isNaN(max)) {
    return '-';
  }
  return (min + max) / 2;
};

const filePath = './data202406.json';

async function main() {
  try {
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("MongoDB OK");

    const data = fs.readFileSync(filePath, 'utf8');
    const items = JSON.parse(data);

    const formattedItems = items.map(item => ({
      companyName: item.company || '-',
      location: item.location || '-',
      technology: item.technology || '-',
      seniority: item.seniority || '-',
      avg_Salary: calculateAvgSalary(item['salary employment min'], item['salary employment max']),
      year: '2024',
      month: '06'
    }));

    const result = await Data.insertMany(formattedItems);
    console.log('Dane zapisane MongoDB:', result.length);

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await mongoose.connection.close();
    console.log('Połączenie z MongoDB zamknięte');
  }
}

main();
