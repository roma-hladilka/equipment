import React, { useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, TextInput, Modal } from 'react-native';
import { LoadingWrapper } from '../../components/LoadingWrapper';
import { useSwords, SWORDS_LIST_QUERY } from '../../hooks/data/queries';
import { SwordCreationModal } from '../../components/SwordCreationModal';
import { useUpgradeSword, useDeleteSword } from '../../hooks/data/mutations/Sword';

export const SwordsScreen = () => {
    const { data, loading: isSwordsLoading } = useSwords();
    const [isModalVisible, setModalVisible] = useState(false);
    const [upgradeSword] = useUpgradeSword();
    const [deleteSword] = useDeleteSword();

    const onModalOpen = () => {
        setModalVisible(true);
    };

    const onModalClose = () => {
        setModalVisible(false);
    };

    const onSwordUpdate = (id: string, name: string, attack: number, durability: number) => () => {
        upgradeSword({
            variables: { name: `${name} (Upgraded)`, id, attack: attack + 3, durability: durability * 2 },
            refetchQueries: [{ query: SWORDS_LIST_QUERY }],
        });
    };

    const onSwordDelete = (id: string) => () => {
        deleteSword({
            variables: { id },
            refetchQueries: [{ query: SWORDS_LIST_QUERY }],
        });
    };

    return (
        <View style={{ flex: 1 }}>
            <LoadingWrapper isLoading={isSwordsLoading}>
                <FlatList
                    data={data?.swords || []}
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
                            onPress={onSwordDelete(item.id)}
                        >
                            <View style={{ flex: 1 }}>
                                <View style={{ marginBottom: 16 }}>
                                    <Text>Name: {item.name}</Text>
                                </View>

                                <View style={{ flexDirection: 'row' }}>
                                    <Text>attack: {item.attack}    </Text>
                                    <Text>durability: {item.durability}</Text>
                                </View>
                            </View>

                            {!item.isUpgraded && (
                                <View>
                                    <TouchableOpacity onPress={onSwordUpdate(item.id, item.name, item.attack, item.durability)}>
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

            <SwordCreationModal
                isVisible={isModalVisible}
                onClose={onModalClose}
            />
        </View>
    );
};
