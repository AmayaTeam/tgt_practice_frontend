import { useQuery } from '@apollo/client';
import ToolModule from "src/graphql/queries/tool_module";

const useToolModuleQuery = (id: string | null) => {
    const { loading, error, data } = useQuery(ToolModule, {variables: {id}});

    return {
        loading,
        error,
        data: data?.toolModulesById || [],
    };
}

export default useToolModuleQuery;
