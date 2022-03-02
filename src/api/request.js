import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;
const loginUrl = process.env.REACT_APP_LOGIN_BASE_URL;
const registorUrl = process.env.REACT_APP_REGISTOR_BASE_URL;
const resetPasswordUrl = process.env.REACT_APP_RESET_PASSWORD_BASE_URL;
const key = process.env.REACT_APP_LOGIN_KEY;

const postRequest = (query, data) => {
    const url = `${baseUrl}${query}.json`;
    return axios.post(`${url}`, data);
}

const getRequest = (query) => {
    const url = `${baseUrl}${query}.json`;
    return axios.get(`${url}`);
}

const putRequest = (query, id, data) => {
    const url = `${baseUrl}${query}/${id}.json`;
    return axios.put(`${url}`, data);
}

const deleteRequest = (query, id) => {
    const url = `${baseUrl}${query}/${id}.json`;
    return axios.delete(`${url}`);
}

const loginRequest = (userdata) => {
    const url = `${loginUrl}${key}`;
    return axios.post(`${url}`, userdata);
}

const registorRequest = (userdata) => {
    const url = `${registorUrl}${key}`;
    return axios.post(`${url}`, userdata);
}

const passwordResetRequest = (userdata) => {
    const url = `${resetPasswordUrl}${key}`;
    return axios.post(`${url}`, userdata);
}

export {postRequest, getRequest, putRequest, deleteRequest, loginRequest, registorRequest, passwordResetRequest};