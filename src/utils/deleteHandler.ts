import { useDeleteToolModuleGroup} from "src/lib/hooks/ToolModuleGroup/useDeleteToolModuleGroup.ts";
import { useDeleteToolModuleType} from "src/lib/hooks/ToolModuleType/useDeleteToolModuleType.ts";
import { useDeleteToolModule} from "src/lib/hooks/ToolModule/useDeleteToolModule.ts";
import {ToolModuleGroup} from "src/types/interfaces.ts";

const useDeleteHandlers = () => {
    const { deleteToolModuleGroup } = useDeleteToolModuleGroup();
    const { deleteToolModuleType } = useDeleteToolModuleType();
    const { deleteToolModule } = useDeleteToolModule();

    const deleteHandlers = {
        1: {
            async delete(id: string) {
                const response = await deleteToolModuleGroup({ variables: { input: { id } } });
                if (response.data.deleteToolModuleGroup.success) {
                    return { success: true };
                } else {
                    throw new Error(`Failed to delete group with id ${id}`);
                }
            },
        },
        2: {
            async delete(id: string, sortedData: ToolModuleGroup[]) {
                const response = await deleteToolModuleType({ variables: { input: { id } } });
                if (response.data.deleteToolModuleType.success) {
                    const groupId = sortedData.find(group => group.toolmoduletypeSet.some(type => type.id === id))?.id;
                    if (groupId) {
                        return { success: true, groupId };
                    } else {
                        throw new Error(`Group not found for type with id ${id}`);
                    }
                } else {
                    throw new Error(`Failed to delete type with id ${id}`);
                }
            },
        },
        3: {
            async delete(id: string, sortedData: ToolModuleGroup[]) {
                const response = await deleteToolModule({ variables: { input: { id } } });
                if (response.data.deleteToolModule.success) {
                    const typeId = sortedData.flatMap(group => group.toolmoduletypeSet).find(type => type.toolmoduleSet.some(module => module.id === id))?.id;
                    if (typeId) {
                        return { success: true, typeId };
                    } else {
                        throw new Error(`Type not found for module with id ${id}`);
                    }
                } else {
                    throw new Error(`Failed to delete module with id ${id}`);
                }
            },
        },
    };

    return deleteHandlers;
};

export default useDeleteHandlers;
