import {useToolModuleGroup} from "../lib/hooks/tool_module_group.ts";

const HomePage = () => {
    const { tool_module_group, loading, error } = useToolModuleGroup();
    console.log(tool_module_group, loading, error)
    return (
        <h1>Homepage</h1>
    )
}

export default HomePage;