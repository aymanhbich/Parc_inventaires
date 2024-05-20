import React from "react";
import { Outlet } from "react-router-dom";
import { StatsGrid } from "../lib/StatsGrid/StatsGrid";
// import Dashboard from '../../mantine_template/dashboard/dashboard'

export default function AdminDashboard() {
    return (
        <>
            <StatsGrid />
        </>
    );
}
