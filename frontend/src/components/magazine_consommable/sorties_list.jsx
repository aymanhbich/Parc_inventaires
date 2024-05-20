import { useState, useEffect } from "react";
import {
    Table,
    ScrollArea,
    UnstyledButton,
    Group,
    Text,
    Center,
    TextInput,
    rem,
    LoadingOverlay,
} from "@mantine/core";
import {
    IconSelector,
    IconChevronDown,
    IconChevronUp,
    IconSearch,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import classes from "./TableSort.module.css";

function Th({ children, reversed, sorted, onSort }) {
    const Icon = sorted
        ? reversed
            ? IconChevronUp
            : IconChevronDown
        : IconSelector;
    return (
        <Table.Th className={classes.th}>
            <UnstyledButton onClick={onSort} className={classes.control}>
                <Group position="apart">
                    <Text fw={500} fz="sm">
                        {children}
                    </Text>
                    <Center className={classes.icon}>
                        <Icon
                            style={{ width: rem(16), height: rem(16) }}
                            stroke={1.5}
                        />
                    </Center>
                </Group>
            </UnstyledButton>
        </Table.Th>
    );
}

function filterData(data, search) {
    const query = search.toLowerCase().trim();
    return data.filter((item) =>
        Object.keys(item).some((key) =>
            item[key].toString().toLowerCase().includes(query)
        )
    );
}

function sortData(data, payload) {
    const { sortBy, reversed, search } = payload;

    if (!sortBy) {
        return filterData(data, search);
    }

    return filterData(
        [...data].sort((a, b) => {
            if (reversed) {
                return b[sortBy].toString().localeCompare(a[sortBy].toString());
            }
            return a[sortBy].toString().localeCompare(b[sortBy].toString());
        }),
        search
    );
}

export function SortiesList() {
    const [search, setSearch] = useState("");
    const [sortedData, setSortedData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [sortBy, setSortBy] = useState(null);
    const [reverseSortDirection, setReverseSortDirection] = useState(false);
    const [visible, { toggle }] = useDisclosure(false);

    useEffect(() => {
        toggle(true);
        fetch("http://localhost:8000/api/sorties")
            .then((response) => response.json())
            .then((data) => {
                setSortedData(data);
                setFilteredData(filterData(data, search));
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            })
            .finally(() => toggle(false));
    }, [search, toggle]);

    const setSorting = (field) => {
        const reversed = field === sortBy ? !reverseSortDirection : false;
        setReverseSortDirection(reversed);
        setSortBy(field);
        setFilteredData(
            sortData(sortedData, { sortBy: field, reversed, search })
        );
    };
    const handleSearchChange = (event) => {
        const { value } = event.currentTarget;
        setSearch(value);
        setFilteredData(
            sortData(sortedData, {
                sortBy,
                reversed: reverseSortDirection,
                search: value,
            })
        );
    };

    const rows = filteredData.map((row) => (
        <Table.Tr key={row.id_sortie}>
            <Table.Td>{row.num_sortie}</Table.Td>
            <Table.Td>{row.date_operation}</Table.Td>
            <Table.Td>{row.id_sorties_famille}</Table.Td>
            <Table.Td>{row.type_operation}</Table.Td>
            <Table.Td>{row.commentaire}</Table.Td>
        </Table.Tr>
    ));
    return (
        <ScrollArea>
            <TextInput
                placeholder="Search by any field"
                mb="md"
                leftSection={
                    <IconSearch
                        style={{ width: rem(16), height: rem(16) }}
                        stroke={1.5}
                    />
                }
                value={search}
                onChange={handleSearchChange}
            />
            <Table
                horizontalSpacing="md"
                verticalSpacing="xs"
                minWidth={700}
                layout="fixed"
            >
                <Table.Thead>
                    <Table.Tr>
                        <Th
                            sorted={sortBy === "num_sortie"}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting("num_sortie")}
                        >
                            Num sortie
                        </Th>
                        <Th
                            sorted={sortBy === "date_operation"}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting("date_operation")}
                        >
                            Date d'opération
                        </Th>
                        <Th
                            sorted={sortBy === "id_sorties_famille"}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting("id_sorties_famille")}
                        >
                            Famille
                        </Th>
                        <Th
                            sorted={sortBy === "type_operation"}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting("type_operation")}
                        >
                            Type d'opération
                        </Th>
                        <Th
                            sorted={sortBy === "commentaire"}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting("commentaire")}
                        >
                            Commentaire
                        </Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {filteredData.length > 0 ? (
                        rows
                    ) : (
                        <Table.Tr>
                            <LoadingOverlay
                                visible={visible}
                                zIndex={1000}
                                loaderProps={{ size: "md" }}
                                overlayBlur={2}
                            />
                            <Table.Td colSpan={5}>
                                <Text fw={500} ta="center">
                                    Nothing found
                                </Text>
                            </Table.Td>
                        </Table.Tr>
                    )}
                </Table.Tbody>
            </Table>
        </ScrollArea>
    );
}
