import { ActionIcon, Drawer, Flex, Table, Title } from "@mantine/core";
import { Article, useArticleStore } from "../stores/useArticleStore.ts";
import { useDisclosure } from "@mantine/hooks";
import { EditArticle } from "../components/EditArticle.tsx";
import { IconPlus } from "@tabler/icons-react";

export const Articles = () => {
    const { articles, selectArticle, selectedArticle } = useArticleStore();
    const [opened, { open, close }] = useDisclosure(false);

    const openDrawer = (article: Article) => {
        selectArticle(article);
        open();
    };

    const onCreateArticle = () => {
        selectArticle(null);
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
            <Table.Td>{element.category}</Table.Td>
            <Table.Td>{element.price}</Table.Td>
        </Table.Tr>
    ));

    const ths = (
        <Table.Tr>
            <Table.Th>Title</Table.Th>
            <Table.Th>Category</Table.Th>
            <Table.Th>Price</Table.Th>
        </Table.Tr>
    );

    return (
        <>
            <Flex my={"md"} align={"center"} justify={"space-between"}>
                <Title order={1}>Articles</Title>
                <ActionIcon
                    size={"xl"}
                    radius={"xl"}
                    color={"blue.4"}
                    variant="filled"
                    aria-label="Add article"
                    onClick={onCreateArticle}
                >
                    <IconPlus />
                </ActionIcon>
            </Flex>
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
