import { gql } from "@apollo/client";

export default gql`
    query ToolModulesById {
        toolModulesById(id: "3b74c9b4-fb05-4526-a460-f56f7d65f5f0") {
            image
        }
    }
`;