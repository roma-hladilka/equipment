import React, { useState } from 'react';
import Modal from 'react-native-modal';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { useMaterials, SWORDS_LIST_QUERY } from '../../hooks/data/queries';
import { LoadingWrapper } from '../LoadingWrapper';
import { useAddSword } from '../../hooks/data/mutations/Sword';

interface Props {
    isVisible: boolean;
    onClose: () => void;
}

export const SwordCreationModal = (props: Props) => {
    const { data, loading: isMaterialsLoading } = useMaterials();
    const [choosenMaterial, setChoosenMaterial] = useState<IGraphqlTypes.IMaterial>();
    const [name, setName] = useState('');
    const [isValidate, setValidate] = useState(false);
    const [addSword] = useAddSword();

    const onClose = () => {
        props.onClose();
        setChoosenMaterial(undefined);
        setValidate(false);
        setName('');
    }

    const onCreate = async () => {
        if (!choosenMaterial) return;
        if (!name) return setValidate(true);

        const { strength: attack, durability, id: materialId } = choosenMaterial;

        try {
            await addSword({
                variables: { name, attack, durability, materialId },
                refetchQueries: [{ query: SWORDS_LIST_QUERY }]
            });

            onClose();
        }
        catch (error) {
            console.log(error);
        }
    }

    const isNameError = isValidate && !name;

    return (
        <Modal
            isVisible={props.isVisible}
            onBackButtonPress={onClose}
            onBackdropPress={onClose}
        >
            <View style={{ backgroundColor: '#ffffff', padding: 10, borderRadius: 12 }}>
                <View style={{ marginBottom: 8 }}>
                    <Text>Choose material:</Text>
                </View>

                <LoadingWrapper isLoading={isMaterialsLoading}>
                    {data?.materials.map((item, index) => {
                        const isChoosen = choosenMaterial?.id === item.id;
                        return (
                            <React.Fragment key={index}>
                                <View>
                                    <Text style={{ color: isChoosen ? '#111111' : '#444444', fontWeight: isChoosen ? 'bold' : 'normal' }} onPress={() => setChoosenMaterial(item)}>{item.name}</Text>
                                </View>

                                {index !== (data.materials.length - 1) && (<View style={{ height: 8 }} />)}
                            </React.Fragment>
                        );
                    })}
                </LoadingWrapper>

                {choosenMaterial && (
                    <View style={{ marginTop: 16 }}>
                        <View style={{ flexDirection: 'row', marginBottom: 8 }}>
                            <View>
                                <Text>Name: </Text>
                            </View>

                            <View style={{ borderColor: isNameError ? '#ff0000' : '#444444', borderWidth: 1, borderRadius: 4, flex: 1, paddingHorizontal: 4 }}>
                                <TextInput
                                    value={name}
                                    onChangeText={setName}
                                />
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', marginBottom: 8 }}>
                            <View>
                                <Text>Attack: </Text>
                            </View>

                            <View style={{ flex: 1, paddingHorizontal: 4 }}>
                                <TextInput
                                    value={String(choosenMaterial.strength)}
                                    editable={false}
                                />
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', marginBottom: 8 }}>
                            <View>
                                <Text>Durability: </Text>
                            </View>

                            <View style={{ flex: 1, paddingHorizontal: 4 }}>
                                <TextInput
                                    value={String(choosenMaterial.durability)}
                                    editable={false}
                                />
                            </View>
                        </View>

                        <TouchableOpacity
                            style={{
                                padding: 4,
                                backgroundColor: '#00ee00',
                                width: 100,
                                alignItems: 'center',
                                alignSelf: 'center',
                                borderRadius: 4,
                                marginBottom: 8,
                            }}
                            onPress={onCreate}
                        >
                            <Text>Create</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                alignItems: 'center',
                                alignSelf: 'center',
                                borderRadius: 4,
                            }}
                            onPress={onClose}
                        >
                            <Text>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </Modal>
    );
};
