import React, { useMemo } from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

interface Props {
    children: React.ReactNode;
};

export const Apollo = ({ children }: Props) => {
    const client = useMemo(() =>
        new ApolloClient({
            cache: new InMemoryCache(),
            uri: 'https://secure-dusk-23090.herokuapp.com/graphql',
        }),
        []
    );
    return <ApolloProvider client={client}>{children}</ApolloProvider>
};