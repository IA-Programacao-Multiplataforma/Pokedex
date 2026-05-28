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
            renderItem={({ item }) => <PokemonCard pokemon={item} />}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ height: 25 }} />} 
        />
    );
}