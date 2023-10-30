import { useEffect, useState } from 'react';
import { Accordion, AccordionItem, Avatar, Pagination, CircularProgress } from '@nextui-org/react';

export default function Zenn() {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true); // ロード中かどうかを示す状態

    const itemsPerPage = 3; // 1ページあたりの記事数

    useEffect(() => {
        const fetchZenn = async () => {
            setIsLoading(true); // ロード中に設定する
            const res = await fetch('https://zenn-api.vercel.app/api/trendTech');
            const data = await res.json();
            setData(data);
            setIsLoading(false); // ロード完了に設定する
        }
        fetchZenn();
    }, []);

    // 現在のページに表示する記事を取得する関数
    const getItems = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return data.slice(startIndex, endIndex);
    }

    return (
        <div>
            {isLoading ? ( // ロード中の場合に表示するコンポーネント
                <div className="flex justify-center items-center h-screen">
                    <CircularProgress color="primary" size={100} />
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
                                        color={["primary", "success", "warning", "error"][Math.floor(Math.random() * 4)]}
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
                    <Pagination total={5} initialPage={1} onChange={(page) => setCurrentPage(page)}
                    />
                </div>
            )}
        </div>
    )
}