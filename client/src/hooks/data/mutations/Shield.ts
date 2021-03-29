import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const ADD_SHIELD_MUTATION = gql`
    mutation AddShield($name: String!, $durability:Int!, $protection: Int!, $materialId: ID!) {
        addShield(name: $name, durability: $durability, protection: $protection, materialId: $materialId ) {
            id
            name
            protection
            durability
        }
    }
`;

const UPGRADE_SHIELD_MUTATION = gql`
    mutation UpgradeShield($id: ID!, $name: String!, $durability:Int!, $protection: Int!) {
        upgradeShield(id: $id, name: $name, durability: $durability, protection: $protection) {
            id
            name
            protection
            durability
        }
    }
`;

const DELETE_SHIELD_MUTATION = gql`
    mutation DeleteShield($id: ID!) {
        deleteShield(id: $id) {
            id
            name
            protection
            durability
        }
    }
`;

export const useAddShield = () => {
    return useMutation<{ addShield: IGraphqlTypes.IShield }, IGraphqlTypes.IAddShieldOnMutationArguments>(ADD_SHIELD_MUTATION);
};

export const useUpgradeShield = () => {
    return useMutation<{ upgradeShield: IGraphqlTypes.IShield }, IGraphqlTypes.IUpgradeShieldOnMutationArguments>(UPGRADE_SHIELD_MUTATION);
};

export const useDeleteShield = () => {
    return useMutation<{ deleteShield: IGraphqlTypes.IShield }, IGraphqlTypes.IDeleteShieldOnMutationArguments>(DELETE_SHIELD_MUTATION);
};
