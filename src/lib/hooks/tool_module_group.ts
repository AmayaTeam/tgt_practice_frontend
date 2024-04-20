import { useQuery } from "@apollo/client";
import ToolModuleGroup from "../../graphql/queries/tool_module_groups";


export const useToolModuleGroup = () => {
    const { data, loading, error } = useQuery(ToolModuleGroup, {
        fetchPolicy: "cache-and-network",
    });

    return {
        tool_module_group: data?.toolModuleGroups || [],
        loading,
        error,
    }
};