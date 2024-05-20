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

export function DeliveryList() {
    const [search, setSearch] = useState("");
    const [sortedData, setSortedData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [sortBy, setSortBy] = useState(null);
    const [reverseSortDirection, setReverseSortDirection] = useState(false);

    useEffect(() => {
        fetch("http://localhost:8000/api/livraison")
            .then((response) => response.json())
            .then((data) => {
                setSortedData(data);
                setFilteredData(filterData(data, search));
                console.log(data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    useEffect(() => {
        setFilteredData(filterData(sortedData, search));
    }, [search, sortedData]);

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
        <Table.Tr key={row.id_livraison}>
            <Table.Td>{row.date_livraison}</Table.Td>
            <Table.Td>{row.num_bl}</Table.Td>
            <Table.Td>{row.reference}</Table.Td>
            <Table.Td>{row.type_BL}</Table.Td>
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
                miw={700}
                layout="fixed"
            >
                <Table.Tbody>
                    <Table.Tr>
                        <Th
                            sorted={sortBy === "date_livraison"}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting("date_livraison")}
                        >
                            Date Livraison
                        </Th>
                        <Th
                            sorted={sortBy === "num_bl"}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting("num_bl")}
                        >
                            Num BL
                        </Th>
                        <Th
                            sorted={sortBy === "reference"}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting("reference")}
                        >
                            Reference
                        </Th>
                        <Th
                            sorted={sortBy === "type_BL"}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting("type_BL")}
                        >
                            Type BL
                        </Th>
                        <Th
                            sorted={sortBy === "commentaire"}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting("commentaire")}
                        >
                            Commentaire
                        </Th>
                    </Table.Tr>
                </Table.Tbody>
                <Table.Tbody>
                    {filteredData.length > 0 ? (
                        rows
                    ) : (
                        <Table.Tr>
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
