// import { useEffect, useMemo, useState } from "react";
// import { MantineReactTable, useMantineReactTable } from "mantine-react-table";

// const Example = () => {
//     //data and fetching state
//     const [data, setData] = useState([]);
//     const [isError, setIsError] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);
//     const [isRefetching, setIsRefetching] = useState(false);
//     const [rowCount, setRowCount] = useState(0);

//     //table state
//     const [columnFilters, setColumnFilters] = useState([]);
//     const [globalFilter, setGlobalFilter] = useState("");
//     const [sorting, setSorting] = useState([]);
//     const [pagination, setPagination] = useState({
//         pageIndex: 0,
//         pageSize: 10,
//     });

//     //if you want to avoid useEffect, look at the React Query example instead
//     useEffect(() => {
//         const fetchData = async () => {
//             if (!data.length) {
//                 setIsLoading(true);
//             } else {
//                 setIsRefetching(true);
//             }

//             const url = new URL(
//                 "/api/data",
//                 process.env.NODE_ENV === "production"
//                     ? "https://www.mantine-react-table.com"
//                     : "http://localhost:3001"
//             );
//             url.searchParams.set(
//                 "start",
//                 `${pagination.pageIndex * pagination.pageSize}`
//             );
//             url.searchParams.set("size", `${pagination.pageSize}`);
//             url.searchParams.set(
//                 "filters",
//                 JSON.stringify(columnFilters ?? [])
//             );
//             url.searchParams.set("globalFilter", globalFilter ?? "");
//             url.searchParams.set("sorting", JSON.stringify(sorting ?? []));

//             try {
//                 const response = await fetch(url.href);
//                 const json = await response.json();
//                 setData(json.data);
//                 setRowCount(json.meta.totalRowCount);
//             } catch (error) {
//                 setIsError(true);
//                 console.error(error);
//                 return;
//             }
//             setIsError(false);
//             setIsLoading(false);
//             setIsRefetching(false);
//         };
//         fetchData();
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [
//         columnFilters, //refetch when column filters change
//         globalFilter, //refetch when global filter changes
//         pagination.pageIndex, //refetch when page index changes
//         pagination.pageSize, //refetch when page size changes
//         sorting, //refetch when sorting changes
//     ]);

//     const columns = useMemo(
//         () => [
//             {
//                 accessorKey: "firstName",
//                 header: "First Name",
//             },

//             {
//                 accessorKey: "lastName",
//                 header: "Last Name",
//             },
//             {
//                 accessorKey: "address",
//                 header: "Address",
//             },
//             {
//                 accessorKey: "state",
//                 header: "State",
//             },
//             {
//                 accessorKey: "phoneNumber",
//                 header: "Phone Number",
//             },
//         ],
//         []
//     );

//     const table = useMantineReactTable({
//         columns,
//         data,
//         enableRowSelection: true,
//         getRowId: (row) => row.phoneNumber,
//         initialState: { showColumnFilters: true },
//         manualFiltering: true,
//         manualPagination: true,
//         manualSorting: true,
//         rowCount,
//         onColumnFiltersChange: setColumnFilters,
//         onGlobalFilterChange: setGlobalFilter,
//         onPaginationChange: setPagination,
//         onSortingChange: setSorting,
//         state: {
//             columnFilters,
//             globalFilter,
//             isLoading,
//             pagination,
//             showAlertBanner: isError,
//             showProgressBars: isRefetching,
//             sorting,
//         },
//         mantineToolbarAlertBannerProps: isError
//             ? { color: "red", children: "Error loading data" }
//             : undefined,
//     });

//     return <MantineReactTable table={table} />;
// };

// export default Example;
