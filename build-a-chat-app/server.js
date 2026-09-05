import http from 'http';
import fs from 'fs';
import { WebSocketServer, WebSocket } from 'ws';

const PORT = 3001;
const server = http.createServer((req,res)=>{
    fs.readFile('./public/index.html',(err,data)=>{
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            return res.end('Error loading index.html');
        }
        res.writeHead(200,{'content-type':'text/html'});
        res.end(data)
    })
});


const wss = new WebSocketServer({server})
function broadcast(dataObj) {
  const payload = JSON.stringify(dataObj);
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(payload);
    }
  });
}
wss.on('connection',(socket,req)=>{
    const username=new URL(req.url,"http://localhost").searchParams.get("username")
    broadcast({ "type": "system", "text": `${username} joined` })
    socket.on('message',(data)=>{
        try{
            const { username : msgUser, text } = JSON.parse(data)
            broadcast({
                type: 'chat', 
                username :msgUser || username, 
                text 
            })
        }
        catch(err){
            console.error('Failed to parse message:', err);
        }    
    })
    socket.on('close',()=>{
        broadcast({ "type": "system", "text": `${username} left` })
    })
})

server.listen(PORT,()=>{
    console.log(' Chat server running at http://localhost:3001')
})

