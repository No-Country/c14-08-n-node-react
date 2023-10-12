import axios from 'axios';
import { endpoints } from '../constants/endpoints'
export const CreateUser = (set) => ({
    currentUser: null,
    role: null,
    token: null,
    signUpClient: async (data) => {
        try {
            const res = await axios.post(endpoints[0].url, data);
            set({ currentUser: res.data.user, role: res.data.role, token: res.data.token });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('role', res.data.role);
            localStorage.setItem('user', JSON.stringify(res.data.user));
        } catch (err) {
            console.log(err);
        }

    }
});