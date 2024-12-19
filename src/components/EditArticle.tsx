import { Article } from "../stores/useArticleStore.ts";
import { Button, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

interface EditArticleProps {
    article: Article;
}

export const EditArticle = ({ article }: EditArticleProps) => {
    const form = useForm({
        initialValues: article,
        validate: {
            title: (value) =>
                value.trim().length < 10 ? "Title must be at least 10 characters" : null,
            content: (value) =>
                value.trim().length < 10 ? "Content must be at least 10 characters" : null,
            author: (value) =>
                value.trim().length < 2 ? "Author must be at least 2 characters" : null,
            category: (value) =>
                value.trim().length < 2 ? "Category must be at least 2 characters" : null,
        },
    });

    // We should enable submit button if form is dirty and valid
    const isSubmitDisabled = !form.isValid() || !form.isDirty();

    return (
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
            <Stack gap="md">
                <TextInput
                    label="Title"
                    withAsterisk
                    placeholder={"Title"}
                    {...form.getInputProps("title")}
                />
                <TextInput
                    label="Content"
                    withAsterisk
                    placeholder={"Content"}
                    {...form.getInputProps("content")}
                />
                <TextInput
                    label="Author"
                    withAsterisk
                    placeholder={"Author"}
                    {...form.getInputProps("author")}
                />
                <TextInput
                    label="Category"
                    withAsterisk
                    placeholder={"Category"}
                    {...form.getInputProps("category")}
                />
                <Button disabled={isSubmitDisabled} size={"md"} type="submit" variant="filled">
                    Save
                </Button>
            </Stack>
        </form>
    );
};
