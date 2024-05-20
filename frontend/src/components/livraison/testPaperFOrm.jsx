import { Accordion } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { axiosClient } from "../../api/axios";

export const TestPaperFOrm = () => {
    const groceries = [
        {
            emoji: "🍎",
            value: "Apples",
            description:
                "Crisp and refreshing fruit. Apples are known for their versatility and nutritional benefits. They come in a variety of flavors and are great for snacking, baking, or adding to salads.",
        },
        {
            emoji: "🍌",
            value: "Bananas",
            description:
                "Naturally sweet and potassium-rich fruit. Bananas are a popular choice for their energy-boosting properties and can be enjoyed as a quick snack, added to smoothies, or used in baking.",
        },
        {
            emoji: "🥦",
            value: "Broccoli",
            description:
                "Nutrient-packed green vegetable. Broccoli is packed with vitamins, minerals, and fiber. It has a distinct flavor and can be enjoyed steamed, roasted, or added to stir-fries.",
        },
    ];
    const Articlesz = [
        {
            id_article: "1",
            design_article: "Article Produit combustibles 1",
            id_produit: 1,
            code_bar: "8268260536",
            unite_de_article: "unite",
            created_at: "2024-05-04T23:17:50.000000Z",
            updated_at: "2024-05-04T23:17:50.000000Z",
            value: "test",
        },
        {
            id_article: "2",
            design_article: "Article Produit combustibles 2",
            id_produit: 1,
            code_bar: "5662971773",
            unite_de_article: "kg",
            created_at: "2024-05-04T23:17:50.000000Z",
            updated_at: "2024-05-04T23:17:50.000000Z",
            value: "test",
        },
        {
            id_article: "3",
            design_article: "Article Produit combustibles 3",
            id_produit: 1,
            code_bar: "4666934367",
            unite_de_article: "unite",
            created_at: "2024-05-04T23:17:50.000000Z",
            updated_at: "2024-05-04T23:17:50.000000Z",
            value: "test",
        },
        {
            id_article: "4",
            design_article: "Article Produit combustibles 4",
            id_produit: 1,
            code_bar: "5352364291",
            unite_de_article: "unite",
            created_at: "2024-05-04T23:17:50.000000Z",
            updated_at: "2024-05-04T23:17:50.000000Z",
            value: "test",
        },
    ];
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        axiosClient
            .get("/articles")
            .then((response) => {
                setArticles(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    const items = articles.map((item, index) => (
        <Accordion.Item key={index} value={item.design_article}>
            <Accordion.Control>{item.design_article}</Accordion.Control>
            <Accordion.Panel>{item.unite_de_article}</Accordion.Panel>
        </Accordion.Item>
    ));
    return <Accordion variant="separated">{items}</Accordion>;
};
