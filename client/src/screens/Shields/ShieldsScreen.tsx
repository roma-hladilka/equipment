import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { LoadingWrapper } from '../../components/LoadingWrapper/LoadingWrapper';
import { useShields, SHIELDS_LIST_QUERY } from '../../hooks/data/queries';
import { ShieldCreationModal } from '../../components/ShieldCreationModal/ShieldCreationModal';
import { useUpgradeShield, useDeleteShield } from '../../hooks/data/mutations/Shield';

export const ShieldsScreen = () => {
    const { data, loading: isShieldsLoading } = useShields();
    const [isModalVisible, setModalVisible] = useState(false);
    const [upgradeShield] = useUpgradeShield();
    const [deleteShield] = useDeleteShield();

    const onModalOpen = () => {
        setModalVisible(true);
    };

    const onModalClose = () => {
        setModalVisible(false);
    };

    const onShieldUpdate = (id: string, name: string, protection: number, durability: number) => () => {
        upgradeShield({
            variables: { name: `${name} (Upgraded)`, id, protection: protection + 3, durability: durability * 2 },
            refetchQueries: [{ query: SHIELDS_LIST_QUERY }]
        });
    };

    const onShieldDelete = (id: string) => () => {
        deleteShield({
            variables: { id },
            refetchQueries: [{ query: SHIELDS_LIST_QUERY }],
        });
    };

    return (
        <View style={{ flex: 1 }}>
            <LoadingWrapper isLoading={isShieldsLoading}>
                <FlatList
                    data={data?.shields || []}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={{
                                padding: 8,
                                backgroundColor: '#ffffff',
                                borderRadius: 8,
                                flexDirection: 'row',
                                alignItems: 'center',
                                flex: 1
                            }}
                            onPress={onShieldDelete(item.id)}
                        >
                            <View style={{ flex: 1 }}>
                                <View style={{ marginBottom: 16 }}>
                                    <Text>Name: {item.name}</Text>
                                </View>

                                <View style={{ flexDirection: 'row' }}>
                                    <Text>protection: {item.protection}    </Text>
                                    <Text>durability: {item.durability}</Text>
                                </View>
                            </View>

                            {!item.isUpgraded && (
                                <View>
                                    <TouchableOpacity onPress={onShieldUpdate(item.id, item.name, item.protection, item.durability)}>
                                        <View style={{ backgroundColor: '#00ee00', padding: 4, borderRadius: 4 }}>
                                            <Text style={{ color: '#ffffff' }}>Upgrade</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </TouchableOpacity>
                    )}
                    style={{ paddingHorizontal: 20 }}
                    ListHeaderComponent={() => <View style={{ height: 10 }} />}
                    ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                    ListFooterComponent={() => <View style={{ height: 10 }} />}
                />

                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        bottom: 20,
                        right: 20,
                        backgroundColor: '#00ee00',
                        borderRadius: 25,
                        width: 50,
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onPress={onModalOpen}
                >
                    <Text style={{ color: '#ffffff' }}>
                        Add
                    </Text>
                </TouchableOpacity>
            </LoadingWrapper>

            <ShieldCreationModal
                isVisible={isModalVisible}
                onClose={onModalClose}
            />
        </View>
    );
};
