import { Group, Code, ScrollArea, rem, Title } from "@mantine/core";
import {
    IconNotes,
    IconCalendarStats,
    IconGauge,
    IconPresentationAnalytics,
    IconFileAnalytics,
    IconAdjustments,
    IconLock,
    IconBuildingStore,
    IconPackageExport,
} from "@tabler/icons-react";
import { UserButton } from "../UserButton/UserButton";
import { LinksGroup } from "../NavbarLinksGroup/NavbarLinksGroup";
import { Logo } from "./Logo";
import logo from "./Logo.png";
import classes from "./NavbarNested.module.css";
import { Link } from "react-router-dom";

const mockdata = [
    { label: "Dashboard", icon: IconGauge,link:'' },
    {
        label: "Magasin Conso",
        icon: IconNotes,
        initiallyOpened: true,
        links: [
            { label: "Ajout Sortie", link: "/admin/addsortie" },
            { label: "Etat du Stock", link: "/admin/stock_list" },
            { label: "Liste des Sorties", link: "/admin/deliverylist" },
            { label: "Etat des Sorties", link: "/sorties_state" },
            { label: "Articles Consommables", link: "/admin/addarticle" },
        ],
    },
    {
        label: "Les marches.BC",
        icon: IconBuildingStore,
        links: [
            {
                label: "Ajouter un marches",
                link: "/admin/add_market", // Provide the string link here
            },
            { label: "Recherche marches", link: "/admin/search_market" },
            { label: "Liste:BC/Marches", link: "/admin/marketslist" },
            { label: "Etats:Bc/Marches", link: "/admin/marche_state" },
        ],
    },
    {
        label: "Livraison",
        icon: IconPackageExport,
        links: [
            { label: "Ajouter une livraison", link: "/admin/add_delivery" },
            {
                label: "Recherche une livraison",
                link: "/admin/search_delivery",
            },
            { label: "Liste de livraison", link: "/admin/liste_delivery" },
            { label: "Etats de livraison", link: "/admin/state_delivery" },
            {
                label: "Affecter un Bl a une marches,BC",
                link: "/admin/associate",
            },
            { label: "Change password", link: "/" },
            { label: "Recovery codes", link: "/" },
        ],
    },
];

export function NavbarNested() {
    const links = mockdata.map((item) => (
        <LinksGroup {...item} key={item.label} />
    ));

    return (
        <nav className={classes.navbar}>
            {/* <div className={classes.header}>
                <Group justify="space-between">
                    <Logo style={{ width: rem(100) }} />
                    <Code fw={700}>v3.1.2</Code>
                </Group>
            </div> */}

            <ScrollArea className={classes.links}>
                <div className={classes.linksInner}>{links}</div>
            </ScrollArea>

            <div className={classes.footer}>
                <UserButton />
            </div>
        </nav>
    );
}
