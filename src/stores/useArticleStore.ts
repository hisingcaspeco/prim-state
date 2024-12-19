import articlesData from "../articles.json";
import { create } from "zustand";

export type Article = {
    id: string;
    title: string;
    content: string;
    author: string;
    category: string;
    createdAt: string;
    updatedAt: string;
};

type ArticleState = {
    articles: Article[];
    selectedArticle: Article | null;
    setArticles: (articles: Article[]) => void;
    selectArticle: (article: Article | null) => void;
    updateArticle: (id: string, data: Partial<Article>) => void;
};

export const useArticleStore = create<ArticleState>((set) => ({
    articles: articlesData, // Initialize with JSON data
    selectedArticle: null,
    setArticles: (articles) => set(() => ({ articles })),
    selectArticle: (article) => set(() => ({ selectedArticle: article })),
    updateArticle: (id, data) =>
        set((state) => ({
            articles: state.articles.map((article) =>
                article.id === id ? { ...article, ...data } : article,
            ),
        })),
}));
