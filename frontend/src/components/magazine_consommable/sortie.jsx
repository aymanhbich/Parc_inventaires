import { Button, Container, Fieldset, Select, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import { axiosClient } from "../../api/axios";
import { useForm } from "@mantine/form";

export function Sorite() {
    const [familyNames, setFamilyNames] = useState([]);
    const [subFamilyNames, setSubFamilyNames] = useState([]);
    const [selectedFamily, setSelectedFamily] = useState(null);
    const [selectedSubFamily, setSelectedSubFamily] = useState(null);
    const [products, setProducts] = useState([]);
    const [designation, setdesignation] = useState("");
    const form = useForm({
        initialValues: {
            designation: "",
            famille: "",
            sous_famille: "",
            produit: "",
            codebar: "",
            Unite: "",
        },
        // functions will be used to validate values at corresponding key
        validate: {
            designation: (value) => (value ? null : "Entre un designation"),
            Familles_Produit: (value) => (value ? null : "entrez une famille"), // Corrected
            sous_famille: (value) =>
                value ? null : "entrez une sous familles",
            produit: (value) => (value ? null : "entrez une produit"),
            codebar: (value) => (value ? null : "entrez une produit"),
            Unite: (value) => (value ? null : "entrez une produit"),
        },
    });
    useEffect(() => {
        axiosClient
            .get("/famille")
            .then((response) => {
                const data = response.data;
                setFamilyNames(data);
                console.log(data);
            })

            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    const handleFamilySelect = (selectedFamilyId) => {
        const selectedFamily = familyNames.find(
            (family) => family.id_famille === parseInt(selectedFamilyId)
        );
        setSelectedFamily(selectedFamily);

        if (selectedFamily) {
            setSubFamilyNames(selectedFamily.sous_famille);
            setSelectedSubFamily(null); // Reset selected subfamily when family changes
            // setProducts([]); // Reset products when family changes
        } else {
            setSubFamilyNames([]);
            setSelectedSubFamily(null);
            // setProducts([]);
        }
    };

    const handleSubFamilySelect = (selectedSubFamilyId) => {
        const selectedSubFamily = subFamilyNames.find(
            (subFamily) =>
                subFamily.id_sous_famille === parseInt(selectedSubFamilyId)
        );
        setSelectedSubFamily(selectedSubFamily);

        // if (selectedSubFamily) {
        //     setProducts(
        //         selectedSubFamily.produit.map((product) => ({
        //             label: product.nom_produit,
        //             value: product.id_produit.toString(),
        //         }))
        //     );
        // } else {
        //     setProducts([]);
        // }
    };
    return (
        <Container size={1000} my={40}>
            <Fieldset legend="Information concernant l'article consommable">
                <form onSubmit={form.onSubmit(console.log(form.values))}>
                    <TextInput
                        label="Designation"
                        placeholder="Your name"
                        {...form.getInputProps("designation")}
                    />
                    <Select
                        label="Familles_Produit"
                        placeholder="Le famille de produit"
                        mt="md"
                        data={familyNames.map((family) => ({
                            label: family.nom_famille,
                            value: family.id_famille.toString(),
                        }))}
                        value={
                            selectedFamily
                                ? selectedFamily.id_famille.toString()
                                : null
                        }
                        onChange={(selectedValue) =>
                            handleFamilySelect(selectedValue)
                        }
                        // onChange={(_value, option) =>
                        //     handleFamilySelect(_value)
                        // }
                        {...form.getInputProps("Familles_Produit")}
                    />
                    <Select
                        label="Sous_Familles_Produit"
                        placeholder="Le sous familles de produit"
                        mt="md"
                        data={subFamilyNames.map((subFamily) => ({
                            label: subFamily.nom_sous_famille,
                            value: subFamily.id_sous_famille.toString(),
                        }))}
                        value={
                            selectedSubFamily
                                ? selectedSubFamily.id_sous_famille.toString()
                                : null
                        }
                        onChange={(selectedValue) =>
                            handleSubFamilySelect(selectedValue)
                        }
                        // onChange={(_value, option) =>
                        //     handleSubFamilySelect(_value)
                        // }
                        {...form.getInputProps("sous_famille")}
                    />
                    <Select
                        label="Produits"
                        placeholder="Sélectionnez un produit"
                        mt="md"
                        data={products}
                        {...form.getInputProps("produit")}
                    />
                    <TextInput
                        label="Code bar"
                        placeholder="Your name"
                        {...form.getInputProps("codebar")}
                    />
                    <Select
                        label="Unite de l'article"
                        placeholder="Unite de l'article"
                        mt="md"
                        data={["unite", "cm", "km", "kg"]}
                        {...form.getInputProps("Unite")}
                    />
                    <Button mt="xl" type="submit">
                        Sign in
                    </Button>
                </form>
            </Fieldset>
        </Container>
    );
}
