import {
    DatesProvider,
    MonthPickerInput,
    DatePickerInput,
    DateTimePicker,
} from "@mantine/dates";
import {
    Accordion,
    Button,
    Container,
    Divider,
    Fieldset,
    Grid,
    Group,
    LoadingOverlay,
    Modal,
    Paper,
    Select,
    TextInput,
    Textarea,
    Title,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { axiosClient } from "../../api/axios";
import { isNotEmpty, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconRestore, IconSend2 } from "@tabler/icons-react";

export function AjouterSortie() {
    const [FamilleSortie, setFamilleSortie] = useState([]);
    const [SelectedFamilleSortie, setSelectedFamilleSortie] = useState(null);
    const [Agents, setAgents] = useState([]);
    const [selectedAgent, setselectedAgent] = useState(null);
    const [selectedsortie, setselectedsortie] = useState(null);
    const [Articles, setArticles] = useState([]);
    const [visible, { toggle }] = useDisclosure(false);
    const [opened, { open, close }] = useDisclosure(false);
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
    const formInModal = useForm({
        mode: "uncontrolled",
        initialValues: {
            id_article: "",
            quantite: "",
        },
        validate: {
            id_article: isNotEmpty("entrez une article"),
            quantite: isNotEmpty("entrez une quantite"),
        },
    });

    useEffect(() => {
        Promise.all([
            axiosClient.get("/familles_sorties"),
            axiosClient.get("/agents"),
            axiosClient.get("/articles?all"),
        ])
            .then(([famille_sortie, agents, articles]) => {
                const famille_sortie_data = famille_sortie.data;
                const agents_data = agents.data;
                const articles_data = articles.data;
                setFamilleSortie(famille_sortie_data);
                setAgents(agents_data);
                setArticles(articles_data);

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
            (subFamily) => subFamily.id_agent === parseInt(selectedAgentId)
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
            const response = await axiosClient.post(
                "/add_sortie",
                customValues
            );
            console.log(response.data);
            const { id_sortie } = response.data;
            setselectedsortie(id_sortie);
            open();
        } catch (error) {
            if (error.response && error.response) {
                console.error("Error response:", error.response.data.message);
            } else {
                console.error("Unknown error:", error);
            }
        } finally {
            // open();
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
    const handleDecreaseArticle = async () => {
        try {
            // toggle(); // Show loading overlay
            const values = formInModal.getValues();
            const customValues = {
                id_sortie: selectedsortie,
                ...values,
            };
            console.log("Values:", customValues);
            const data = await axiosClient.post(
                "/articleminesquantite",
                customValues
            );
        } catch (error) {
            if (error.response && error.response) {
                console.error("Error response:", error.response.data.message);
            } else {
                console.error("Unknown error:", error);
            }
        } finally {
            open();
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
    // const handleCloseModal = () => {
    //     close(); // Close the modal
    // };
    const handleCloseModal = () => {
        setselectedsortie([]); // Empty the selectedArticles array
        close(); // Close the modal
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
                {/* <Select
                    label="l'article"
                    placeholder="Sélectionnez l'article"
                    mt="md"
                    withAsterisk
                    data={Agents.map((agent) => ({
                        label: agent.nom_agent,
                        value: agent.id_agent.toString(),
                    }))}
                    {...form.getInputProps("article")}
                /> */}
                <Textarea
                    placeholder="Entrer un commentaire"
                    label="Commentaire"
                    autosize
                    minRows={2}
                    {...form.getInputProps("commentaire")}
                />
                <Group justify="right" mt="md">
                    <Button
                        rightSection={<IconRestore size={14} />}
                        // mt="md"
                        type="reset"
                    >
                        Reset
                    </Button>
                    <Button
                        justify="flex-end"
                        rightSection={<IconSend2 size={14} />}
                        // mt="md"
                        type="submit"
                    >
                        Continue
                    </Button>
                </Group>
            </form>
            {/* </Fieldset> */}
            <Modal
                opened={opened}
                onClose={handleCloseModal}
                title="Ajouter des articles"
                size="lg"
                styles={{ body: { padding: 20 } }} // Adjust padding as needed
                centered
            >
                <Paper>
                    {/* <Text>Num_bl: {form.getValues().num_bl}</Text> */}
                    <form
                        onSubmit={formInModal.onSubmit(() =>
                            handleDecreaseArticle()
                        )}
                    >
                        <Grid>
                            <Grid.Col span={7}>
                                <Select
                                    placeholder="Sélectionnez un article"
                                    mt="md"
                                    withAsterisk
                                    maxDropdownHeight={100}
                                    data={Articles.map((article) => ({
                                        label: article.design_article,
                                        value: article.id_article.toString(),
                                    }))}
                                    {...formInModal.getInputProps("id_article")}
                                />
                            </Grid.Col>
                            <Grid.Col span={3}>
                                <TextInput
                                    type="number"
                                    withAsterisk
                                    placeholder="Entrez la quantité"
                                    mt="md"
                                    {...formInModal.getInputProps("quantite")}
                                />
                            </Grid.Col>
                            <Grid.Col span={2}>
                                <Button
                                    type="submit"
                                    mt="md"
                                    // onClick={handleAddArticle}
                                >
                                    Ajouter
                                </Button>
                            </Grid.Col>
                        </Grid>
                    </form>

                    {/* Display the list of selected articles */}
                    <Divider my="md" />
                </Paper>
                {/* <Button>valider</Button> */}
            </Modal>
        </Container>
    );
}
