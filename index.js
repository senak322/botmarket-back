const TelegramBot = require("node-telegram-bot-api");

const token = "6537000218:AAGorXhX46H45K1kpt1W1MpdnCBuZwGwero";

const bot = new TelegramBot(token, { polling: true });
const webAppUrl = 'https://lucky-eclair-504d7b.netlify.app'

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === '/start') {
    await bot.sendMessage(chatId, 'Ниже появится кнопка, нажми её', {
        reply_markup: {
            keyboard: [
                [{text: 'Заполнить форму', web_app: {url: webAppUrl + '/form'}}]
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

  if(msg?.web_app_data?.data) {
    try {
        const data = JSON.parse(msg?.web_app_data?.data)
        console.log(data);
        await bot.sendMessage(chatId, 'Данные приняты, ждем подтверждение')
        await bot.sendMessage(chatId, 'Ваша страна: ' + data.country)
        await bot.sendMessage(chatId, 'Ваша улица: ' + data.street)

        setTimeout( async () => {
            await bot.sendMessage(chatId, 'Дальнейшую информацию вы получите в этом чате')
        }, 2000)
    } catch (error) {
        console.log(error);
    }
  }
});
