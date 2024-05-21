import React, { useState } from 'react';
import './List.css';
import useTreeQuery from "../../lib/hooks/tree.ts";

interface ListProps {
    selectedItemId: string | null;
    onItemClick: (itemId: string) => void;
}

const List: React.FC<ListProps> = ({ selectedItemId, onItemClick }) => {
    const { loading, error, data } = useTreeQuery();
    const [openLevel2, setOpenLevel2] = useState<string | null>(null); // Состояние для открытия/закрытия второго уровня
    const [openLevel3, setOpenLevel3] = useState<string | null>(null); // Состояние для открытия/закрытия третьего уровня
    const [searchText, setSearchText] = useState<string>(''); // Состояние для текста поиска
    const [selectedLevel3, setSelectedLevel3] = useState<string | null>(null);

    

    const handleItemClick = (level: string, id: string) => {
        console.log(level, id);
        switch (level) {
            case 'level1':
                setOpenLevel2(id);
                break;
            case 'level2':
                if (openLevel2 === id) {
                    setOpenLevel3(null);
                } else {
                    setOpenLevel2(id);
                    setOpenLevel3(id);
                }
                break;
            case 'level3':
                setSelectedLevel3(prevState => (prevState === id ? null : id));
                onItemClick(id);
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
                <button onClick={handleSearch} className="search-button"><p>SEARCH</p></button>
            </div>
            <div className="sort">
                <div className="sort-label">
                    <p>Sort :</p>
                </div>
                <div className="sort-options">
                    <label>
                        <input type="checkbox" name="sort" value="novelty" defaultChecked/>
                        <p>by novelty</p>
                    </label>
                    <label>
                        <input type="checkbox" name="sort" value="alphabet"/>
                        <p>by alphabet</p>
                    </label>
                </div>
            </div>
            <div className="list">
                <ul className="level1">

                    {data.toolModuleGroups.map((group: any) => {
                        if (!group.name) return null;

                        return (
                            <li key={group.id} onClick={() => handleItemClick('level1', group.id)}>
                                {group.name}
                                {openLevel2 === group.id && (
                                    <ul className="level2">
                                        {group.toolmoduletypeSet.map((type: any) => {
                                            if (!type.name) return null;

                                            return (
                                                <li key={type.id}
                                                    onClick={() => handleItemClick('level2', type.id)}>
                                                    {type.name}
                                                    {openLevel3 !== null && openLevel3 === type.id && (
                                                        <ul className="level3">
                                                            {type.toolmoduleSet.map((module: any) => (
                                                                <li
                                                                    key={module.id}
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        handleItemClick('level3', module.id);
                                                                    }}
                                                                    className={selectedLevel3 === module.id ? 'selected' : ''}
                                                                >
                                                                    {module.sn}
                                                                </li>
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
