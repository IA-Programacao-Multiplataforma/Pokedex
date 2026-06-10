import React from 'react';
import { FlatList, View, StyleProp, ViewStyle } from 'react-native';
import { Pokemon } from '@/@types/pokemon';
import PokemonCard from '@/componets/card'; 
import { styles } from './style';

interface PokemonListProps {
    data: Pokemon[];
    style?: StyleProp<ViewStyle>;
    scrollEnabled?: boolean;
}

export default function PokemonList({ data, style, scrollEnabled = true }: PokemonListProps) {
    return (
        <FlatList
            data={data}
            style={[styles.list, style]}
            keyExtractor={(item) => item.index.toString()}
            numColumns={2}
            columnWrapperStyle={styles.row}
            renderItem={({ item }) => (
                <View style={styles.cardWrapper}>
                    <PokemonCard pokemon={item} />
                </View>
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={true}
            scrollEnabled={scrollEnabled}
        />
    );
}