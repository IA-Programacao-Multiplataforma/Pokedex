import React from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from 'react-native';
import { styles } from '@/componets/button-back/style'

interface BackButtonProps {
    onPress: (event: GestureResponderEvent) => void;
    label?: string; 
}

export default function BackButton({ onPress, label = 'Voltar' }: BackButtonProps) {
    return (
        <TouchableOpacity style={styles.backButton} onPress={onPress}>
            <Text style={styles.backButtonText}>{label}</Text>
        </TouchableOpacity>
    );
}