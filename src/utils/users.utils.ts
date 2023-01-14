import * as http from 'http';
import users from "../../users.db.json";
import { promises as fs } from 'fs';
import path from 'path';
import { IUser } from "../models/users";

export const getAll = () => {
	return new Promise((resolve, reject) => {
		if (users) {
			resolve(users);
		} else {
			reject();
		}
	})
}

export const saveNewUserData = async (userData: IUser): Promise<void> => {
	const filePath = path.resolve(__dirname, '../../users.db.json');

	const data = await fs.readFile(filePath, 'utf8');
	const jsonData = JSON.parse(data);
	jsonData.push(userData);

	await fs.writeFile(filePath, JSON.stringify(jsonData));
}

export const getNewUserData = (req: http.IncomingMessage): Promise<string> => {
	return new Promise((resolve, reject) => {
		try {
			let body = '';

			req.on('data', (chank: Buffer) => {
				body += chank.toString();
			});

			req.on('end', () => {
				resolve(body);
			});
		} catch (error) {
			reject(error)
		}
	});
}