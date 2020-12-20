import axios from 'axios'

export const signUp = (body) => {
    axios.post("/api/1.0/users", body);
}