'use strict';
import "https://deno.land/x/dotenv@v3.2.2/load.ts";
// import { linebot } from "https://deno.land/x/linebot@v1.1.0/mod.ts";
import { Client } from 'npm:@line/bot-sdk';

import { opine, json } from 'https://deno.land/x/opine@1.8.0/mod.ts';

const endpointToWebHook = 'api/webhook';

const LINE_CHANNEL_SECRET = Deno.env.get('LINE_CHANNEL_SECRET')||""
const LINE_CHANNEL_TOKEN = Deno.env.get('LINE_CHANNEL_TOKEN')||""

const bot = new Client({
  channelSecret: LINE_CHANNEL_SECRET,
  channelAccessToken: LINE_CHANNEL_TOKEN,
});
const app = opine();
const linebotParser = bot.

app.post(`/${endpointToWebHook}`, linebotParser);

bot.on('message', async (event:any) => {
   try {
      const result = await event.reply(event.message.text);
      // Do something here as success
      console.log('Success', result);
   } catch (error) {
      // Do something here to deal with error
      console.log('Error', error);
   }
});

const port = parseInt(Deno.env.get('PORT')!) || 80;
app.listen(port, () => console.log('LineBot is running. Port : ' + port));

/*
deno run --allow-env --allow-read  --allow-net main.ts
 */ 