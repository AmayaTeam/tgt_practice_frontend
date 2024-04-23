import { useQuery } from "@apollo/client";
import Tool_module_groups_by_id from "../../graphql/queries/tool_module_groups_by_id";


export const useToolModuleGroupById = () => {
    const { data, loading, error } = useQuery(Tool_module_groups_by_id, {
        fetchPolicy: "cache-and-network",
    });

    return {
        tool_module_group_by_id: data?.toolModulesById || [],
        loading,
        error,
    }
};