import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

export const SWORDS_LIST_QUERY = gql`
	query {
		swords {
			id
            name
            durability
            attack
            isUpgraded
		}
	}
`;

export const useSwords = () => {
    return useQuery<{ swords: IGraphqlTypes.ISword[] }>(SWORDS_LIST_QUERY, {
        fetchPolicy: 'network-only',
    });
};
