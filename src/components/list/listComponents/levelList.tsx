import React, { useState } from 'react';
import { ToolModuleGroup } from 'src/types/interfaces';

interface LevelListProps {
    sortedData: ToolModuleGroup[];
    onItemClick: (id: string) => void;
}

const LevelList: React.FC<LevelListProps> = ({ sortedData, onItemClick }) => {
    console.log(sortedData);

    const [expandedItems, setExpandedItems] = useState<{
        [key: string]: boolean;
    }>({});

    const handleToggle = (id: string) => {
        setExpandedItems((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    return (
        <div>
            {sortedData.map((dataObj) => (
                <div key={dataObj.id} >
                    <h2 onClick={() => handleToggle(dataObj.id)} style={{ cursor: 'pointer' }}>
                        {dataObj.name}
                    </h2>
                    {expandedItems[dataObj.id] && (
                        <div>
                            {dataObj.toolmoduletypeSet.map((toolModuleType) => (
                                <div key={toolModuleType.id}>
                                    <h3 onClick={() => handleToggle(toolModuleType.id)}>
                                        {toolModuleType.name}
                                    </h3>
                                    {expandedItems[toolModuleType.id] && (
                                        <div className='level3'>
                                            {toolModuleType.toolmoduleSet.map((toolModule) => (
                                                <div key={toolModule.id}>
                                                    <p onClick={() => onItemClick(toolModule.id)} style={{ cursor: 'pointer' }}>
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
