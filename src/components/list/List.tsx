import React, { useState } from 'react';
import './List.css'; // Подключаем CSS для стилизации компонента

const List: React.FC = () => {
    const [openLevel2, setOpenLevel2] = useState<number | null>(null); // Состояние для открытия/закрытия второго уровня
    const [openLevel3, setOpenLevel3] = useState<number | null>(null); // Состояние для открытия/закрытия третьего уровня
    const [searchText, setSearchText] = useState<string>(''); // Состояние для текста поиска

    const handleItemClick = (level: string, index: number) => {
        switch (level) {
            case 'level1':
                setOpenLevel2(openLevel2 === index ? null : index); // Инвертируем состояние открытия/закрытия второго уровня
                setOpenLevel3(null); // Закрываем третий уровень
                break;
            case 'level2':
                setOpenLevel3(openLevel3 === index ? null : index); // Инвертируем состояние открытия/закрытия третьего уровня
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
                        <input type="checkbox" name="sort" value="novelty" defaultChecked />
                        <span>by novelty</span>
                    </label>
                    <label>
                        <input type="checkbox" name="sort" value="alphabet" />
                        <span>by alphabet</span>
                    </label>
                </div>
            </div>
            <div className="list">
                <ul className="level1">
                    <li onClick={() => handleItemClick('level1', 1)}>Уровень 1</li>
                    {openLevel2 === 1 && (
                        <ul className="level2">
                            <li onClick={() => handleItemClick('level2', 1)}>Уровень 2</li>
                            <li onClick={() => handleItemClick('level2', 2)}>Уровень 2</li>
                            <li onClick={() => handleItemClick('level2', 3)}>Уровень 2</li>
                        </ul>
                    )}
                </ul>
                {openLevel3 !== null && openLevel2 !== null && (
                    <ul className="level3">
                        <li>Уровень 3</li>
                        <li>Уровень 3</li>
                        <li>Уровень 3</li>
                    </ul>
                )}
            </div>
        </div>
    );
}

export default List;
