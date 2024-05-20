import {
    Button,
    Container,
    Fieldset,
    Grid,
    LoadingOverlay,
    Select,
    TextInput,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { axiosClient } from "../../api/axios";
import { isNotEmpty, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { DatePickerInput, DatesProvider } from "@mantine/dates";
export default function AddMarket() {
    const [AllFamily, setAllFamily] = useState([]);
    const [SelectedFamily, setSelectedFamily] = useState(null);
    const [AllSubFamily, setAllSubFamily] = useState([]);
    const [selectedSubFamily, setSelectedSubFamily] = useState(null);
    const [products, setProducts] = useState([]);
    const [visible, { toggle }] = useDisclosure(false);
    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            date_marche: new Date(Date.now()),
            reference: "",
            type_marche: "",
            fournisseur: "",
            intitule: "",
        },
        validate: {
            date_marche: isNotEmpty("Entre un date"),
            reference: isNotEmpty("entrez une reference"),
            type_marche: isNotEmpty("entrez une reference"),
            fournisseur: isNotEmpty("entrez une produit"),
            intitule: isNotEmpty("entrez une  unite"),
        },
    });

    useEffect(() => {
        axiosClient
            .get("/famille")
            .then((response) => {
                const data = response.data;
                setAllFamily(data);
                console.log(data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    const handleSubmit = async () => {
        const values = form.getValues();
        // Format the date to YYYY-MM-DD
        const formattedDate = values.date_marche.toISOString().split("T")[0];
        // Create a new object combining original values with customized date
        const customValues = {
            ...values,
            date_marche: formattedDate,
        };
        console.log(customValues);
        try {
            console.log(form.getValues());
            const data = await axiosClient.post("/add_market", customValues);
            if (data.status === 204) {
                console.log("data", data);
                toggle(); // Show loading overlay
            }
        } catch (error) {
            if (error.response && error.response) {
                console.error("Error response:", error.response.data.message);
                toggle(); // Show loading overlay
            } else {
                console.error("Unknown error:", error);
                toggle(); // Show loading overlay
            }
        } finally {
            toggle(); // Hide loading overlay
            form.setValues({
                date_marche: new Date(Date.now()),
                reference: "",
                type_marche: "",
                fournisseur: "",
                intitule: "",
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
            <Fieldset legend="Information concernant le marche">
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
                            label="Date de marche,BC,convention"
                            valueFormat="YYYY-MM-DD"
                            placeholder="Pick date"
                            {...form.getInputProps("date_marche")}
                        />
                    </DatesProvider>
                    <Grid>
                        <Grid.Col span={8}>
                            <TextInput
                                label="Reference"
                                placeholder="la reference"
                                mt="md"
                                withAsterisk
                                {...form.getInputProps("reference")}

                                // onChange={(_value, option) => setValue(option)}
                            />
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <Select
                                label="Type de marche"
                                placeholder="le type_marche"
                                mt="md"
                                withAsterisk
                                {...form.getInputProps("type_marche")}
                                data={["BC", "Marche", "Convention"]}

                                // onChange={(_value, option) => setValue(option)}
                            />
                        </Grid.Col>
                    </Grid>
                    <TextInput
                        label="Fournisseur"
                        mt="md"
                        placeholder="le nom de fournisseur"
                        withAsterisk
                        {...form.getInputProps("fournisseur")}
                    />
                    <TextInput
                        label="Intitule"
                        mt="md"
                        placeholder="le nom de l'intitule"
                        withAsterisk
                        {...form.getInputProps("intitule")}
                    />
                    <Button onClick={toggle} mt="xl" type="submit">
                        Valider
                    </Button>
                </form>
            </Fieldset>
        </Container>
    );
}
