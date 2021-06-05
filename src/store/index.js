import moment from 'moment';
import Vue from 'vue';
import Vuex from 'vuex';
import { axios, simulateNewConversation} from '../api/mock';
import {
	ADD_CONVERSATION,
	SET_CONVERSATIONS,
	SET_CURRENT_USER,
	ROLLBACK_MUTATION
} from './mutations';

Vue.use(Vuex);

const mutationsQueue = [];

const cloneState = (state) => JSON.parse(JSON.stringify(state));

/* eslint-disable no-new */
const store = new Vuex.Store({
	state: {
		user: null,
		conversations: []
	},
	mutations: {
		[SET_CURRENT_USER](state, user) {
			state.user = user;
		},
		[SET_CONVERSATIONS](state, conversations) {
			state.conversations = conversations;
		},
		[ADD_CONVERSATION](state, conversation) {
			const currentState = cloneState(state);
			state.conversations.push(conversation);
			mutationsQueue.push({
				name: `${ADD_CONVERSATION}_${conversation.id}`,
				oldState: currentState,
				newState: state
			});
		},
		[ROLLBACK_MUTATION](state, mutation) {
			for(const k in state) {
				state[k] = mutation.oldState[k];
			}
			// remove mutation from mutation queue
			for(let idx = 0; idx < mutationsQueue.length; idx++) {
				if(mutationsQueue[idx].name === mutation.name) {
					mutationsQueue.splice(idx, 1);
				}
			}
		}
	},
	actions: {
		async loadCurrentUser({ commit }) {
			try {
				const { data } = await axios.get('/me');
				commit(SET_CURRENT_USER, data);
			} catch (err) {
				alert('Error trying to loading user data');
				console.error(err);
			}
		},
		async loadConversations({ commit }) {
			try {
				const { data } = await axios.get('/conversation');
				commit(SET_CONVERSATIONS, data);
			} catch (err) {
				alert('Error trying to loading conversations');
				console.error(err);
			}
		},
		async simulateReply({ commit, state }, message) {
			// implement optimistic update
			const data = { from: state.user, message };
			const newData = simulateNewConversation({ data: data });
			commit(ADD_CONVERSATION, newData);
			try {
				await axios.post('/simulate-reply', data);
			} catch (err) {
				setTimeout(() => {
					// rollback mutation
					const mutation = mutationsQueue.find(mutation => mutation.name === `${ADD_CONVERSATION}_${newData.id}`);
					commit(ROLLBACK_MUTATION, mutation);
					alert('Error trying to send message');
				}, 100);
			}
		}
	},
  getters: {
    conversations: state => state.conversations,
    sortedConversations: state => state.conversations.sort((a, b) => moment(a.date) >= moment(b.date))
  }
});

export default store;
