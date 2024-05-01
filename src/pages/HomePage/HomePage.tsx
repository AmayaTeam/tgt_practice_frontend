// Ваш компонент HomePage.tsx
import React from "react";
import Header from "../../components/header/Header.tsx";
import List from "../../components/list/List.tsx";
import Display from "../../components/display/Display.tsx";

const HomePage: React.FC = () => {
    return (
        <div className="container">
            <Header/>
            <List />
            <Display />
        </div>
    );
};

export default HomePage;
