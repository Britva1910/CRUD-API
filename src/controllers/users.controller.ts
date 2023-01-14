import { deleteUserById, findUserById, getAll, getNewUserData, saveNewUserData, changeUserById } from "../utils/users.utils";
import * as http from 'http';
import { showInformationAboutResponse } from "../utils/server.utils";
import { IUser } from "../models/users";
import { v4 as uuidv4 } from 'uuid';


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

export const addUser = async (req: http.IncomingMessage, res: http.ServerResponse) => {
	try {
		const newUserData = await getNewUserData(req);

		const { username, age, hobbies } = JSON.parse(newUserData);

		const newUser: IUser = {
			id: '',
			username,
			age,
			hobbies
		}

		newUser.id = uuidv4();

		if (!Object.values(newUser).some(val => val === undefined)) {
			saveNewUserData(newUser);

			res.writeHead(201, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify(newUser));


			showInformationAboutResponse(req, res);
		} else {
			res.writeHead(400, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify({ message: 'Request does not contain all required fields' }));

			showInformationAboutResponse(req, res);
		}
	}
	catch (error) {
		console.error('Error getting all users:', error); //TODO change error message
	}
}

export const getUserById = async (req: http.IncomingMessage, res: http.ServerResponse, id: string) => {
	try {
		const user = await findUserById(id);

		if (user) {
			res.writeHead(200, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify(user));
		} else {
			res.writeHead(404, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify({ message: 'This user doesn`t exist' }));
		}

		showInformationAboutResponse(req, res);
	} catch (error) {
		console.error('Error getting all users:', error);
	}
};

export const changeUser = async (req: http.IncomingMessage, res: http.ServerResponse, id: string) => {
	try {
		const newUserData = await getNewUserData(req);
		const currentUsersData = await changeUserById(id, JSON.parse(newUserData));

		if (currentUsersData) {
			res.writeHead(202, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify(currentUsersData));
		} else {
			res.writeHead(404, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify({ message: 'This user doesn`t exist' }));
		}

		showInformationAboutResponse(req, res);
	} catch (error) {
		console.error('Error getting all users:', error);
	}
};


export const deleteUser = async (req: http.IncomingMessage, res: http.ServerResponse, id: string) => {
	try {
		const currentUsersData = await deleteUserById(id);

		if (currentUsersData) {
			res.writeHead(202, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify(currentUsersData));
		} else {
			res.writeHead(404, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify({ message: 'This user doesn`t exist' }));
		}

		showInformationAboutResponse(req, res);
	} catch (error) {
		console.error('Error getting all users:', error);
	}
};
