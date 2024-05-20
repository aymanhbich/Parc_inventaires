import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button,
    Select,
    LoadingOverlay,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import classes from "./connexion.module.css";
import { axiosClient } from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { useAdminContext } from "../../context/adminContext";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";

export function Connextion() {
    const ADMIN_DASHBOARD_ROUTE = "/admin/dashboard";
    const [visible, { toggle }] = useDisclosure(false);

    const navigate = useNavigate();
    const { login, setAuthenticated } = useAdminContext();
    const form = useForm({
        initialValues: {
            // email: "aymangame077@gmail.com",
            role: "Administrateur",
            password: "12345678910",
        },
        // functions will be used to validate values at corresponding key
        validate: {
            // email: (value) => (value ? null : 'entrez un email'),
            role: (value) => (value ? null : "entrez un role"),
            password: (value) =>
                value.length >= 6
                    ? null
                    : "Password must be at least 6 characters",
        },
    });
    const handleSubmit = async () => {
        const values = form.values;
        form.clearErrors();

        try {
            const response = await login(values.role, values.password);

            if (response.status === 204) {
                setAuthenticated(true);
                navigate(ADMIN_DASHBOARD_ROUTE);
                // navigate(ADMIN_DASHBOARD_ROUTE);
                console.log(response.status);
            }
        } catch (error) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.errors
            ) {
                const errors = error.response.data.errors;
                // Set errors for both 'role' and 'password' fields
                if (errors.password) {
                    // form.setFieldError("role", errors.role[0]);
                    form.setFieldError("password", errors.password[0]);
                }
                // if (errors.password) {
                //     form.setFieldError("password", errors.password[0]);
                // }
            }
            toggle(false);
        } finally {
            toggle(false);
        }
    };

    return (
        <Container size={420} my={40}>
            <LoadingOverlay
                visible={visible}
                zIndex={1000}
                loaderProps={{ size: "md" }}
                overlayProps={{
                    radius: "sm",
                    blur: 2,
                }}
            />
            <Title ta="center" className={classes.title}>
                Bienvenue!
            </Title>
            {/* <Text c="dimmed" size="sm" ta="center" mt={5}>
                Do not have an account yet?{" "}
                <Anchor size="sm" component="button">
                    Create account
                </Anchor>
            </Text> */}
            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    {/* <TextInput label="Email" placeholder="you@mantine.dev" required {...form.getInputProps('email')}/> */}
                    <Select
                        label="Selectionner votre role"
                        placeholder="Selectionner votre role"
                        data={["Administrateur", "Super administrateur"]}
                        {...form.getInputProps("role")}
                    />
                    <PasswordInput
                        label="Entrer votre mot de passe"
                        placeholder="votre password"
                        mt="md"
                        {...form.getInputProps("password")}
                    />
                    <Group justify="space-between" mt="lg">
                        <Checkbox
                            label="Se souvenir de moi"
                            {...form.getInputProps("remember")}
                        />
                        {/* <Anchor component="button" size="sm">
                            Forgot password?
                        </Anchor> */}
                    </Group>
                    <Button onClick={toggle} fullWidth mt="xl" type="submit">
                        Connexion
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}
