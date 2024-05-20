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
} from "@mantine/core";
import { useForm } from "@mantine/form";
import classes from "./connexion.module.css";
import { axiosClient } from "../../api/axios";
import { useNavigate } from "react-router-dom";

export function Login() {
    const ADMIN_DASHBOARD_ROUTE = "/admin/dashboard";
    const navigate = useNavigate();
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
        try {
            await axiosClient.get("http://localhost:8000/sanctum/csrf-cookie", {
                baseURL: import.meta.env.VITE_BACKEND_URL,
            });
            const data = await axiosClient.post("/login", form.values);
            if (data.status === 204) {
                window.localStorage.setItem("ACCES_TOKEN", "true");
                navigate(ADMIN_DASHBOARD_ROUTE);
            }
        } catch ({ response }) {
            form.setErrors({
                role: response.data.message,
                password: response.data.message,
            });
        }
    };
    return (
        <Container size={420} my={40}>
            <Title ta="center" className={classes.title}>
                Bienvenue!
            </Title>
            <Text c="dimmed" size="sm" ta="center" mt={5}>
                Do not have an account yet?{" "}
                <Anchor size="sm" component="button">
                    Create account
                </Anchor>
            </Text>
            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    {/* <TextInput label="Email" placeholder="you@mantine.dev" required {...form.getInputProps('email')}/> */}
                    <Select
                        label="Entrer votre email"
                        placeholder="Entre votre email"
                        data={["Administrateur", "Utilisateur"]}
                        {...form.getInputProps("role")}
                    />
                    <PasswordInput
                        label="Password"
                        placeholder="Your password"
                        required
                        mt="md"
                        {...form.getInputProps("password")}
                    />
                    <Group justify="space-between" mt="lg">
                        <Checkbox label="Remember me" />
                        <Anchor component="button" size="sm">
                            Forgot password?
                        </Anchor>
                    </Group>
                    <Button fullWidth mt="xl" type="submit">
                        Sign in
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}
