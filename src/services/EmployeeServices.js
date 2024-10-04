import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;
const getEmployees = async()=>{
    console.log("BASE_URL",BASE_URL)
    const res = await axios.get(BASE_URL);
    return res;
}

const addEmployee = async(payload)=>{
    const res = await axios.post(BASE_URL,payload);
    return res;
}

const editEmployee = async(id,payload) => {
    const res = await axios.put(BASE_URL+`/${id}`,payload)
    return res;
}

const deleteEmployee = async(id) =>{
    const res = await axios.delete(BASE_URL+`/${id}`);
    return res;
}

export {getEmployees,addEmployee,editEmployee,deleteEmployee}