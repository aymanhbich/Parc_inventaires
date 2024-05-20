import {
    Avatar,
    Badge,
    Table,
    Group,
    Text,
    ActionIcon,
    Anchor,
    rem,
} from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { axiosClient } from "../../api/axios";
import { useEffect, useState } from "react";

const data = [
    {
        avatar: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png",
        name: "Robert Wolfkisser",
        job: "Engineer",
        email: "rob_wolf@gmail.com",
        phone: "+44 (452) 886 09 12",
    },
];

const jobColors = {
    consommé: "blue",
    manager: "cyan",
    designer: "pink",
};

export function UsersTable() {
    const [data, setData] = useState([]);
    const [records, setrecords] = useState([]);

    useEffect(() => {
        // Fetch data from your API
        axiosClient
            .get("/sorties")
            .then((response) => {
                // setData(response.data); // Update state with fetched data
                console.log(response.data);
                setrecords(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);
    const rows = records.map((item) => (
        <Table.Tr key={item.id_sortie}>
            <Table.Td>
                <Group gap="sm">
                    <Avatar size={30} src={item.avatar} radius={30} />
                    <Text fz="sm" fw={500}>
                        {item.id_sortie}
                    </Text>
                </Group>
            </Table.Td>

            <Table.Td>
                <Badge color={jobColors[item.type_operation]} variant="light">
                    {item.type_operation}
                </Badge>
            </Table.Td>
            <Table.Td>
                <Anchor component="button" size="sm">
                    {item.type_operation}
                </Anchor>
            </Table.Td>
            <Table.Td>
                <Text fz="sm">{item.id_agent}</Text>
            </Table.Td>
            <Table.Td>
                <Text fz="sm">{item.commentaire}</Text>
            </Table.Td>
            <Table.Td>
                <Group gap={0} justify="flex-end">
                    <ActionIcon variant="subtle" color="gray">
                        <IconPencil
                            style={{ width: rem(16), height: rem(16) }}
                            stroke={1.5}
                        />
                    </ActionIcon>
                    <ActionIcon variant="subtle" color="red">
                        <IconTrash
                            style={{ width: rem(16), height: rem(16) }}
                            stroke={1.5}
                        />
                    </ActionIcon>
                </Group>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <Table.ScrollContainer minWidth={800}>
            <Table verticalSpacing="sm">
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Num sorite</Table.Th>
                        <Table.Th>Type de operation</Table.Th>
                        <Table.Th>Email</Table.Th>
                        <Table.Th>Phone</Table.Th>
                        <Table.Th>Commentaire</Table.Th>
                        <Table.Th />
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </Table.ScrollContainer>
    );
}
