import { axiosClient } from "../../../api/axios";
const AdminApi = {
    getCsrf: async () => {
        return await axiosClient.get("/sanctum/csrf-cookie", {
            baseURL: import.meta.env.VITE_BACKEND_URL,
        });
    },
    getUser: async () => {
        return await axiosClient.get("/user");
    },
    login: async (role, password) => {
        return await axiosClient.post("/login", { role, password });
    },
    logout: async () => {
        return await axiosClient.post("/logout");
    },
    sortieslist: async () => {
        return await axiosClient.get("/sorties");
    },
};
export default AdminApi;
