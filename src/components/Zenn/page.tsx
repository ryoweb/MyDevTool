"use client";
import { useEffect, useState } from 'react';
import { Accordion, AccordionItem, Avatar, Pagination, CircularProgress } from '@nextui-org/react';

type Item = {
    id: string;
    title: string;
    slug: string;
    likesCount: number;
    user: {
        username: string;
        avatarSmallUrl: string;
    };
};

export default function Zenn() {
    const [data, setData] = useState<Item[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const itemsPerPage = 3;

    useEffect(() => {
        const fetchZenn = async () => {
            setIsLoading(true);
            const res = await fetch('https://zenn-api.vercel.app/api/trendTech');
            const data = await res.json();
            setData(data);
            setIsLoading(false);
        }
        fetchZenn();
    }, [itemsPerPage]);

    const getItems = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return data.slice(startIndex, endIndex);
    }

    return (
        <div>
            {isLoading ? (
                <div className="flex">
                    <CircularProgress color="primary" size="lg" />
                </div>
            ) : (
                <div>
                    <Accordion selectionMode="multiple">
                        {getItems().map((item) => (
                            <AccordionItem
                                key={item.id}
                                aria-label={item.title}
                                startContent={
                                    <Avatar
                                        isBordered
                                        color="default"
                                        radius="lg"
                                        src={item.user.avatarSmallUrl}
                                    />
                                }
                                subtitle={item.likesCount}
                                title={
                                    <a href={`https://zenn.dev/${item.user.username}/articles/${item.slug}`} target="_blank" rel="noopener noreferrer">
                                        {item.title}
                                    </a>
                                }
                            >
                            </AccordionItem>
                        ))}
                    </Accordion >
                    <Pagination total={7} initialPage={1} variant={"bordered"} onChange={(page) => setCurrentPage(page)}
                    />
                </div>
            )}
        </div>
    )
}