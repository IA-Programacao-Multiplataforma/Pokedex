import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter, useSegments } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './style';

const navItems = [
    { label: 'Pokedex', route: '/pokedex' },
    { label: 'Time', route: '/team' },
    { label: 'Perfil', route: '/profile' },
    { label: 'Batalha', route: '/battle' },
];

export default function Header() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const segments = useSegments();
    const currentSegment = segments[segments.length - 1] ?? 'pokedex';

    return (
        <View style={[styles.header, ]}> 
            <View style={styles.titleContainer}>
                <Image
                    source={{ uri: 'https://img.icons8.com/color/96/pokeball-2.png' }}
                    style={styles.logo}
                />
                <View>
                    <Text style={styles.title}>PokéApp</Text>
                    <Text style={styles.subtitle}>Sua Poké Navegação</Text>
                </View>
            </View>

            <View style={styles.buttonGroup}>
                {navItems.map((item) => {
                    const active = currentSegment === item.route.replace('/', '');
                    return (
                        <TouchableOpacity
                            key={item.route}
                            style={[styles.navButton, active && styles.activeButton]}
                            onPress={() => router.replace(item.route)}
                        >
                            <Text style={[styles.navText, active && styles.activeButtonText]}>
                                {item.label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}