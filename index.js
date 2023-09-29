const TelegramBot = require("node-telegram-bot-api");

const token = "6537000218:AAGorXhX46H45K1kpt1W1MpdnCBuZwGwero";

const bot = new TelegramBot(token, { polling: true });
const webAppUrl = 'https://lucky-eclair-504d7b.netlify.app/'

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === '/start') {
    await bot.sendMessage(chatId, 'Ниже появится кнопка, нажми её', {
        reply_markup: {
            keyboard: [
                [{text: 'Заполнить форму', web_app: {url: webAppUrl}}]
            ]
        }
    });
    await bot.sendMessage(chatId, 'Заходи в наш интернет магазин по кнопке ниже', {
        reply_markup: {
            inline_keyboard: [
                [{text: 'Сделать заказ', web_app: {url: webAppUrl}}]
            ]
        }
    });
  }
});
