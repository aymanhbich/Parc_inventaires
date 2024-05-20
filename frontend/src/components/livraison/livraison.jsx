import {
    DatesProvider,
    MonthPickerInput,
    DatePickerInput,
    DateTimePicker,
} from "@mantine/dates";
import {
    Button,
    Container,
    Divider,
    Fieldset,
    Grid,
    Input,
    LoadingOverlay,
    Modal,
    Paper,
    ScrollArea,
    ScrollAreaAutosize,
    Select,
    Text,
    TextInput,
    Textarea,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { axiosClient } from "../../api/axios";
import { isNotEmpty, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";

export function AddDelivery() {
    const [FamilleSortie, setFamilleSortie] = useState([]);
    const [SelectedFamilleSortie, setSelectedFamilleSortie] = useState(null);
    const [Agents, setAgents] = useState([]);
    const [Articles, setArticles] = useState([]);
    const [selectedArticles, setSelectedArticles] = useState([]);
    const [visible, { toggle }] = useDisclosure(false);
    const [opened, { open, close }] = useDisclosure(false);
    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            date_livraison: new Date(Date.now() - 3600000),
            num_bl: "",
            reference: "",
            agent_beni: "",
            commentaire: "",
            article: "",
            quantity: "",
        },
        validate: {
            date_livraison: isNotEmpty("Entre unn date"),
            num_bl: isNotEmpty("entrez une famille de sortie"),
            reference: isNotEmpty("entrez une type d'operation"),
            agent_beni: isNotEmpty("entrez un agent"),
            commentaire: isNotEmpty("entrez une commentaire"),
            article: isNotEmpty("entrez une article"),
            quantity: isNotEmpty("entrez une article"),
        },
    });

    useEffect(() => {
        Promise.all([
            axiosClient.get("/famille_sortie"),
            axiosClient.get("/agents"),
            axiosClient.get("/articles"),
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

    const handleSubmit = async () => {
        const values = form.getValues();
        // Format the date to YYYY-MM-DD
        const formattedDate = values.date_livraison.toISOString().split("T")[0]; // Get YYYY-MM-DD from ISO string
        const customValues = {
            ...values,
            date_livraison: formattedDate,
        };
        console.log(customValues);
        try {
            console.log(form.getValues());
            const data = await axiosClient.post("/add_delivery", customValues);
            if (data.status === 204) {
                console.log("data", data);
                // toggle(); // Show loading overlay
            }
        } catch (error) {
            if (error.response && error.response) {
                console.error("Error response:", error.response.data.message);
                const errorMessage = error.response;
                console.log(error);
            } else {
                console.error("Unknown error:", error);
                // toggle(); // Show loading overlay
            }
        } finally {
            // toggle(); // Hide loading overlay
            // form.setValues({
            //     date_livraison: new Date(Date.now() - 3600000),
            //     num_bl: "",
            //     reference: "",
            //     agent_beni: "",
            //     commentaire: "",
            // });
        }
    };
    const handleAddArticle = () => {
        const selectedArticleId = form.getValues().article;
        console.log(selectedArticleId);
        const quantity = form.getValues().quantity;

        // Validate if both article and quantity are selected
        // if (!selectedArticleId || !quantity) {
        //     // console.error("Please select an article and enter a quantity.");
        //     form.setErrors({
        //         article: "Choisire un article",
        //         quantity: "Choisire une quantite",
        //     });
        //     return;
        // }

        // Find the selected article from the list of articles
        const selectedArticle = Articles.find(
            (article) => article.id_article.toString() === selectedArticleId
        );

        // if (!selectedArticle) {
        //     console.error("Selected article not found.");
        //     return;
        // }

        // Add the article and its quantity to the list of selected articles
        const newArticleEntry = {
            article: selectedArticle,
            quantity: parseInt(quantity),
        };

        setSelectedArticles((prevSelectedArticles) => [
            ...prevSelectedArticles,
            newArticleEntry,
        ]);

        // Clear the article and quantity inputs if needed
        form.setValues({
            article: "",
            quantity: "",
        });
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
            <Fieldset legend="Informations concernant l'operation">
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
                            valueFormat="DD-MM-YYYY"
                            placeholder="Pick date"
                            {...form.getInputProps("date_livraison")}
                        />
                    </DatesProvider>
                    <TextInput
                        label="№ bon de livaison"
                        placeholder="Le numero de bon de livaison"
                        mt="md"
                        withAsterisk
                        {...form.getInputProps("num_bl")}
                    />
                    <TextInput
                        label="Reference"
                        placeholder="Le reference de livaison"
                        mt="md"
                        withAsterisk
                        {...form.getInputProps("reference")}
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
                        {...form.getInputProps("agent_beni")}
                    />
                    <Textarea
                        placeholder="Entrer une commentaire"
                        label="Commentaire"
                        autosize
                        minRows={2}
                        {...form.getInputProps("commentaire")}
                    />
                    <Modal
                        opened={opened}
                        onClose={close}
                        title="Ajouter des articles"
                        size="lg"
                        styles={{ body: { padding: 20 } }} // Adjust padding as needed
                        centered
                    >
                        <Paper>
                            <Text>Num_bl: {form.getValues().num_bl}</Text>
                            <form
                            // onSubmit={form.onSubmit(() =>
                            //     handleAddArticle()
                            // )}
                            >
                                <Grid>
                                    <Grid.Col span={5}>
                                        <Select
                                            // label="Articles"
                                            placeholder="Sélectionnez un article"
                                            mt="md"
                                            withAsterisk
                                            maxDropdownHeight={100}
                                            data={Articles.map((article) => ({
                                                label: article.design_article,
                                                value: article.id_article.toString(),
                                            }))}
                                            {...form.getInputProps("article")}
                                        />
                                    </Grid.Col>
                                    <Grid.Col span={5}>
                                        <Input
                                            type="number"
                                            // label="Quantité"
                                            placeholder="Entrez la quantité"
                                            mt="md"
                                            {...form.getInputProps("quantity")}
                                        />
                                    </Grid.Col>
                                    <Grid.Col span={2}>
                                        <Button
                                            type="submit"
                                            mt="md"
                                            onClick={handleAddArticle}
                                        >
                                            Ajouter
                                        </Button>
                                    </Grid.Col>
                                </Grid>
                            </form>

                            {/* Display the list of selected articles */}
                            <Divider my="md" />
                            {selectedArticles.map((selectedArticle, index) => (
                                <Paper key={index}>
                                    <Grid>
                                        <Grid.Col span={8}>
                                            <Text>
                                                {
                                                    selectedArticle.article
                                                        .design_article
                                                }
                                            </Text>
                                        </Grid.Col>
                                        <Grid.Col span={4}>
                                            <Text>
                                                Quantité:{" "}
                                                {selectedArticle.quantity}
                                            </Text>
                                        </Grid.Col>
                                    </Grid>
                                </Paper>
                            ))}
                        </Paper>
                        <Button>valider</Button>
                    </Modal>

                    <Button mt="xl" type="submit">
                        Continue
                    </Button>
                    <Button onClick={open} mt="xl">
                        Test
                    </Button>
                </form>
            </Fieldset>
        </Container>
    );
}
