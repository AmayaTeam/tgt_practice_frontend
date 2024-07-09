import React from 'react';

interface SearchBarProps {
    searchText: string;
    onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchText, onSearchChange, onSearch }) => {
    return (
        <div className="search">
            <input
                type="text"
                value={searchText}
                onChange={onSearchChange}
                placeholder="Enter..."
                className="search-input"
            />
            <button onClick={onSearch} className="search-button"><p>SEARCH</p></button>
        </div>
    );
};

export default SearchBar;
