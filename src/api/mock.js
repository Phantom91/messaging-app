import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as data from './data';

const mock = new MockAdapter(axios);

const simulateNewConversation = (reqData) => {
	const conversations = JSON.parse(data.conversation);
	const lastId = conversations[conversations.length - 1].id;
    const { from, message } = typeof reqData.data === 'string' ? JSON.parse(reqData.data) : reqData.data;
	return {
		id: lastId + 1,
		from,
		message,
		date: new Date()
	};
};

mock.onGet('/conversation').reply(200, data.conversation);

mock.onGet('/me').reply(200, data.currentUser);

mock.onPost('/simulate-reply').reply(async (reqData) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				status: 200,
				data: {
					...simulateNewConversation(reqData)
				},
				config: {}
			});
		}, 500);
	});
});

export { axios, simulateNewConversation };
