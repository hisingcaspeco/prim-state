import { Drawer, Table } from "@mantine/core";
import { Article, useArticleStore } from "../stores/useArticleStore.ts";
import { useDisclosure } from "@mantine/hooks";
import { EditArticle } from "../components/EditArticle.tsx";

export const Articles = () => {
    const { articles, selectArticle, selectedArticle } = useArticleStore();
    const [opened, { open, close }] = useDisclosure(false);

    const openDrawer = (article: Article) => {
        selectArticle(article);
        open();
    };

    const rows = articles.map((element) => (
        <Table.Tr
            key={element.id}
            onClick={() => {
                openDrawer(element);
            }}
        >
            <Table.Td>{element.title}</Table.Td>
            <Table.Td>{element.author}</Table.Td>
            <Table.Td>{element.category}</Table.Td>
        </Table.Tr>
    ));

    const ths = (
        <Table.Tr>
            <Table.Th>Title</Table.Th>
            <Table.Th>Author</Table.Th>
            <Table.Th>Category</Table.Th>
        </Table.Tr>
    );

    return (
        <>
            <Table withTableBorder striped highlightOnHover>
                <Table.Thead>{ths}</Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
            <Drawer position={"right"} size={"lg"} opened={opened} onClose={close}>
                <EditArticle article={selectedArticle} />
            </Drawer>
        </>
    );
};
