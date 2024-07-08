import React, { useState, useEffect } from 'react';
import './List.css';
import useTreeQuery from "src/lib/hooks/tree.ts";
import { ToolModuleGroup, ToolModuleType, ToolModule } from 'src/types/interfaces';

interface ListProps {
    selectedItemId: string | null;
    onItemClick: (itemId: string) => void;
}

const List: React.FC<ListProps> = ({ selectedItemId, onItemClick }) => {
    const { loading, error, data } = useTreeQuery();
    const [openLevel2, setOpenLevel2] = useState<string | null>(null);
    const [openLevel3, setOpenLevel3] = useState<string | null>(null);
    const [searchText, setSearchText] = useState<string>('');
    const [selectedLevel3, setSelectedLevel3] = useState<string | null>(null);
    const [selectedSort, setSelectedSort] = useState<string>('novelty');
    const [sortedData, setSortedData] = useState<ToolModuleGroup[]>([]);

    useEffect(() => {
        if (data) {
            setSortedData(sortData(data.toolModuleGroups, selectedSort));
        }
    }, [data, selectedSort]);

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

    const handleCheckboxChange = (value: string) => {
        setSelectedSort(value);
    };

    const handleSearch = () => {
        // Обработка поиска
    };

    const sortData = (data: ToolModuleGroup[], sortBy: string) => {
        if (sortBy === 'novelty') {
            return [...data].sort((a, b) => {
                const aDate = a.toolmoduletypeSet?.[0]?.toolmoduleSet?.[0]?.dbdate;
                const bDate = b.toolmoduletypeSet?.[0]?.toolmoduleSet?.[0]?.dbdate;
                return new Date(bDate).getTime() - new Date(aDate).getTime();
            });
        } else if (sortBy === 'alphabet') {
            return [...data].sort((a, b) => a.name.localeCompare(b.name));
        }
        return data;
    };

    if (loading) return console.log(loading);
    if (error) return console.log(error);

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
                    <label className="custom-checkbox">
                        <input
                            type="checkbox"
                            name="sort"
                            value="novelty"
                            checked={selectedSort === 'novelty'}
                            onChange={() => handleCheckboxChange('novelty')}
                        />
                        <span className="checkmark"></span>
                        <p>by novelty</p>
                    </label>
                    <label className="custom-checkbox">
                        <input
                            type="checkbox"
                            name="sort"
                            value="alphabet"
                            checked={selectedSort === 'alphabet'}
                            onChange={() => handleCheckboxChange('alphabet')}
                        />
                        <span className="checkmark"></span>
                        <p>by alphabet</p>
                    </label>
                </div>
            </div>
            <div className="list">
                <ul className="level1">
                    {sortedData.map((group: ToolModuleGroup) => {
                        if (!group.name) return null;

                        return (
                            <li key={group.id} onClick={() => handleItemClick('level1', group.id)}>
                                {group.name}
                                {openLevel2 === group.id && (
                                    <ul className="level2">
                                        {group.toolmoduletypeSet.map((type: ToolModuleType) => {
                                            if (!type.name) return null;

                                            return (
                                                <li key={type.id} onClick={() => handleItemClick('level2', type.id)}>
                                                    {type.name}
                                                    {openLevel3 !== null && openLevel3 === type.id && (
                                                        <ul className="level3">
                                                            {type.toolmoduleSet?.map((module: ToolModule) => (
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