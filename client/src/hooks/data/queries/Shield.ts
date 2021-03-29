import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

export const SHIELDS_LIST_QUERY = gql`
	query {
		shields {
			id
            name
            durability
            protection
            isUpgraded
		}
	}
`;

export const useShields = () => {
    return useQuery<{ shields: IGraphqlTypes.IShield[] }>(SHIELDS_LIST_QUERY, {
        fetchPolicy: 'network-only',
    });
};
