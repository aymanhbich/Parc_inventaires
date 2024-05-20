import { Group, Paper, SimpleGrid, Text } from "@mantine/core";
import {
    IconUserPlus,
    IconDiscount2,
    IconReceipt2,
    IconCoin,
    IconArrowUpRight,
    IconArrowDownRight,
    IconBuildingStore,
    IconPackageExport,
} from "@tabler/icons-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { axiosClient } from "../../../api/axios";
import classes from "./StatsGrid.module.css";

const icons = {
    user: IconPackageExport,
    coin: IconPackageExport,
    discount: IconPackageExport,
    receipt: IconBuildingStore,
};

export function StatsGrid() {
    const [statsData, setStatsData] = useState([]);

    useEffect(() => {
        const client = axiosClient || axios;

        Promise.all([
            client.get("/markets"),
            client.get("/livraison"),
            client.get("/agents"),
            client.get("/articles/all"),
            client.get("/sorties"),
        ])
            .then(
                ([
                    marketsResponse,
                    livraisonResponse,
                    Agents,
                    articles,
                    sorties,
                ]) => {
                    const marchesCount = marketsResponse.data.length;
                    const livraisonCount = livraisonResponse.data.length;
                    const agentsCount = Agents.data.length;
                    const articlesCount = articles.data.length;
                    const sortiesCount = sorties.data.length;
                    const dynamicData = [
                        {
                            title: "Marches",
                            icon: "receipt",
                            value: marchesCount,
                            diff: 34,
                        },
                        {
                            title: "Livraisons",
                            icon: "coin",
                            value: livraisonCount,
                            diff: -13,
                        },
                        {
                            title: "Agents",
                            icon: "coin",
                            value: agentsCount,
                            diff: -13,
                        },
                        {
                            title: "Articles",
                            icon: "coin",
                            value: articlesCount,
                            diff: -13,
                        },
                        {
                            title: "Sorties",
                            icon: "coin",
                            value: sortiesCount,
                            diff: -13,
                        },
                    ];

                    setStatsData(dynamicData);
                }
            )
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    const stats = statsData.map((stat) => {
        const Icon = icons[stat.icon];
        const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

        return (
            <Paper withBorder p="md" radius="md" key={stat.title}>
                <Group justify="space-between">
                    <Text size="xs" c="dimmed" className={classes.title}>
                        {stat.title}
                    </Text>
                    <Icon className={classes.icon} size="1.4rem" stroke={1.5} />
                </Group>

                <Group align="flex-end" gap="xs" mt={25}>
                    <Text className={classes.value}>{stat.value}</Text>
                    {/* <Text
                        c={stat.diff > 0 ? "teal" : "red"}
                        fz="sm"
                        fw={500}
                        className={classes.diff}
                    >
                        <span>{stat.diff}%</span>
                        <DiffIcon size="1rem" stroke={1.5} />
                    </Text> */}
                </Group>

                <Text fz="xs" c="dimmed" mt={7}>
                    Par rapport au mois précédent
                </Text>
            </Paper>
        );
    });

    return (
        <div className={classes.root}>
            <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }}>{stats}</SimpleGrid>
        </div>
    );
}
