import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Layout from "../layouts/Layout";
import GuestLayout from "../layouts/guestLayout";
import AdminDashboardLayout from "../layouts/admin/adminDashboardLayout";
import AdminDashboard from "../components/admin/adminDashboard";
import { ArticleConsomable } from "../components/magazine_consommable/article_consomable";
import { Connextion } from "../components/connexion/connexion";
import { AjouterSortie } from "../components/ajouterSortie/ajouter_sortie";
// import StockList from "../components/magazine_consommable/StockList";
import AddMarket from "../components/marches/addmarket";
import { AddDelivery } from "../components/livraison/AddDelivery";
import { TestPaperFOrm } from "../components/livraison/testPaperFOrm";
import { AssociateDelivery } from "../components/livraison/associateDelivery";
import Test from "../components/livraison/test";
import Logout from "../components/connexion/logout";
import { TableSort } from "../mantine_template/table/TableSort.1";
import { SortiesList } from "../components/magazine_consommable/sorties_list";
import { DeliveryList } from "../components/livraison/deliveryList";
// import Example from "../components/magazine_consommable/list";
export const ADMIN_DASHBOARD_ROUTE = "/admin/dashboard";
export const LOGIN_ROUTE = "/login";
export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Connextion />,
            },
            {
                path: "*",
                element: <p>Page not found</p>,
            },
        ],
    },
    {
        element: <GuestLayout />,
        children: [
            {
                path: LOGIN_ROUTE,
                element: <Connextion />,
            },
        ],
    },
    {
        element: <AdminDashboardLayout />,
        children: [
            {
                path: ADMIN_DASHBOARD_ROUTE,
                element: <AdminDashboard />,
            },
            {
                path: "/",
                element: <AdminDashboard />,
            },
            {
                path: "/admin/addarticle",
                element: <ArticleConsomable />,
            },
            {
                path: "/admin/deliverylist",
                element: <SortiesList />,
            },
            {
                path: "/admin/addsortie",
                element: <AjouterSortie />,
            },
            // {
            //     path: "/admin/stock_list",
            //     element: <StockList />,
            // },
            {
                path: "/admin/add_market",
                element: <AddMarket />,
            },
            // {
            //     path: "/admin/test",
            //     element: <UsersTable />,
            // },
            // {
            //     path: "/admin/list",
            //     element: <Example />,
            // },
            // {
            //     path: "/admin/sorties_state",
            //     element: <SortiesState />,
            // },
            {
                path: "/admin/add_delivery",
                element: <AddDelivery />,
            },
            {
                path: "/admin/testdeli",
                element: <TestPaperFOrm />,
            },
            {
                path: "/admin/associate",
                element: <AssociateDelivery />,
            },
            {
                path: "/admin/test",
                element: <Test />,
            },
            {
                path: "/admin/settings",
                element: <AjouterSortie />,
            },
            {
                path: "/admin/logout",
                element: <Logout />,
            },
            {
                path: "/admin/markets",
                element: <TableSort />,
            },
            {
                path: "/admin/liste_delivery",
                element: <DeliveryList />,
            },
        ],
    },
]);
