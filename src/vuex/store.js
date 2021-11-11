import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        isLoggedIn: false,
        username: "",
    },
    mutations: {
        setIsLoggedIn (state, val) {
            state.isLoggedIn = val
        },
        setUserEmail (state, email) {
            state.email = email
        },
        setUserId (state, userId) {
            state.userId = userId
        }
    }
})

export default store
