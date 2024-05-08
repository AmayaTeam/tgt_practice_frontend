import React, {useState} from "react";
import Header from "../../components/header/Header.tsx";
import List from "../../components/list/List.tsx";
import Display from "../../components/display/Display.tsx";

const HomePage: React.FC = () => {
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

    const handleItemClick = (itemId: string) => {
        setSelectedItemId(itemId);
    };

    return (
        <div className="container">
            <Header />
            <List selectedItemId={selectedItemId} onItemClick={handleItemClick} />
            <Display selectedItemId={selectedItemId} />
        </div>
    );
};

export default HomePage;
