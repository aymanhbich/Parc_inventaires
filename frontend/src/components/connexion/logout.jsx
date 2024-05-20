import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAdminContext } from "../../context/adminContext";
import { useNavigate } from "react-router-dom";
import { LoadingOverlay } from "@mantine/core";

const Logout = () => {
    const [loading, setLoading] = useState(true); // State to manage loading visibility
    const { logout, setAuthenticated } = useAdminContext();
    const navigate = useNavigate();
    useEffect(() => {
        const handleLogout = async () => {
            try {
                logout();
                setAuthenticated(false);
            } catch (error) {
                console.error("Logout failed:", error);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                    navigate("/login");
                }, 1500);
            }
        };

        handleLogout(); // Call handleLogout when the component mounts
    }, [logout, setAuthenticated, navigate]);

    return <LoadingOverlay visible={loading} zIndex={1000} />;
};

export default Logout;
