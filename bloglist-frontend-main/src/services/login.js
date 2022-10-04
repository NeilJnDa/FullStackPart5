import axios  from "axios";
const baseUrl = '/api/login'

const login = async (crendentials) =>{
    const response = await axios.post(baseUrl, crendentials);
    return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {login}