import axios from 'axios';

export default axios.create({
    baseURL: 'https://localhost:3002'

});

export const axiosPrivate = axios.create({
    baseURL: 'https://localhost:3002',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
})