import * as http from 'http';
import { promises as fs } from 'fs';
import path from 'path';
import { IUser, IUserForChange } from "../models/users";

export let userdDB: IUser[] = [];

export const getAll = () => {
	return new Promise((resolve, reject) => {
		if (userdDB) {
			resolve(userdDB);
		} else {
			reject();
		}
	})
}

export const saveNewUserData = async (userData: IUser): Promise<void> => {
	userdDB.push(userData);
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

export const findUserById = async (id: string): Promise<IUser | null> => {
	try {
		const userData = userdDB.find(item => item.id === id);

		if (userData) {
			return userData;
		} else {
			return null;
		}
	} catch (error) {
		console.log(error);
		return null;
	}
}

export const deleteUserById = async (id: string): Promise<IUser[] | null> => {
	try {
		const newArr = userdDB.filter((item) => item.id !== id);

		if (newArr.length === userdDB.length) {
			return null;
		} else {
			userdDB = newArr;
			return newArr;
		}
	} catch (error) {
		console.log(error);
		return null;
	}
}

export const changeUserById = async (id: string, newUserData: IUserForChange) => {
	try {
		let isUser = false;
		const newArr = userdDB.map(item => {
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
			userdDB = newArr;
			return newArr;
		} else {
			return null;
		}
	} catch (error) {
		console.log(error);
		return null;
	}
}