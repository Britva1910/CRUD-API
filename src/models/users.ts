export interface IUser {
	id: string;
	username: string;
	age: number;
	hobbies: string[];
}

export interface IUserForChange {
	username?: string;
	age?: number;
	hobbies?: string[];
}