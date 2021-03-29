import React from 'react';
import { ActivityIndicator, View } from 'react-native';

interface Props {
    isLoading?: boolean;
    children: React.ReactNode;
}

export const LoadingWrapper = ({ isLoading, children }: Props) => {
    return (
        <>
            {isLoading ? <ActivityIndicator size={'large'} style={{ flex: 1 }} /> : children}
        </>
    );
};