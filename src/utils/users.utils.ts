import users from "../../users.db.json";

export const getAll = () => {
	return new Promise((resolve, reject) => {
		if (users) {
			resolve(users);
		} else {
			reject();
		}
	})
}