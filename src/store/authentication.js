import { userService } from '../services/userService.js';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { status: { loggedIn: true }, user } : { status: {}, user: null };

export default {
    namespaced: true,
    state: initialState,
    actions: {
        async login({ dispatch, commit }, { username, password }) {
            await commit('loginRequest', {username});
            if(await userService.login(username, password))
                await commit('loginSuccess');
            else
                await commit('loginFailure');
        },

        async logout({ commit }) {
            await userService.logout();
            await commit('logout');
        },

        async checkToken({commit}) {
            try {
                await userService.checkToken();
            }
            catch(e) {
                await commit('logout');
            }
        }
    },
    mutations: {
        loginRequest(state, user) {
            state.status = { loggingIn: true };
            state.user = user;
        },
        loginSuccess(state, user) {
            state.status = { loggedIn: true };
            state.user = user;
        },
        loginFailure(state) {
            state.status = { loginFailure: true};
            state.user = null;
        },
        logout(state) {
            state.status = {};
            state.user = null;
        }
    }
}