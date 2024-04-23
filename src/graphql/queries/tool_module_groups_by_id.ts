import { gql } from "@apollo/client";

export default gql`
    query ToolModulesById {
        toolModulesById(id: "4d519190-356f-4c40-b4b0-455e72a9cecb") {
            image
        }
    }
`;