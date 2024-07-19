import React, { useState, useEffect } from 'react';
import './List.css';
import useTreeQuery from 'src/lib/hooks/tree.ts';
import { ToolModuleGroup } from 'src/types/interfaces';
import SearchBar from './listComponents/searchBar';
import SortOptions from './listComponents/sortOptions';
import LevelList from './listComponents/levelList';
import Modal from '../Modal/Modal';
interface ListProps {
    onItemClick: (itemId: string) => void;
}

const List: React.FC<ListProps> = ({ onItemClick }) => {
    const { loading, error, data } = useTreeQuery();
    const [searchText, setSearchText] = useState<string>('');
    const [selectedSort, setSelectedSort] = useState<string>('novelty');
    const [sortedData, setSortedData] = useState<ToolModuleGroup[]>([]);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

    useEffect(() => {
        if (data) {
            setSortedData(sortData(data.toolModuleGroups, selectedSort));
        }
    }, [data, selectedSort]);

    useEffect(() => {
        if (data) {
            setSortedData(
                sortData(data.toolModuleGroups, selectedSort).filter(group =>
                    group.name.toLowerCase().includes(searchText.toLowerCase()) ||
                    group.toolmoduletypeSet.some(type =>
                        type.name.toLowerCase().includes(searchText.toLowerCase()) ||
                        type.toolmoduleSet?.some(module => module.sn.toLowerCase().includes(searchText.toLowerCase()))
                    )
                )
            );
        }
    }, [data, selectedSort, searchText]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    const handleCheckboxChange = (value: string) => {
        setSelectedSort(value);
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

    const handleItemClick = (itemId: string) => {
        if (hasUnsavedChanges) {
            setSelectedItemId(itemId);
            setShowModal(true);
        } else {
            onItemClick(itemId);
        }
    };
    
    

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleConfirmModal = () => {
        setShowModal(false);
        if (selectedItemId) {
            onItemClick(selectedItemId);
            setSelectedItemId(null);
            setHasUnsavedChanges(false); // Reset the unsaved changes flag
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="list-container">
            <SearchBar searchText={searchText} onSearchChange={handleSearchChange} />
            <SortOptions selectedSort={selectedSort} onCheckboxChange={handleCheckboxChange} />
            <LevelList
                sortedData={sortedData}
                onItemClick={handleItemClick}
                setHasUnsavedChanges={setHasUnsavedChanges} 
            />
            {showModal && (
                <Modal
                    onClose={handleCloseModal}
                    onConfirm={handleConfirmModal}
                    message="You have unsaved changes. Please save or cancel your changes."
                />
            )}
        </div>
    );
};

export default List;
