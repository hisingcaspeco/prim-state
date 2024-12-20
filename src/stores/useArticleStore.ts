import articlesData from "../articles.json";
import { create } from "zustand";

export type Article = {
    id: string;
    title: string;
    content: string;
    price: number;
    category: string;
    createdAt: string;
    updatedAt: string;
};

type ArticleState = {
    articles: Article[];
    selectedArticle: Article | null;
    editArticle: Article | null;
    setArticles: (articles: Article[]) => void;
    selectArticle: (article: Article | null) => void;
    setEditArticle: (article: Partial<Article> | null) => void;
    submitEditArticle: () => void;
    updateArticle: (id: string, data: Partial<Article>) => void;
};

export const useArticleStore = create<ArticleState>((set, get) => ({
    articles: articlesData, // Initialize with JSON data
    selectedArticle: null,
    editArticle: null,

    setArticles: (articles) => set(() => ({ articles })),

    selectArticle: (article) => {
        set(() => ({
            selectedArticle: article,
            editArticle: article ? { ...article } : null, // Initialize editArticle
        }));
    },

    setEditArticle: (data) => {
        set((state) => ({
            editArticle: state.editArticle ? { ...state.editArticle, ...data } : null, // Update only the editArticle
        }));
    },

    submitEditArticle: () => {
        const { editArticle, selectedArticle, articles } = get();
        if (!editArticle || !selectedArticle) return;

        // Commit changes to articles and selectedArticle
        set({
            articles: articles.map((article) =>
                article.id === editArticle.id ? { ...editArticle } : article,
            ),
            selectedArticle: { ...editArticle }, // Update the selectedArticle
            editArticle: null, // Clear editArticle
        });
    },

    updateArticle: (id, data) =>
        set((state) => ({
            articles: state.articles.map((article) =>
                article.id === id ? { ...article, ...data } : article,
            ),
        })),
}));
