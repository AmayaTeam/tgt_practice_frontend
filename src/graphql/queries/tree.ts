import { gql } from '@apollo/client';

export default gql`
  query Tree {
    toolModuleGroups {
      name
      toolmoduletypeSet {
        name
        toolmoduleSet {
          sn
        }
      }
    }
  }
`;
