import React, {useState} from "react";
import Header from "../../components/header/Header.tsx";
import List from "../../components/list/List.tsx";
import Display from "../../components/display/Display.tsx";

const HomePage: React.FC = () => {
    const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);

    const handleModuleSelect = (moduleId: string) => {
        setSelectedModuleId(moduleId);
    };

    return (
        <div className="container">
            <Header/>
            <List onModuleSelect={handleModuleSelect}/>
            <Display selectedModuleId={selectedModuleId} />
        </div>
    );
};

export default HomePage;
