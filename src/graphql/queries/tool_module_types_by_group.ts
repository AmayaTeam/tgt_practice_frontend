import { gql } from '@apollo/client';

export default gql`
    query ToolModuleTypes($id: ID!) {
        toolModulesTypesByGroupId(id: "200c3b64-11c7-46b2-a3a2-4cf7b6a893a4") {
            id
            name
        }
    }
`;
