import type { Context } from 'hono';
import mqtt from 'mqtt';
import { ObjectModel } from '../models/objectModel.js'; 

export const changeState = async (c: Context) => {
    console.log('Requête reçue');

    try {
        // Récupérer les données de la requête
        const { object_name, ip_adress } = await c.req.json();
        console.log(`Reçu: object_name=${object_name}, ip_adress=${ip_adress}`);

        // Vérifier les données
        if (!object_name || !ip_adress) {
            return c.json({ error: 'Invalid request data' }, 400);
        }

        // **Récupérer l'objet dans MongoDB**
        const object = await ObjectModel.findOne({ type: object_name });

        if (!object) {
            return c.json({ error: 'Object not found' }, 404);
        }

        // **Déterminer le nouvel état**
        const newState = !object.state; // Inversion de l'état (true -> false, false -> true)
        console.log(`État actuel: ${object.state} | Nouvel état: ${newState}`);

        // **Mettre à jour l'état dans MongoDB**
        object.state = newState;
        await object.save();

        // **Connexion MQTT**
        const mqttClient = mqtt.connect(`mqtt://${ip_adress}:1883`);
        const topic = `lampe/${object_name}`;

        // Attendre la connexion MQTT
        await new Promise<void>((resolve, reject) => {
            mqttClient.on('connect', () => {
                console.log('Connecté à MQTT');
                resolve();
            });

            mqttClient.on('error', (error) => {
                console.error('Erreur MQTT:', error);
                reject(error);
            });
        });

        // **Publier le nouvel état sur MQTT**
        await new Promise<void>((resolve, reject) => {
            mqttClient.publish(topic, newState ? 'ON' : 'OFF', { qos: 1, retain: true }, (error) => {
                mqttClient.end();
                if (error) {
                    console.error('Erreur publication:', error);
                    reject(error);
                } else {
                    console.log(`Nouvel état publié: ${newState ? 'ON' : 'OFF'}`);
                    resolve();
                }
            });
        });

        return c.json({ message: `Lampe ${object_name} changée en ${newState ? 'ON' : 'OFF'}` }, 200);
    } catch (error) {
        console.error('Erreur:', error);
        return c.json({ error: 'Internal Server Error' }, 500);
    }
};