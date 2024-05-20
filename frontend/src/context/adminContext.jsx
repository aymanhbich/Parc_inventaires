import { createContext, useContext, useState } from "react";
import { ADMIN_DASHBOARD_ROUTE } from "../router";
import AdminApi from "../services/api/admin/adminApi";

export const AdminStateContext = createContext({
    authenticated: false,
    user: {},
    setUser: () => {},
    logout: () => {},
    login: (role, password) => {},
    sortieslist: () => {},
    setAuthenticated: () => {},
});

export default function AdminContext({ children }) {
    const [user, setUser] = useState({});
    const [authenticated, _setAuthenticated] = useState(
        window.localStorage.getItem("AUTH")
    );
    const login = async (role, password) => {
        await AdminApi.getCsrf();
        return AdminApi.login(role, password);
    };
    const sortieslist = async () => {
        return await AdminApi.sortieslist();
    };
    const logout = async () => {
        await AdminApi.logout();
        setUser({});
        _setAuthenticated(false);
    };
    const setAuthenticated = (isAuthenticated) => {
        _setAuthenticated(isAuthenticated);
        window.localStorage.setItem("AUTH", isAuthenticated);
    };
    return (
        <>
            <AdminStateContext.Provider
                value={{
                    user,
                    login,
                    logout,
                    setUser,
                    authenticated,
                    setAuthenticated,
                    sortieslist,
                }}
            >
                {children}
            </AdminStateContext.Provider>
        </>
    );
}
export const useAdminContext = () => useContext(AdminStateContext);
