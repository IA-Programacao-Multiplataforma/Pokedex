import React from 'react';
import { FlatList, View } from 'react-native';
import { Pokemon } from '@/@types/pokemon';
import PokemonCard from '@/componets/card'; 
import { styles } from './style';

interface PokemonListProps {
    data: Pokemon[];
}

export default function PokemonList({ data }: PokemonListProps) {
    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.index.toString()}
            numColumns={4}
            columnWrapperStyle={styles.row}
            renderItem={({ item }) => (
                <View style={styles.cardWrapper}>
                    <PokemonCard pokemon={item} />
                </View>
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={true}
        />
    );
}