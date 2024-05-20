import React, { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from "../../router/index.jsx";
import { axiosClient } from "../../api/axios.js";
import { AppShell, Burger, Group, ScrollArea, Skeleton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MantineLogo } from "@mantinex/mantine-logo";
import { NavbarNested } from "../../components/AdminDashboard/NavbarNested/NavbarNested";
import { LoadingOverlay } from "@mantine/core";
import { useAdminContext } from "../../context/adminContext.jsx";
import AdminApi from "../../services/api/admin/adminApi.jsx";
export default function AdminDashboardLayout() {
    const { setUser, setAuthenticated, authenticated, logout, user } =
        useAdminContext();
    const navigate = useNavigate();
    const [opened, { toggle }] = useDisclosure();
    const [loading, setLoading] = useState(true);
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
    useEffect(() => {
        console.log("from layout", authenticated);
        AdminApi.getUser()
            .then(({ data }) => {
                setUser(data);
                setAuthenticated(true);
                console.log(authenticated);
            })
            .catch((response) => {
                // console.log("catch", response);
                // console.log(authenticated);
                // logout();
                setUser({});
                setAuthenticated(false);
                navigate(LOGIN_ROUTE);
            });
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);
    useEffect(() => {
        console.log(console);
    }, []);

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: 300,
                breakpoint: "sm",
                collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
            }}
            padding="md"
        >
            <LoadingOverlay
                visible={loading}
                zIndex={1000}
                overlayProps={{ radius: "sm", blur: 2 }}
            />
            <AppShell.Header>
                <Group h="100%" px="md">
                    <Burger
                        opened={mobileOpened}
                        onClick={toggleMobile}
                        hiddenFrom="sm"
                        size="sm"
                    />
                    <Burger
                        opened={desktopOpened}
                        onClick={toggleDesktop}
                        visibleFrom="sm"
                        size="sm"
                    />
                    <MantineLogo size={30} />
                </Group>
            </AppShell.Header>
            <ScrollArea scrollbars="y" type="scroll">
                <AppShell.Navbar p="">
                    <NavbarNested />
                </AppShell.Navbar>
            </ScrollArea>
            <AppShell.Main>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    );
}

// import React, { useEffect, useState } from 'react';
// import { Outlet, useNavigate } from 'react-router-dom';
// import { LOGIN_ROUTE } from '../../router/index.jsx';
// import { axiosClient } from '../../api/axios.js';

// export default function AdminDashboardLayout() {
//   const navigate = useNavigate();
//   const [authenticated, setAuthenticated] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!window.localStorage.getItem('ACCES_TOKEN')) {
//       navigate(LOGIN_ROUTE);
//     } else {
//       axiosClient.get('/user')
//         .then(({ data }) => {
//           console.log(data);
//           setAuthenticated(true);
//         })
//         .catch(error => {
//           console.error('Error fetching user data:', error);
//         })
//         .finally(() => {
//           setLoading(false);
//         });
//     }
//   }, []);

//   if (loading) {
//     // Optionally, you can render a loading indicator here
//     return <div>Loading...</div>;
//   }

//   if (!authenticated) {
//     // If the user is not authenticated, redirect to the login page
//     return null; // Or any other action you prefer before authentication
//   }

//   return (
//     <>
//       <header>Header</header>
//       <main>
//         <Outlet />
//       </main>
//       <footer>Footer</footer>
//     </>
//   );
// }
