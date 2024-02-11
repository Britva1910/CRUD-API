import request from 'supertest';
import { server } from '../src/index';
import { IUserForChange } from '../src/models/users';

describe('Scenario - 1 - all values are correct', () => {
	let createdUser: any;
	let createdUserId: string;

	it('GET api/users should return an empty array', async () => {
		const response = await request(server).get('/api/users');
		expect(response.status).toBe(200);
		expect(response.body).toEqual([]);
	});

	it('POST api/users should create a new user', async () => {
		const newUser: IUserForChange = {
			username: "John Doe",
			age: 30,
			hobbies: ["reading", "hiking"]
		}
		const response = await request(server).post('/api/users').send(newUser);
		expect(response.status).toBe(201);
		expect(response.body).toHaveProperty('id');
		createdUser = response.body;
		createdUserId = response.body.id;
	});
	it('GET api/users/:id should return the created user', async () => {
		const response = await request(server).get(`/api/users/${createdUserId}`);
		expect(response.status).toBe(200);
		expect(response.body).toEqual(createdUser);
	});
	it('PUT api/users/:id should update the created user', async () => {
		const updatedUser: IUserForChange = {
			age: 35,
			hobbies: ["reading", "hiking", "traveling"]
		}
		const response = await request(server).put(`/api/users/${createdUserId}`).send(updatedUser);
		expect(response.status).toBe(200);
		expect(response.body[0]).toHaveProperty('id', createdUserId);
		expect(response.body[0]).toMatchObject(updatedUser);
	});
	it('DELETE api/users/:id should delete the created user', async () => {
		const response = await request(server).delete(`/api/users/${createdUserId}`);
		expect(response.status).toBe(204);
	});

	it('GET api/users/:id should not return the deleted user', async () => {
		const response = await request(server).get(`/api/users/${createdUserId}`);
		expect(response.status).toBe(404);
	});
	afterAll(() => {
		server.close();
	});
});