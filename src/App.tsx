import { Routes, Route, useNavigate } from "react-router-dom";
import { Articles } from "./views/Articles.tsx";
import { Article } from "./views/Article.tsx";
import { Home } from "./views/Home.tsx";
import { Container, MantineProvider, Tabs } from "@mantine/core";
import { IconArticle, IconHome } from "@tabler/icons-react";

function App() {
    const navigate = useNavigate();
    return (
        <MantineProvider defaultColorScheme={"auto"}>
            <Container size={"lg"}>
                <Tabs
                    defaultValue="home"
                    onChange={(value) => {
                        switch (value) {
                            case "home":
                                navigate("/");
                                break;
                            case "articles":
                                navigate("/articles");
                                break;
                        }
                    }}
                >
                    <Tabs.List>
                        <Tabs.Tab value="home" leftSection={<IconHome />}>
                            Home
                        </Tabs.Tab>
                        <Tabs.Tab value="articles" leftSection={<IconArticle />}>
                            Articles
                        </Tabs.Tab>
                    </Tabs.List>
                </Tabs>

                <Routes>
                    <Route path={"/"} element={<Home />} />
                    <Route path={"/articles"} element={<Articles />} />
                    <Route path={"/articles/:id"} element={<Article />} />
                </Routes>
            </Container>
        </MantineProvider>
    );
}

export default App;
