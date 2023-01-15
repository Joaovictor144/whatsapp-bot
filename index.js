
import { create } from 'venom-bot';
import { Configuration, OpenAIApi } from 'openai';

import dotenv from 'dotenv';

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});

const openai = new OpenAIApi(configuration);

const client = await create();
start(client);

async function getOpenAiResponse(question) {
  const response = await openai.createCompletion({
    prompt: question,
    model: "text-davinci-003",
    max_tokens: 2048
  });
  console.log(response.data.choices)
  return response.data.choices[0].text;
}

const date = new Date();
const time = date.toLocaleTimeString('pt-BR')

function start(client) {
  client.onMessage(async (message) => {
    try{
      const mensageReceive = message.body;

      const firstWord = mensageReceive.substring(0, mensageReceive.indexOf(" "));
      console.log(firstWord)
      console.log(message.chat.groupMetadata)
      if (firstWord === "Bot:") {
        const response = await getOpenAiResponse(mensageReceive);
          const botResponse = `*BOT*: ${response}`
          await client.sendText(message.from, botResponse)
      }

    }catch(err) {
      console.log(err)
    }
   
  });
}


 