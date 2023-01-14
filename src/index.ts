import * as http from 'http';
import dotenv from 'dotenv';
import { getAllUsers } from './controllers/users.controller';
import { isUUID } from './utils/server.utils';
import { showInformationAboutResponse } from './utils/server.utils';

dotenv.config();

const PORT = Number(process.env.PORT);

const server = http.createServer((req, res) => {
	if (req.url === '/api/users' && req.method === 'GET') {
		getAllUsers(req, res);
	} else if (req.url?.match(/\/api\/users\/.+/)) {
		const id: string = req.url.split('/')[3];
		if (!isUUID(id)) {
			res.writeHead(400, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify({ message: 'User ID is invalide' }));
			showInformationAboutResponse(req, res);
		} else {
			if (req.method === 'GET') {
				console.log('GET with ID');
			} else if (req.method === 'PUT') {
				console.log('PUT with ID');
			} else if (req.method === 'DELETE') {
				console.log('DELETE with ID');
			}
		}
	}
	else {
		res.writeHead(404, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify({ message: 'Route Not Found' }));
	}
})

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
