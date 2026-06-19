import React from 'react';
import { FlatList, View } from 'react-native';
import { Pokemon } from '@/@types/pokemon';
import PokemonCard from '@/componets/card'; 
import { styles } from './style';

interface PokemonListProps {
    data: Pokemon[];
    ListHeaderComponent?: React.ReactElement;
    hideEvolve?: boolean;
    onPokemonPress?: (pokemon: Pokemon) => void; 
}

export default function PokemonList({ 
    data, 
    ListHeaderComponent, 
    hideEvolve = false,
    onPokemonPress
}: PokemonListProps) {
    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.index.toString()}
            numColumns={2}
            columnWrapperStyle={styles.row}
            renderItem={({ item }) => (
                <View style={styles.cardWrapper}>
                    <PokemonCard 
                        pokemon={item} 
                        hideEvolve={hideEvolve} 
                        onPress={onPokemonPress ? () => onPokemonPress(item) : undefined}
                    />
                </View>
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={true}
            ListHeaderComponent={ListHeaderComponent}
        />
    );
}