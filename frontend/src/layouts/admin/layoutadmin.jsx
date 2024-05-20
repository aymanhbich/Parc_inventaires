// import React, { useEffect } from "react";
// import { Outlet, useNavigate } from "react-router-dom";
// import { LOGIN_ROUTE } from "../../router/index.jsx";
// import { axiosClient } from "../../api/axios.js";
// import { NavbarNested } from "../../components/Navbar";
// export default function AdminDashboardLayout() {
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (!window.localStorage.getItem("ACCES_TOKEN")) {
//             navigate(LOGIN_ROUTE);
//         } else {
//             axiosClient.get("/user").then(({ data }) => {
//                 console.log(data);
//             });
//         }
//     }, []);
//     return (
//         <>
//             <NavbarNested />
//             <main>
//                 <Outlet />
//             </main>
//             {/* <footer>Footer</footer> */}
//         </>
//     );
// }
import { AppShell, Burger, Group, Skeleton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MantineLogo } from "@mantinex/mantine-logo";
import { NavbarNested } from "../../components/AdminDashboard/NavbarNested/NavbarNested";
import { Login } from "../../components/login/login";
export function BasicAppShell() {
    const [opened, { toggle }] = useDisclosure();

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: 300,
                breakpoint: "sm",
                collapsed: { mobile: !opened },
            }}
            padding="md"
        >
            <AppShell.Header>
                <Group h="100%" px="md">
                    <Burger
                        opened={opened}
                        onClick={toggle}
                        hiddenFrom="sm"
                        size="sm"
                    />
                    <MantineLogo size={30} />
                </Group>
            </AppShell.Header>
            <AppShell.Navbar>
                {/* Navbar
                {Array(15)
                    .fill(0)
                    .map((_, index) => (
                        <Skeleton key={index} h={28} mt="sm" animate={false} />
                    ))} */}
                <NavbarNested />
            </AppShell.Navbar>
            <AppShell.Main>
                <Sorite />
            </AppShell.Main>
        </AppShell>
    );
}
