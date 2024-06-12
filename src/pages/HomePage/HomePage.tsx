import React, {useState} from "react";
import Header from "src/components/header/Header.tsx";
import List from "src/components/list/List.tsx";
import Display from "src/components/display/Display.tsx";

const HomePage: React.FC = () => {
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

    const handleItemClick = (itemId: string) => {
        setSelectedItemId(itemId);
    };
    function getQueryParams() {
        const params = {};
        window.location.search.substring(1).split("&").forEach(pair => {
            const [key, value] = pair.split("=");
            params[decodeURIComponent(key)] = decodeURIComponent(value || "");
        });
        return params;
    }

    const queryParams = getQueryParams();

    if (queryParams.jwt_token && queryParams.refresh_token) {
        localStorage.setItem("jwt_token", queryParams.jwt_token);
        localStorage.setItem("refresh_token", queryParams.refresh_token);

        // Опционально: перенаправить пользователя на другую страницу после сохранения токенов
        window.location.href = "/home";  // Замените на нужный вам маршрут
    } else {
        console.error("Токены не найдены в URL");
    }

    return (
        <div className="container">
            <Header />
            <List selectedItemId={selectedItemId} onItemClick={handleItemClick} />
            <Display selectedItemId={selectedItemId} />
        </div>
    );
};

export default HomePage;
