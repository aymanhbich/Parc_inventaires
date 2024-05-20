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
    keys,
} from "@mantine/core";
import {
    IconSelector,
    IconChevronDown,
    IconChevronUp,
    IconSearch,
} from "@tabler/icons-react";
import classes from "./TableSort.module.css";
import { useFetch } from "@mantine/hooks"; // Assuming this is the correct import path

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
        keys(item).some((key) => {
            const value = item[key];
            if (typeof value === "string") {
                return value.toLowerCase().includes(query);
            }
            return false;
        })
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
                return b[sortBy].localeCompare(a[sortBy]);
            }

            return a[sortBy].localeCompare(b[sortBy]);
        }),
        payload.search
    );
}

export function TableSort() {
    const [search, setSearch] = useState("");
    const [sortedData, setSortedData] = useState(null); // Initialize as null for asynchronous data fetching
    const [sortBy, setSortBy] = useState(null);
    const [reverseSortDirection, setReverseSortDirection] = useState(false);

    const { data, loading, error, refetch } = useFetch(
        "https://jsonplaceholder.typicode.com/todos"
    );

    useEffect(() => {
        if (data) {
            setSortedData(
                sortData(data, {
                    sortBy,
                    reversed: reverseSortDirection,
                    search,
                })
            );
        }
    }, [data, sortBy, reverseSortDirection, search]);

    const setSorting = (field) => {
        const reversed = field === sortBy ? !reverseSortDirection : false;
        setReverseSortDirection(reversed);
        setSortBy(field);
    };

    const handleSearchChange = (event) => {
        const { value } = event.currentTarget;
        setSearch(value);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const rows = sortedData
        ? sortedData.map((row) => (
              <Table.Tr key={row.name}>
                  <Table.Td>{row.name}</Table.Td>
                  <Table.Td>{row.email}</Table.Td>
                  <Table.Td>{row.company}</Table.Td>
              </Table.Tr>
          ))
        : null;

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
                            sorted={sortBy === "name"}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting("name")}
                        >
                            Name
                        </Th>
                        <Th
                            sorted={sortBy === "email"}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting("email")}
                        >
                            Email
                        </Th>
                        <Th
                            sorted={sortBy === "company"}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting("company")}
                        >
                            Company
                        </Th>
                    </Table.Tr>
                </Table.Tbody>
                <Table.Tbody>
                    {rows && rows.length > 0 ? (
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
