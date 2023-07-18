import axios from "axios";
//import moment from "moment";

export const logIn = (action) => {
    let url = "http://localhost:8000/api/v1/user/login";
    return axios.post(url, action.payload)
        .then((res) => res.data)
        .catch((err) => { throw err });
}


export const signUp = (action) => {
    let url = "http://localhost:8000/api/v1/user/add";
    return axios.post(url, action.payload)
        .then((res) => res.data)
        .catch((err) => { throw err });
}




