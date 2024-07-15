import React, { useState } from 'react';
import { ToolModuleGroup } from 'src/types/interfaces';

interface LevelListProps {
    sortedData: ToolModuleGroup[];
    onItemClick: (id: string) => void;
}

const LevelList: React.FC<LevelListProps> = ({ sortedData, onItemClick }) => {
    const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({});
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

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

    return (
        <div>
            {sortedData.map((dataObj) => (
                <div key={dataObj.id} className="level1">
                    <p onClick={() => handleToggle(dataObj.id)}>
                        {dataObj.name}
                    </p>
                    {expandedItems[dataObj.id] && (
                        <div className="level2">
                            {dataObj.toolmoduletypeSet.map((toolModuleType) => (
                                <div key={toolModuleType.id}>
                                    <p onClick={() => handleToggle(toolModuleType.id)}>
                                        {toolModuleType.name}
                                    </p>
                                    {expandedItems[toolModuleType.id] && (
                                        <div className="level3">
                                            {toolModuleType.toolmoduleSet.map((toolModule) => (
                                                <div key={toolModule.id}>
                                                    <p
                                                        onClick={() => handleClick(toolModule.id)}
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
        </div>
    );
};

export default LevelList;
