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

export function ArticleConsomable() {
    const [AllFamily, setAllFamily] = useState([]);
    const [SelectedFamily, setSelectedFamily] = useState(null);
    const [AllSubFamily, setAllSubFamily] = useState([]);
    const [selectedSubFamily, setSelectedSubFamily] = useState(null);
    const [products, setProducts] = useState([]);
    const [visible, { toggle }] = useDisclosure(false);
    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            designation: "sfkjqkjfksqjf",
            famille: "",
            sous_famille: "",
            produit: "",
            codebar: "fjqskjfkqs",
            Unite: "",
        },
        validate: {
            designation: isNotEmpty("Entre un designation"),
            famille: isNotEmpty("entrez une famille"),
            sous_famille: isNotEmpty("entrez une sous familles"),
            produit: isNotEmpty("entrez une produit"),
            codebar: isNotEmpty("entrez une produit"),
            Unite: isNotEmpty("entrez une  unite"),
        },
    });

    useEffect(() => {
        axiosClient
            .get("/familles")
            .then((response) => {
                const data = response.data;
                setAllFamily(data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);
    form.watch("famille", ({ value }) => {
        handleFamilySelect(value);
        // setSelectedFamily(value);
    });
    form.watch("sous_famille", ({ value }) => {
        handleSubFamilySelect(value);
        // console.log("prev", previousValue);
        // setSelectedSubFamily(value);
        // console.log("value", value);
    });
    const handleFamilySelect = (selectedFamilyId) => {
        console.log("value from watch", selectedFamilyId);
        const selectedfitem = AllFamily.find(
            (family) => family.id_famille === parseInt(selectedFamilyId)
        );
        setSelectedFamily(selectedfitem);
        console.log("seleted", selectedfitem);
        if (selectedfitem) {
            console.log("is true", selectedfitem);
            setAllSubFamily(selectedfitem.sous_famille);
            // console.log("sous_famille", selectedFamily.sous_famille);
            setSelectedSubFamily(null);
            setProducts([]); // Reset products when family changes
        } else {
            console.log("false");
            setAllSubFamily([]);
            setSelectedSubFamily(null);
            console.log("allsubfamily", AllSubFamily);
            // setProducts([]);
        }
    };

    const handleSubFamilySelect = (selectedSubFamilyId) => {
        console.log("value subfamily from watch", selectedSubFamilyId);
        const selectedsfitem = AllSubFamily.find(
            (subFamily) =>
                subFamily.id_sous_famille === parseInt(selectedSubFamilyId)
        );
        setSelectedSubFamily(selectedsfitem);
        if (selectedsfitem) {
            setProducts(selectedsfitem.produit);
        } else {
            setProducts([]);
        }
    };
    const handleSubmit = async () => {
        try {
            console.log(form.getValues());
            const data = await axiosClient.post(
                "/add_article",
                form.getValues()
            );
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
                designation: "",
                famille: "",
                sous_famille: "",
                produit: "",
                codebar: "",
                Unite: "",
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
            <Fieldset legend="Information concernant l'article consommable">
                <form onSubmit={form.onSubmit(() => handleSubmit())}>
                    <TextInput
                        label="Designation"
                        placeholder="Your name"
                        withAsterisk
                        {...form.getInputProps("designation")}
                    />
                    <Select
                        label="Familles_Produit"
                        placeholder="Le famille de produit"
                        mt="md"
                        withAsterisk
                        data={AllFamily.map((family) => ({
                            label: family.nom_famille,
                            value: family.id_famille.toString(),
                        }))}
                        searchable
                        nothingFoundMessage="Nothing found..."
                        // value={selectedFamily.id_famille}
                        // onChange={(_value, option) =>
                        //     handleFamilySelect(_value)
                        // }
                        value={
                            SelectedFamily
                                ? SelectedFamily.id_famille.toString()
                                : null
                        }
                        {...form.getInputProps("famille")}

                        // onChange={(_value, option) => setValue(option)}
                    />
                    <Select
                        label="Sous_Familles_Produit"
                        placeholder="Le sous familles de produit"
                        mt="md"
                        withAsterisk
                        data={AllSubFamily.map((subFamily) => ({
                            label: subFamily.nom_sous_famille,
                            value: subFamily.id_sous_famille.toString(),
                        }))}
                        searchable
                        nothingFoundMessage="Nothing found..."
                        // value={
                        //     selectedSubFamily
                        //         ? selectedSubFamily.id_sous_famille.toString()
                        //         : null
                        // }
                        // onChange={(selectedValue) =>
                        //     handleSubFamilySelect(selectedValue)
                        // }
                        // onChange={(_value, option) =>
                        //     handleSubFamilySelect(_value)
                        // }
                        {...form.getInputProps("sous_famille")}
                    />
                    <Select
                        label="Produits"
                        placeholder="Sélectionnez un produit"
                        mt="md"
                        withAsterisk
                        data={products.map((product) => ({
                            label: product.nom_produit,
                            value: product.id_produit.toString(),
                        }))}
                        {...form.getInputProps("produit")}
                        searchable
                        nothingFoundMessage="Nothing found..."
                    />
                    <Grid>
                        <Grid.Col span={6}>
                            <TextInput
                                label="Code bar"
                                mt="md"
                                placeholder="Your name"
                                withAsterisk
                                {...form.getInputProps("codebar")}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <Select
                                label="Unite de l'article"
                                placeholder="Unite de l'article"
                                mt="md"
                                withAsterisk
                                data={["unite", "cm", "km", "kg"]}
                                {...form.getInputProps("Unite")}
                                searchable
                                nothingFoundMessage="Nothing found..."
                            />
                        </Grid.Col>
                    </Grid>
                    <Button onClick={toggle} mt="xl" type="submit">
                        Valider
                    </Button>
                </form>
            </Fieldset>
        </Container>
    );
}
