import { useQuery } from '@apollo/client';
import ToolModule from "../../graphql/queries/tool_module";

const useToolModuleQuery = () => {
    const { loading, error, data } = useQuery(ToolModule);

    return {
        loading,
        error,
        data: data?.toolModulesById || [],
    };
}

export default useToolModuleQuery;
