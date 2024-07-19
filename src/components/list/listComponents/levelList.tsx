import React, {useEffect, useState} from 'react';
import { ToolModuleGroup } from 'src/types/interfaces';
import ContextMenu from './ContextMenu';
import { useDeleteToolModuleGroup } from "src/lib/hooks/ToolModuleGroup/useDeleteToolModuleGroup.ts";
import { useDeleteToolModuleType } from "src/lib/hooks/ToolModuleType/useDeleteToolModuleType.ts";

interface LevelListProps {
    sortedData: ToolModuleGroup[];
    onItemClick: (id: string) => void;
    onDeleteGroup: (id: string) => void;
    onDeleteType: (groupId: string, typeId: string) => void;
}

const LevelList: React.FC<LevelListProps> = ({ sortedData, onItemClick, onDeleteGroup, onDeleteType }) => {
    const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({});
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
    const [contextMenu, setContextMenu] = useState<{
        x: number;
        y: number;
        options: string[];
        onOptionClick: (option: string) => void;
    } | null>(null);

    const { deleteToolModuleGroup } = useDeleteToolModuleGroup();
    const { deleteToolModuleType } = useDeleteToolModuleType();

    const handleToggle = (id: string) => {
        setExpandedItems((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const handleClick = (id: string) => {
        setSelectedItemId(id);
        onItemClick(id);
    };

    const handleContextMenu = (event: React.MouseEvent, id: string, level: number) => {
        event.preventDefault();
        let options: string[] = [];
        if (level === 1) {
            options = ['Delete Group', 'Create New Group', 'Create New Type'];
        } else if (level === 2) {
            options = ['Delete Type', 'Create New Type', 'Create New Module'];
        } else if (level === 3) {
            options = ['Delete Module', 'Create New Module'];
        }
        setContextMenu({
            x: event.clientX,
            y: event.clientY,
            options,
            onOptionClick: (option) => handleContextMenuOptionClick(option, id, level),
        });
    };

    const handleContextMenuOptionClick = async (option: string, id: string, level: number) => {
        console.log(`Option clicked: ${option} for id: ${id} at level: ${level}`);
        setContextMenu(null);

        if (option === 'Delete Group' && level === 1) {
            try {
                const response = await deleteToolModuleGroup({ variables: { input: { id } } });
                if (response.data.deleteToolModuleGroup.success) {
                    // Удаление группы из локального состояния для динамического обновления
                    onDeleteGroup(id);
                    console.log(`Group with id ${id} deleted successfully`);
                } else {
                    console.log(`Failed to delete group with id ${id}`);
                }
            } catch (error) {
                console.error(`Error deleting group with id ${id}:`, error);
            }
        } else if (option === 'Delete Type' && level === 2) {
            try {
                const response = await deleteToolModuleType({ variables: { input: { id } } });
                if (response.data.deleteToolModuleType.success) {
                    // Найти соответствующую группу и удалить тип
                    const groupId = sortedData.find(group => group.toolmoduletypeSet.some(type => type.id === id))?.id;
                    if (groupId) {
                        onDeleteType(groupId, id);
                        console.log(`Type with id ${id} deleted successfully`);
                    }
                } else {
                    console.log(`Failed to delete type with id ${id}`);
                }
            } catch (error) {
                console.error(`Error deleting type with id ${id}:`, error);
            }
        }
    };

    return (
        <div>
            {sortedData.map((dataObj) => (
                <div key={dataObj.id} className="level1">
                    <p onClick={() => handleToggle(dataObj.id)} onContextMenu={(event) => handleContextMenu(event, dataObj.id, 1)}>
                        {dataObj.name}
                    </p>
                    {expandedItems[dataObj.id] && (
                        <div className="level2">
                            {dataObj.toolmoduletypeSet.map((toolModuleType) => (
                                <div key={toolModuleType.id}>
                                    <p onClick={() => handleToggle(toolModuleType.id)} onContextMenu={(event) => handleContextMenu(event, toolModuleType.id, 2)}>
                                        {toolModuleType.name}
                                    </p>
                                    {expandedItems[toolModuleType.id] && (
                                        <div className="level3">
                                            {toolModuleType.toolmoduleSet.map((toolModule) => (
                                                <div key={toolModule.id}>
                                                    <p
                                                        onClick={() => handleClick(toolModule.id)}
                                                        onContextMenu={(event) => handleContextMenu(event, toolModule.id, 3)}
                                                        className={selectedItemId === toolModule.id ? 'selected' : ''}
                                                    >
                                                        {toolModule.sn}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
            {contextMenu && (
                <ContextMenu
                    x={contextMenu.x}
                    y={contextMenu.y}
                    options={contextMenu.options}
                    onOptionClick={contextMenu.onOptionClick}
                    onClose={() => setContextMenu(null)}
                />
            )}
        </div>
    );
};

export default LevelList;
