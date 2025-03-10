import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const client = new Client({
  brokerURL: 'ws://localhost:8080/stats', // Remplacez par l'URL de votre serveur WebSocket
  connectHeaders: {},
  onConnect: () => {
    client.subscribe('/topic/systemStats', (message) => {
      const stats = JSON.parse(message.body);
      console.log('Données des statistiques:', stats);
      // Mettez à jour votre UI avec les nouvelles statistiques
    });
  },
});
const socket = new SockJS('/ws');
const stompClient = Stomp.over(socket);

stompClient.connect({}, function() {
    stompClient.subscribe('/topic/systemStats', function(response) {
        console.log("Métriques système en temps réel:", JSON.parse(response.body));
    });
});


client.activate();
