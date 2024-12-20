import { ActionIcon, Drawer, Flex, ModalBaseOverlayProps, Title } from "@mantine/core";
import { Article, useArticleStore } from "../stores/useArticleStore.ts";
import { useDisclosure } from "@mantine/hooks";
import { EditArticle } from "../components/EditArticle.tsx";
import { IconMaximize, IconPlus } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { ArticlesTable } from "../components/ArticlesTable.tsx";

export const Articles = () => {
    const { articles, selectArticle, selectedArticle, editArticle } = useArticleStore();
    const [opened, { open, close }] = useDisclosure(false);
    const navigate = useNavigate();

    const openDrawer = (article: Article) => {
        selectArticle(article);
        open();
    };

    const onCreateArticle = () => {
        selectArticle(null);
        open();
    };

    const expandView = () => {
        close();
        navigate("/articles/" + selectedArticle?.id);
    };

    const modalOverlayProps: ModalBaseOverlayProps = {
        backgroundOpacity: 0.15,
    };

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
            <ArticlesTable articles={articles} onRowClick={openDrawer} />
            <Drawer
                overlayProps={modalOverlayProps}
                position={"right"}
                size={"lg"}
                opened={opened}
                onClose={close}
                pos={"relative"}
            >
                <ActionIcon
                    pos={"absolute"}
                    top={12}
                    left={12}
                    style={{
                        zIndex: 10000000000,
                    }}
                    color={"gray"}
                    variant="light"
                    aria-label="Close drawer"
                    onClick={expandView}
                >
                    <IconMaximize />
                </ActionIcon>
                <Title order={1}>{selectedArticle ? "Edit Article" : "Create Article"}</Title>

                <EditArticle article={editArticle} />
            </Drawer>
        </>
    );
};
