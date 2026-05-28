import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { styles } from './style';

export default function Header() {
    const router = useRouter();

    const handleLogout = () => {
        router.replace('/');
    };

    return (
        <View style={styles.header}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Minha Coleção</Text>
                <Text style={styles.subtitle}>Cartas TCG</Text>
            </View>
            
            <TouchableOpacity 
                style={styles.logoutButton} 
                onPress={handleLogout}
                activeOpacity={0.7}
            >
                <Text style={styles.logoutText}>Sair</Text>
            </TouchableOpacity>
        </View>
    );
}