import { getAll } from "../utils/users.utils";
import * as http from 'http';
import { showInformationAboutResponse } from "../utils/server.utils";

export const getAllUsers = async (req: http.IncomingMessage, res: http.ServerResponse) => {
	try {
		const users = await getAll();
		res.writeHead(200, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify(users));
		showInformationAboutResponse(req, res);
	} catch (error) {
		console.error('Error getting all users:', error);
	}
};