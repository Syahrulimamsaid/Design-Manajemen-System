import Axios from "axios";

const URL = Axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    // timeout: 1000,
    headers:{'Content-Type': 'Application/json'}
});

URL.interceptors.response.use((response)=>{
return response;

},(error:any)=>{
    return Promise.reject(error);
});

export default URL;