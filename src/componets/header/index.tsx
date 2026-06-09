import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { styles } from './style';

export default function Header() {
    const router = useRouter();
    const { signOut } = useAuth();

    const handleLogout = async () => {
        await signOut();
        router.replace('/');
    };

     const profile = () => {
        router.replace('/profile');
    };

    return (
        <View style={styles.header}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Minha Coleção</Text>
                <Text style={styles.subtitle}>Cartas TCG</Text>
            </View>
            
            <View style={{ flexDirection: 'row', gap: 10 }}>

            <TouchableOpacity 
                style={styles.profileButton} 
                onPress={profile}
                activeOpacity={0.7}
            >
                <Text style={styles.profileText}>Profile</Text>
            </TouchableOpacity>
            </View>
        </View>
    );
}