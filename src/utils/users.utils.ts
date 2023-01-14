import * as http from 'http';
import users from "../../users.db.json";
import { promises as fs } from 'fs';
import path from 'path';
import { IUser, IUserForChange } from "../models/users";

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
			//TODO add chack to it is JSON file
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

export const findUserById = async (id: string): Promise<IUser | null> => {
	const filePath = path.resolve(__dirname, '../../users.db.json');

	const data = await fs.readFile(filePath, 'utf8');
	const jsonData: IUser[] = JSON.parse(data);

	const userData = jsonData.find(item => item.id === id);

	if (userData) {
		return userData;
	} else {
		return null;
	}
}

export const deleteUserById = async (id: string): Promise<IUser[] | null> => {
	try {
		const filePath = path.resolve(__dirname, '../../users.db.json');
		const data = await fs.readFile(filePath, 'utf8');
		const jsonData: IUser[] = JSON.parse(data);
		const newArr = jsonData.filter((item) => item.id !== id);

		if (newArr.length === jsonData.length) {
			return null;
		} else {
			await fs.writeFile(filePath, JSON.stringify(newArr));
			return newArr;
		}
	} catch (error) {
		console.log(error);
		return null;
	}
}

export const changeUserById = async (id: string, newUserData: IUserForChange) => {
	try {
		const filePath = path.resolve(__dirname, '../../users.db.json');
		const data = await fs.readFile(filePath, 'utf8');
		const jsonData: IUser[] = JSON.parse(data);
		let isUser = false;
		const newArr = jsonData.map(item => {
			if (item.id === id) {
				isUser = true;
				const newData = Object.keys(newUserData)
					.filter(key => key in item)
					.reduce((obj, key) => ({ ...obj, [key]: newUserData[key as keyof IUserForChange] }), {});
				return { ...item, ...newData };
			} else {
				return item;
			}
		});

		if (isUser) {
			await fs.writeFile(filePath, JSON.stringify(newArr));
			return newArr;
		} else {
			return null;
		}
	} catch (error) {
		console.log(error);
		return null;
	}
}