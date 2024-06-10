import fs from 'fs';
import mongoose from 'mongoose';

// Подключение к локальной базе данных MongoDB
const url = 'mongodb://localhost:27017/docker-projekt';

// Определение Mongoose схемы и модели
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

// Функция для вычисления средней зарплаты
const calculateAvgSalary = (minSalary, maxSalary) => {
  const min = parseFloat(minSalary);
  const max = parseFloat(maxSalary);
  if (isNaN(min) || isNaN(max)) {
    return '-';
  }
  return (min + max) / 2;
};

// Путь к JSON файлу
const filePath = './data202406.json';

// Основная функция для выполнения всех операций
async function main() {
  try {
    // Подключение к MongoDB
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Подключено к MongoDB");

    // Считывание данных из файла JSON
    const data = fs.readFileSync(filePath, 'utf8');
    const items = JSON.parse(data);

    // Форматирование данных
    const formattedItems = items.map(item => ({
      companyName: item.company || '-',
      location: item.location || '-',
      technology: item.technology || '-',
      seniority: item.seniority || '-',
      avg_Salary: calculateAvgSalary(item['salary employment min'], item['salary employment max']),
      year: '2024',
      month: '06'
    }));

    // Вставка данных в MongoDB
    const result = await Data.insertMany(formattedItems);
    console.log('Данные успешно вставлены в MongoDB:', result.length);

  } catch (err) {
    console.error('Ошибка:', err);
  } finally {
    // Закрытие соединения с MongoDB
    await mongoose.connection.close();
    console.log('Соединение с MongoDB закрыто');
  }
}

// Запуск основной функции
main();
