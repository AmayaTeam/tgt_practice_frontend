import { gql } from '@apollo/client';

const GET_CURRENT_USER = gql`
  query Me {
    me {
      username
    }
  }
`;

export default GET_CURRENT_USER;
