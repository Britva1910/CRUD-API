import * as http from 'http';
import dotenv from 'dotenv';
import users from "../users.db.json";

dotenv.config();

const PORT = Number(process.env.PORT);

const server = http.createServer((req, res) => {
	if (req.url === '/api/users' && req.method === 'GET') {
		res.writeHead(200, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify(users));
	} else {
		res.writeHead(404, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify({ message: 'Route Not Found' }));
	}

})

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
