import { useState } from "react";
import { Article } from "../stores/useArticleStore.ts";
import { Box, Table, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

type ArticlesTableProps = {
    articles: Article[];
    onRowClick: (article: Article) => void;
};

export const ArticlesTable = ({ articles, onRowClick }: ArticlesTableProps) => {
    const [filter, setFilter] = useState("");
    const [sortBy, setSortBy] = useState<keyof Article | null>(null);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    // Filtered and Sorted Articles
    const filteredAndSortedArticles = articles
        .filter(
            (article) =>
                article.title.toLowerCase().includes(filter.toLowerCase()) ||
                article.category.toLowerCase().includes(filter.toLowerCase()),
        )
        .sort((a, b) => {
            if (!sortBy) return 0;
            if (sortOrder === "asc") {
                return a[sortBy] > b[sortBy] ? 1 : -1;
            } else {
                return a[sortBy] < b[sortBy] ? 1 : -1;
            }
        });

    // Sorting Handler
    const handleSort = (column: keyof Article) => {
        if (sortBy === column) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortBy(column);
            setSortOrder("asc");
        }
    };

    // Rows
    const rows = filteredAndSortedArticles.map((element) => (
        <Table.Tr
            key={element.id}
            onClick={() => {
                onRowClick(element);
            }}
        >
            <Table.Td>{element.title}</Table.Td>
            <Table.Td>{element.category}</Table.Td>
            <Table.Td>{element.price}</Table.Td>
        </Table.Tr>
    ));

    // Headers
    const ths = (
        <Table.Tr>
            <Table.Th onClick={() => handleSort("title")} style={{ cursor: "pointer" }}>
                Title {sortBy === "title" && (sortOrder === "asc" ? "↑" : "↓")}
            </Table.Th>
            <Table.Th onClick={() => handleSort("category")} style={{ cursor: "pointer" }}>
                Category {sortBy === "category" && (sortOrder === "asc" ? "↑" : "↓")}
            </Table.Th>
            <Table.Th onClick={() => handleSort("price")} style={{ cursor: "pointer" }}>
                Price {sortBy === "price" && (sortOrder === "asc" ? "↑" : "↓")}
            </Table.Th>
        </Table.Tr>
    );

    return (
        <Box>
            <TextInput
                leftSection={<IconSearch size={16} />}
                placeholder="Search by title or category"
                value={filter}
                onChange={(e) => setFilter(e.currentTarget.value)}
                mb="md"
            />

            <Table withTableBorder striped highlightOnHover>
                <Table.Thead>{ths}</Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </Box>
    );
};
