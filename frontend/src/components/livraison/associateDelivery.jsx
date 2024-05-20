import React from "react";
import {
    Button,
    Container,
    LoadingOverlay,
    Select,
    Title,
    Group,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { axiosClient } from "../../api/axios";
import { isNotEmpty, useForm } from "@mantine/form";
import { IconLink, IconRestore } from "@tabler/icons-react";

export const AssociateDelivery = () => {
    const [FamilleSortie, setFamilleSortie] = useState([]);
    const [SelectedFamilleSortie, setSelectedFamilleSortie] = useState(null);
    const [Agents, setAgents] = useState([]);
    const [Livraisons, setLivraisons] = useState([]);
    const [markets, setmarkets] = useState([]);
    const [selectedArticles, setSelectedArticles] = useState([]);
    const [selectedlivraison, setselectedlivraison] = useState(null);
    const [visible, setVisible] = useState(false);
    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            marche: "",
            bl: "",
        },
        validate: {
            marche: isNotEmpty("entrez une commentaire"),
            bl: isNotEmpty("entrez une commentaire"),
        },
    });

    useEffect(() => {
        Promise.all([
            axiosClient.get("/markets"),
            axiosClient.get("/livraison"),
        ])
            .then(([markets, livraison]) => {
                const livraison_data = livraison.data;
                const markets_data = markets.data;
                setLivraisons(livraison_data);
                setmarkets(markets_data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    const handleSubmit = async () => {
        const formData = form.getValues();
        const id_marche = formData.marche;
        console.log("id_marche:", id_marche);
        setVisible(true); // Show loading overlay
        try {
            const data = await axiosClient.patch(`/associate/${formData.bl}`, {
                id_marche,
            });
            if (data.status === 204) {
                console.log("data", data);
            }
        } catch (error) {
            if (error.response && error.response) {
                console.error("Error response:", error);
            } else {
                console.error("Unknown error:", error);
            }
        } finally {
            setVisible(false); // Hide loading overlay
        }
    };

    return (
        <Container size={700} my={0}>
            <LoadingOverlay
                visible={visible}
                zIndex={1000}
                loaderProps={{ size: "md" }}
                overlayProps={{
                    radius: "sm",
                    blur: 2,
                }}
            />
            <Title
                order={2}
                size="h1"
                style={{
                    fontFamily: "Greycliff CF, var(--mantine-font-family)",
                }}
                fw={700}
                ta="center"
            >
                Affecter une livraison
            </Title>
            <form onSubmit={form.onSubmit(() => handleSubmit())}>
                <Select
                    label="choisir un marche"
                    placeholder="Sélectionnez marche"
                    mt="md"
                    searchable
                    nothingFoundMessage="Nothing found..."
                    withAsterisk
                    data={markets.map((market) => ({
                        label: `${market.reference} - ${market.type_marche}`,
                        value: market.id_marche.toString(),
                    }))}
                    {...form.getInputProps("marche")}
                />
                <Select
                    label="choisir une BL"
                    placeholder="Sélectionnez BL"
                    mt="md"
                    searchable
                    nothingFoundMessage="Nothing found..."
                    withAsterisk
                    data={Livraisons.map((BL) => ({
                        label: BL.num_bl,
                        value: BL.id_livraison.toString(),
                    }))}
                    {...form.getInputProps("bl")}
                />
                <Group justify="right" mt="md">
                    <Button
                        rightSection={<IconRestore size={14} />}
                        onClick={form.reset}
                    >
                        Reset
                    </Button>
                    <Button
                        justify="flex-end"
                        rightSection={<IconLink size={14} />}
                        type="submit"
                    >
                        Affecter
                    </Button>
                </Group>
            </form>
        </Container>
    );
};
