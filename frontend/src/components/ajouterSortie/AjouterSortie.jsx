import { DatesProvider, DatePickerInput } from "@mantine/dates";
import {
    Button,
    Container,
    LoadingOverlay,
    Select,
    Textarea,
    Title,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { axiosClient } from "../../api/axios";
import { isNotEmpty, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";

export function AjouterSortie() {
    const [FamilleSortie, setFamilleSortie] = useState([]);
    const [SelectedFamilleSortie, setSelectedFamilleSortie] = useState(null);
    const [Agents, setAgents] = useState([]);
    const [selectedAgent, setselectedAgent] = useState(null);
    const [products, setProducts] = useState([]);
    const [visible, { toggle }] = useDisclosure(false);
    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            date_operation: new Date(Date.now() - 3600000),
            famille_sortie: "",
            type_operation: "",
            agent: "",
            commentaire: "",
        },
        validate: {
            date_operation: isNotEmpty("Entre unn date"),
            famille_sortie: isNotEmpty("entrez une famille de sortie"),
            type_operation: isNotEmpty("entrez une type d'operation"),
            agent: isNotEmpty("entrez un agent"),
            commentaire: isNotEmpty("entrez une commentaire"),
        },
    });

    useEffect(() => {
        Promise.all([
            axiosClient.get("/famille_sortie"),
            axiosClient.get("/agents"),
        ])
            .then(([famille_sortie, agents]) => {
                const famille_sortie_data = famille_sortie.data;
                const agents_data = agents.data;
                setFamilleSortie(famille_sortie_data);
                setAgents(agents_data);
                // Do something with agents_data if needed
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);
    form.watch("famille_sortie", ({ value }) => {
        handleFamilleSortie(value);
        // setSelectedFamilleSortie(value);
    });
    form.watch("agent", ({ value }) => {
        handleAgents(value);
        // console.log("prev", previousValue);
        // setselectedAgent(value);
        // console.log("value", value);
    });
    const handleFamilleSortie = (SelectedFamilleSortieId) => {
        console.log("value from watch", SelectedFamilleSortieId);
        const selectedfitem = FamilleSortie.find(
            (family) => family.id_famille === parseInt(SelectedFamilleSortieId)
        );
        setSelectedFamilleSortie(selectedfitem);
    };

    const handleAgents = (selectedAgentId) => {
        const selectedsfitem = Agents.find(
            (subFamily) =>
                subFamily.id_sous_famille === parseInt(selectedAgentId)
        );
        setselectedAgent(selectedsfitem);
    };
    const handleSubmit = async () => {
        try {
            // toggle(); // Show loading overlay
            const values = form.getValues();
            // Format the date to YYYY-MM-DD
            const formattedDate = values.date_operation
                .toISOString()
                .split("T")[0];
            // Create a new object combining original values with customized date
            const customValues = {
                ...values,
                date_operation: formattedDate,
            };

            console.log("Values:", customValues);
            const data = await axiosClient.post("/add_sortie", customValues);
            if (data.status === 204) {
                console.log("data", data);
            }
        } catch (error) {
            if (error.response && error.response) {
                console.error("Error response:", error.response.data.message);
            } else {
                console.error("Unknown error:", error);
            }
        } finally {
            // toggle(); // Hide loading overlay
            form.setValues({
                date: new Date(Date.now() - 3600000),
                famille_sortie: "",
                type_operation: "",
                agent: "",
                commentaire: "",
            });
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
                order={1}
                size="h1"
                style={{
                    fontFamily: "Greycliff CF, var(--mantine-font-family)",
                }}
                fw={700}
                ta="center"
            >
                Ajouter une sortie
            </Title>
            {/* <Fieldset legend="Informations concernant l'operation"> */}
            <form onSubmit={form.onSubmit(() => handleSubmit())}>
                <DatesProvider
                    settings={{
                        locale: "ar",
                        // firstDayOfWeek: 0,
                        // weekendDays: [0],
                        // timezone: "UTC",
                    }}
                >
                    <DatePickerInput
                        mt="md"
                        label="Pick date"
                        valueFormat="YYYY MMM DD"
                        placeholder="Pick date"
                        {...form.getInputProps("date_operation")}
                    />
                </DatesProvider>
                {/* <DatesProvider
                    settings={{
                        timezone: "Africa/Casablanca",
                        // locale: "ru",
                    }}
                >
                    <DateTimePicker
                        label="Pick a Date"
                        placeholder="Pick a Date"
                        defaultValue={new Date()}
                        {...form.getInputProps("date_operation")}
                    />
                </DatesProvider> */}
                <Select
                    label="Famille-№ d'operation"
                    placeholder="Le famille de sortie"
                    mt="md"
                    withAsterisk
                    data={FamilleSortie.map((sortie) => ({
                        label: sortie.nom_sorties_famille,
                        value: sortie.id_sorties_famille.toString(),
                    }))}
                    {...form.getInputProps("famille_sortie")}
                />

                <Select
                    label="Type d'operation"
                    placeholder="Le type d'operation"
                    mt="md"
                    withAsterisk
                    data={["consommé", "Dégrader"]}
                    {...form.getInputProps("type_operation")}
                />
                <Select
                    label="Agent beneficiaire"
                    placeholder="Sélectionnez agent"
                    mt="md"
                    withAsterisk
                    data={Agents.map((agent) => ({
                        label: agent.nom_agent,
                        value: agent.id_agent.toString(),
                    }))}
                    {...form.getInputProps("agent")}
                />
                <Textarea
                    placeholder="Entrer une commentaire"
                    label="Commentaire"
                    autosize
                    minRows={2}
                    {...form.getInputProps("commentaire")}
                />
                <Button mt="xl" type="submit">
                    Valider
                </Button>
            </form>
            {/* </Fieldset> */}
        </Container>
    );
}
