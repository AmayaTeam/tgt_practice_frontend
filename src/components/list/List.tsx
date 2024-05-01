import React, { useState } from 'react';
import './List.css';
import useTreeQuery from "../../lib/hooks/tree.ts";

const List: React.FC = () => {
    const { loading, error, data } = useTreeQuery();
    const [openLevel2, setOpenLevel2] = useState<number | null>(null); // Состояние для открытия/закрытия второго уровня
    const [openLevel3, setOpenLevel3] = useState<number | null>(null); // Состояние для открытия/закрытия третьего уровня
    const [searchText, setSearchText] = useState<string>(''); // Состояние для текста поиска

    const handleItemClick = (level: string, index: number) => {
        switch (level) {
            case 'level1':
                setOpenLevel2(openLevel2 === index ? null : index);
                // setOpenLevel3(null);
                break;
            case 'level2':
                if (openLevel2 === index) {
                    setOpenLevel3(openLevel3 === index ? null : index);
                } else {
                    setOpenLevel2(index);
                    setOpenLevel3(index);
                }
                break;
            default:
                break;
        }
    };


    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    const handleSearch = () => {
        // Обработка поиска
    };

    if (loading) return <p>Loading...</p>; // Отображаем загрузку данных
    if (error) return <p>Error :(</p>;

    return (
        <div className="list-container">
            <div className="search">
                <input
                    type="text"
                    value={searchText}
                    onChange={handleSearchChange}
                    placeholder="Enter..."
                    className="search-input"
                />
                <button onClick={handleSearch} className="search-button">SEARCH</button>
            </div>
            <div className="sort">
                <div className="sort-label"><p>Sort :</p></div>
                <div className="sort-options">
                    <label>
                        <input type="checkbox" name="sort" value="novelty" defaultChecked/>
                        <span>by novelty</span>
                    </label>
                    <label>
                        <input type="checkbox" name="sort" value="alphabet"/>
                        <span>by alphabet</span>
                    </label>
                </div>
            </div>
            <div className="list">
                <ul className="level1">

                    {data.toolModuleGroups.map((group: any, index: number) => {
                        if (!group.name) return null;

                        return (
                            <li key={index} onClick={() => handleItemClick('level1', index)}>
                                {group.name}
                                {openLevel2 === index && (
                                    <ul className="level2">
                                        {group.toolmoduletypeSet.map((type: any, typeIndex: number) => {
                                            if (!type.name) return null;

                                            return (
                                                <li key={typeIndex}
                                                    onClick={() => handleItemClick('level2', typeIndex)}>
                                                    {type.name}
                                                    {openLevel3 !== null && openLevel3 === typeIndex && (
                                                        <ul className="level3">
                                                            {type.toolmoduleSet.map((module: any, i: number) => (
                                                                <li key={i}>{module.dbtname}</li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

export default List;
