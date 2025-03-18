import fs from 'fs';
import path from 'path';
import OpenAI from "openai";
import Groq from 'groq-sdk';
import { createReadStream } from 'fs';
import { tmpdir } from 'os';

export const processAudioFile = async (audioFile: File) => {
    try {
        const fileName = audioFile.name;
        const validExtensions = ['.mp3', '.wav', '.m4a', '.ogg'];
        const fileExtension = path.extname(fileName).toLowerCase();

        if (!validExtensions.includes(fileExtension)) {
            throw new Error(`Format ${fileExtension} non supporté`);
        }

        const groq = new Groq({
          apiKey: process.env.GROQ_API_KEY,
        });

        const openai = new OpenAI({
          apiKey: process.env.OPENAI_API_KEY,
        });

        const buffer = Buffer.from(await audioFile.arrayBuffer());

        const tempPath = path.join(tmpdir(), audioFile.name);
        await fs.promises.writeFile(tempPath, buffer);
        const stream = createReadStream(tempPath);

        const transcription = await openai.audio.transcriptions.create({
          file: stream,
          model: "whisper-1",
        });

        stream.on('end', () => fs.promises.unlink(tempPath));

        const chatCompletion = await groq.chat.completions.create({
          messages: [
            {
              role: 'system',
              content: `Analyse la phrase pour déterminer si une lampe doit être allumée ou éteinte.
              Renvoie un objet JSON avec exactement ce format: {"name": string, "state": boolean}

              Le champ "name" doit contenir le nom de la lampe ou son lieu, il me faut seulement le nom de la lampe ou le lieu de la lampe.
              Le champ "state" doit être true si la lampe doit être allumée, et false si elle doit être éteinte.

              Les mots comme "allume", "allumer", "éclaire" indiquent que la lampe doit être allumée (state: true).
              Les mots comme "éteins", "éteindre", "désactive" indiquent que la lampe doit être éteinte (state: false).`
            },
            {
              role: 'user',
              content: transcription.text
            }
          ],
          model: 'mistral-saba-24b',
          temperature: 0.1,
          response_format: { "type": "json_object" }
        });

        if (!chatCompletion?.choices[0]?.message?.content) {
          return false;
        }

        const jsonResponse = JSON.parse(chatCompletion.choices[0].message.content);

        return jsonResponse;
    } catch (error) {
        return false;
    }
};
