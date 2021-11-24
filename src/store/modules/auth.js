import { jwtDecrypt } from "../../shared/helper";
import { Storage } from "@capacitor/storage";
import axios from "axios";

const state = () => ({
    authData: {
        token: "",
        // refreshToken: "",
        // tokenExp: "",
        userId: "",
        userName: "",
        userEmail: "",
        userTel: "",
        userDomicilio: "",
    },
    loginStatus: ''
});

const getters = {
    //tendra metodos para recuperar los datos del estado de la sesion
    getLoginStatus(state) {
        return state.loginStatus;
    },
    getAuthData(state) {
        return state.authData;
    }
};

const actions = {
    //aca se realizan los trabajos asincronos a la API
    async loadStorageTokens({ commit }) {
        const access_token = await Storage.get({ key: "access_token" });
        if (access_token) {
            const tokenData = {
                access_token: access_token.value,
            }
            commit("saveAuthToken", tokenData);
        }
    },
    async loginUser({ commit }, payload) {
        let data = new FormData();
        data.append('email', payload.email);
        data.append('contrasena', payload.contrasena);
        data.append('usuario', payload.alias);
        const response = await axios.post("http://localhost:8765/api/clients/login", data, {
            headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" }
        });
        console.log(response.data);
        if ((response.status == 200 || response.status == 201) && response.data.message) {
            await Storage.set({
                key: "access_token",
                value: response.data.access_token
            });
            commit('saveAuthToken', response.data);
            commit('saveLoginStatus', 'success');
        } else {
            commit("saveLoginStatus", "failed");
        }
    },
    async logoutUser() {
        await Storage.set({
            key: "access_token",
            value: ''
        });
    }
};

const mutations = {
    //tendra metodos para actualizar nuestro objeto de estado
    saveAuthToken(state, payload) {
        const jwtDecodeUserInfo = jwtDecrypt(payload.access_token);
        const newAuthData = {
            token: payload.access_token,
            // refreshToken: payload.refresh_token,
            userId: jwtDecodeUserInfo.id,
            // tokenExp: jwtDecodeUserInfo.exp,
            userName: jwtDecodeUserInfo.nombre,
            userEmail: jwtDecodeUserInfo.email,
            userTel: jwtDecodeUserInfo.telefono,
            userDomicilio: jwtDecodeUserInfo.domicilio,
        };
        state.authData = newAuthData;
    },
    saveLoginStatus(state, status) {
        state.loginStatus = status;
    }
};


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};