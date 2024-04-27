import {useToolModuleGroupById} from "../lib/hooks/tool_module_groups_by_id.ts";

const HomePage = () => {
    const { tool_module_group_by_id, loading, error } = useToolModuleGroupById();
    let img = "data:image/png;base64," + tool_module_group_by_id.image;
    console.log(tool_module_group_by_id, loading, error)
    console.log(img);
    return (
        <>
            <h1>Homepage</h1>
            <div className="container">
                <h3>React Js Display Base64 Image</h3>
                <img src={img} width={200} alt="Base64 Image"/>
            </div>
        </>
    );
}

export default HomePage;