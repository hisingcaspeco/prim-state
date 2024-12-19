import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Articles } from "./views/Articles.tsx";
import { Article } from "./views/Article.tsx";
import { Home } from "./views/Home.tsx";
import { Container, List, MantineProvider } from "@mantine/core";

function App() {
    return (
        <Router>
            <MantineProvider>
                <Container size={"lg"}>
                    <List>
                        <List.Item>
                            <Link to={"/"}>Home</Link>
                        </List.Item>
                        <List.Item>
                            <Link to={"/articles"}>Articles</Link>
                        </List.Item>
                    </List>

                    <Routes>
                        <Route path={"/"} element={<Home />} />
                        <Route path={"/articles"} element={<Articles />} />
                        <Route path={"/articles/:id"} element={<Article />} />
                    </Routes>
                </Container>
            </MantineProvider>
        </Router>
    );
}

export default App;
