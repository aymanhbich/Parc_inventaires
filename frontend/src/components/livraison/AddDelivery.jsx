import { DatesProvider, DatePickerInput } from "@mantine/dates";
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
    Select,
    Text,
    TextInput,
    Textarea,
    Accordion,
    ActionIcon,
    rem,
    Title,
    Group,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { axiosClient } from "../../api/axios";
import { isNotEmpty, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconSend2, IconRestore } from "@tabler/icons-react";

export function AddDelivery() {
    const [FamilleSortie, setFamilleSortie] = useState([]);
    const [SelectedFamilleSortie, setSelectedFamilleSortie] = useState(null);
    const [Agents, setAgents] = useState([]);
    const [Articles, setArticles] = useState([]);
    const [selectedArticles, setSelectedArticles] = useState([]);
    const [selectedlivraison, setselectedlivraison] = useState(null);
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
        },
        validate: {
            date_livraison: isNotEmpty("Entre unn date"),
            num_bl: isNotEmpty("entrez une famille de sortie"),
            reference: isNotEmpty("entrez une type d'operation"),
            agent_beni: isNotEmpty("entrez un agent"),
            commentaire: isNotEmpty("entrez une commentaire"),
        },
    });
    const formInModal = useForm({
        mode: "uncontrolled",
        initialValues: {
            article: "",
            quantite: "",
        },
        validate: {
            article: isNotEmpty("entrez une article"),
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
            const response = await axiosClient.post(
                "/add_delivery",
                customValues
            );
            const { id_livraison } = response.data;
            console.log(response.data);
            console.log(id_livraison);
            // const livIDResponse = await axiosClient.get(
            //     `/livraisons/${values.num_bl}/id-livraison`
            // );
            // const livId = livIDResponse.data;
            // console.log(livId);
            setselectedlivraison(id_livraison);
            console.log(response.status);
            open();
        } catch (error) {
            if (error.response && error.response) {
                // console.error("Error response:", error.response.data.error);
                // form.setErrors({ num_bl: "Duplicate num_bl" });
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
    const handleAddArticle = async () => {
        const selectedArticleId = formInModal.getValues().article;
        const quantite = formInModal.getValues().quantite;

        try {
            // Send the selected article to the endpoint
            await axiosClient.post(
                `/livraisons/${selectedlivraison}/add-article`,
                formInModal.getValues()
            );

            // If the request is successful, update the quantity locally
            const selectedArticle = Articles.find(
                (article) => article.id_article.toString() === selectedArticleId
            );
            // Check if the selected article is already in the list
            const existingArticleIndex = selectedArticles.findIndex(
                (item) => item.article.id_article === selectedArticle.id_article
            );

            if (existingArticleIndex !== -1) {
                // If the article exists, update its quantity
                const updatedSelectedArticles = [...selectedArticles];
                updatedSelectedArticles[existingArticleIndex].quantite +=
                    parseInt(quantite);
                setSelectedArticles(updatedSelectedArticles);
            } else {
                // If the article doesn't exist, add it as a new entry
                setSelectedArticles((prevSelectedArticles) => [
                    ...prevSelectedArticles,
                    {
                        article: selectedArticle,
                        quantite: parseInt(quantite),
                    },
                ]);
            }

            // Clear the article and quantite inputs if needed
            formInModal.setValues({
                article: "",
                quantite: "",
            });
        } catch (error) {
            if (error.response && error.response) {
                console.error("Error response:", error);
            } else {
                console.error("Unknown error:", error);
                // Handle error
            }
        }
    };

    // const items = Articles.map((item) => (
    //     <Accordion.Item key={item.id_article} value={item.value}>
    //         <Accordion.Control icon={item.emoji}>
    //             {item.id_produit}
    //         </Accordion.Control>
    //         <Accordion.Panel>{item.unite_de_article}</Accordion.Panel>
    //     </Accordion.Item>
    // ));
    const handleCloseModal = () => {
        setSelectedArticles([]); // Empty the selectedArticles array
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
                Ajouter une livraison
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
                <Grid>
                    <Grid.Col span={8}>
                        <TextInput
                            label="Reference"
                            placeholder="Le reference de livaison"
                            mt="md"
                            withAsterisk
                            {...form.getInputProps("reference")}
                        />
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <Select
                            label="Type de BL"
                            placeholder="le type de livraison"
                            mt="md"
                            withAsterisk
                            {...form.getInputProps("type_BL")}
                            data={["BC", "Marche", "Convention"]}

                            // onChange={(_value, option) => setValue(option)}
                        />
                    </Grid.Col>
                </Grid>
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

                {/* <Button mt="xl" type="submit">
                    Continue
                </Button> */}
                {/* <Button mt="xl">Test</Button> */}
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
                            handleAddArticle()
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
                                    {...formInModal.getInputProps("article")}
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
                    {selectedArticles.map((selectedArticle, index) => (
                        <Accordion key={index} variant="contained" mb="md">
                            <Accordion.Item
                                value={selectedArticle.article.design_article}
                            >
                                <Accordion.Control>
                                    <Text fw={500}>
                                        {selectedArticle.article.design_article}
                                    </Text>
                                </Accordion.Control>
                                <Accordion.Panel>
                                    <Grid
                                    // align="center"
                                    // justify="center"
                                    >
                                        <Grid.Col span={4}>
                                            <Text size="md" fw={500}>
                                                Unite de l'article
                                            </Text>
                                            {
                                                selectedArticle.article
                                                    .unite_de_article
                                            }
                                        </Grid.Col>
                                        <Grid.Col span={4}>
                                            <Text size="md" fw={500}>
                                                Code bar
                                            </Text>
                                            {selectedArticle.article.code_bar}
                                        </Grid.Col>
                                        <Grid.Col span={4}>
                                            <Text size="md" fw={500}>
                                                Quantité
                                            </Text>
                                            <Text>
                                                {selectedArticle.quantite}
                                            </Text>
                                        </Grid.Col>
                                        {/* <Grid.Col span={1}>
                                                    <ActionIcon
                                                        variant="subtle"
                                                        color="black"
                                                    >
                                                        <IconTrash
                                                            style={{
                                                                width: rem(30),
                                                                height: rem(30),
                                                            }}
                                                            stroke={1.5}
                                                        />
                                                    </ActionIcon>
                                                </Grid.Col> */}
                                    </Grid>
                                </Accordion.Panel>
                            </Accordion.Item>
                        </Accordion>
                    ))}
                </Paper>
                {/* <Button>valider</Button> */}
            </Modal>
            {/* </Fieldset> */}
        </Container>
    );
}
