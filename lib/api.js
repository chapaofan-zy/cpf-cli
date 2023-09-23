const axios = require('axios');

axios.interceptors.response.use((res) => {
    return res.data;
});

async function getRepo() {
    return axios.get("https://api.github.com/repos/chapaofan-zy/cpf-tamplate");
}

async function getRepoBranch() {
    return axios.get("https://api.github.com/repos/chapaofan-zy/cpf-tamplate/branches");
}

module.exports = {
    getRepo,
    getRepoBranch
};