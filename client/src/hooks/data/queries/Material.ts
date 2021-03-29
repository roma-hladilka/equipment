import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

const MATERIALS_LIST_QUERY = gql`
	query {
		materials {
			id
            name
            durability
            strength
		}
	}
`;

export const useMaterials = () => {
    return useQuery<{ materials: IGraphqlTypes.IMaterial[] }>(MATERIALS_LIST_QUERY, {
        fetchPolicy: 'network-only',
    });
};
