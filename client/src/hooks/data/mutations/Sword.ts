import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const ADD_SWORD_MUTATION = gql`
    mutation AddSword($name: String!, $durability:Int!, $attack: Int!, $materialId: ID!) {
        addSword(name: $name, durability: $durability, attack: $attack, materialId: $materialId ) {
            id
            name
            attack
            durability
        }
    }
`;

const UPGRADE_SWORD_MUTATION = gql`
    mutation UpgradeSword($id: ID!, $name: String!, $durability:Int!, $attack: Int!) {
        upgradeSword(id: $id, name: $name, durability: $durability, attack: $attack) {
            id
            name
            attack
            durability
        }
    }
`;

const DELETE_SWORD_MUTATION = gql`
    mutation DeleteSword($id: ID!) {
        deleteSword(id: $id) {
            id
            name
            attack
            durability
        }
    }
`;

export const useAddSword = () => {
    return useMutation<{ addSword: IGraphqlTypes.ISword }, IGraphqlTypes.IAddSwordOnMutationArguments>(ADD_SWORD_MUTATION);
};

export const useUpgradeSword = () => {
    return useMutation<{ upgradeSword: IGraphqlTypes.ISword }, IGraphqlTypes.IUpgradeSwordOnMutationArguments>(UPGRADE_SWORD_MUTATION);
};

export const useDeleteSword = () => {
    return useMutation<{ deleteSword: IGraphqlTypes.ISword }, IGraphqlTypes.IDeleteSwordOnMutationArguments>(DELETE_SWORD_MUTATION);
};
