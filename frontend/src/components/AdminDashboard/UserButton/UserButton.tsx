import {
    UnstyledButton,
    Group,
    Avatar,
    Text,
    rem,
    Menu,
    LoadingOverlay,
} from "@mantine/core";
import {
    IconArrowsLeftRight,
    IconChevronRight,
    IconMessageCircle,
    IconPhoto,
    IconSearch,
    IconSettings,
    IconTrash,
} from "@tabler/icons-react";
import classes from "./UserButton.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAdminContext } from "../../../context/adminContext";

export function UserButton() {
    const [loading, setLoading] = useState(true); // State to manage loading visibility
    const { logout, setAuthenticated } = useAdminContext();
    const navigate = useNavigate();
    <LoadingOverlay visible={loading} zIndex={1000} />;
    const handleLogout = async () => {
        try {
            setLoading(true); // Show loading overlay
            logout(); // Assuming logout is an async function that logs out the user
            setAuthenticated(false);
            setTimeout(() => {
                setLoading(false);
                navigate("/login");
            }, 1500);
        } catch (error) {
            console.error("Logout failed:", error);
            setLoading(false); // Ensure loading state is set to false even in case of error
        }
    };
    return (
        <Menu shadow="md" width={200}>
            <Menu.Target>
                <UnstyledButton className={classes.user}>
                    <Group>
                        <Avatar
                            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
                            radius="xl"
                        />

                        <div style={{ flex: 1 }}>
                            <Text size="sm" fw={500}>
                                Administrateur
                            </Text>

                            <Text c="dimmed" size="xs">
                                hspoonlicker@outlook.com
                            </Text>
                        </div>

                        <IconChevronRight
                            style={{ width: rem(14), height: rem(14) }}
                            stroke={1.5}
                        />
                    </Group>
                </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Label>Application</Menu.Label>
                <Link to="/admin/logout" className={classes.link}>
                    <Menu.Item
                        leftSection={
                            <IconSettings
                                style={{ width: rem(14), height: rem(14) }}
                            />
                        }
                    >
                        Settings
                    </Menu.Item>
                </Link>
                <Menu.Item
                    leftSection={
                        <IconMessageCircle
                            style={{ width: rem(14), height: rem(14) }}
                        />
                    }
                >
                    Messages
                </Menu.Item>
                <Menu.Item
                    leftSection={
                        <IconPhoto
                            style={{ width: rem(14), height: rem(14) }}
                        />
                    }
                >
                    Gallery
                </Menu.Item>
                <Menu.Item
                    leftSection={
                        <IconSearch
                            style={{ width: rem(14), height: rem(14) }}
                        />
                    }
                    rightSection={
                        <Text size="xs" c="dimmed">
                            ⌘K
                        </Text>
                    }
                >
                    Search
                </Menu.Item>

                <Menu.Divider />

                <Menu.Label>Danger zone</Menu.Label>
                <Menu.Item
                    leftSection={
                        <IconArrowsLeftRight
                            style={{ width: rem(14), height: rem(14) }}
                        />
                    }
                >
                    Transfer my data
                </Menu.Item>
                <Menu.Item
                    onClick={handleLogout}
                    color="red"
                    leftSection={
                        <IconTrash
                            style={{ width: rem(14), height: rem(14) }}
                        />
                    }
                >
                    Deconnexion
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}
