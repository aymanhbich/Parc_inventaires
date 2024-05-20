import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ADMIN_DASHBOARD_ROUTE } from "../router";
import { useAdminContext } from "../context/adminContext";
export default function GuestLayout() {
    const navigate = useNavigate();
    const context = useAdminContext();

    useEffect(() => {
        console.log("from context",context);
        if (context.authenticated) {
            navigate(ADMIN_DASHBOARD_ROUTE);
        }
    }, []);
    return (
        <>
            {/* <header>Header</header> */}
            <main>
                <Outlet />
            </main>
            {/* <footer>Footer</footer> */}
        </>
    );
}
