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
} from "@mantine/core";
import {
    IconSelector,
    IconChevronDown,
    IconChevronUp,
    IconSearch,
} from "@tabler/icons-react";
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
                <Group justify="space-between">
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
    const { sortBy } = payload;

    if (!sortBy) {
        return filterData(data, payload.search);
    }

    return filterData(
        [...data].sort((a, b) => {
            if (payload.reversed) {
                return b[sortBy].toString().localeCompare(a[sortBy].toString());
            }

            return a[sortBy].toString().localeCompare(b[sortBy].toString());
        }),
        payload.search
    );
}

export function TableSort() {
    const [search, setSearch] = useState("");
    const [sortedData, setSortedData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [sortBy, setSortBy] = useState(null);
    const [reverseSortDirection, setReverseSortDirection] = useState(false);

    useEffect(() => {
        fetch("http://localhost:8000/api/markets")
            .then((response) => response.json())
            .then((data) => {
                setSortedData(data);
                setFilteredData(filterData(data, search));
                console.log(data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [search]);

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
    };

    const rows = filteredData.map((row) => (
        <Table.Tr key={row.id_marche}>
            <Table.Td>{row.reference}</Table.Td>
            <Table.Td>{row.type_marche}</Table.Td>
            <Table.Td>{row.fournisseur}</Table.Td>
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
                miw={700}
                layout="fixed"
            >
                <Table.Tbody>
                    <Table.Tr>
                        <Th
                            sorted={sortBy === "reference"}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting("reference")}
                        >
                            Reference
                        </Th>
                        <Th
                            sorted={sortBy === "type_marche"}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting("type_marche")}
                        >
                            Type
                        </Th>
                        <Th
                            sorted={sortBy === "fournisseur"}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting("fournisseur")}
                        >
                            Fournisseur
                        </Th>
                    </Table.Tr>
                </Table.Tbody>
                <Table.Tbody>
                    {filteredData.length > 0 ? (
                        rows
                    ) : (
                        <Table.Tr>
                            <Table.Td colSpan={3}>
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
