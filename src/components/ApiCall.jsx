import axios from "axios"
//Base URL
const API_URL = "https://reqres.in"

// Function to handle login
export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/api/login`, { email, password });
        return response.data;
    }
    catch (error) {
    throw error.response ? error.response.data : { error: "Network Error" };
    }
};

// Function to fetch users
export const fetchUsers = async () => {
    try {
    const response = await axios.get(`${API_URL}/api/users?page=2`);
    return response.data.data; // Returns user data
    }
    catch (error){
    throw error.response ? error.response.data : { error: "Network Error" };
    }
}

// Function to update user
export const updateUser = async (id, userData) => {
    try {
    const response = await axios.put(`${API_URL}/api/users/${id}`, userData);
    return response.data.data;
    } catch (error) {
    throw error.response ? error.response.data : { error: "Network Error" };
    }
}

// Function to delete user
export const deleteUser = async (id) => {
    try {
    await axios.delete(`${API_URL}/api/users/${id}`);
    return { success: true };
    } catch (error) {
    throw error.response ? error.response.data : { error: "Network Error" };
    }
}
