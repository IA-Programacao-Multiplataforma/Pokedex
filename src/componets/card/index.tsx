import { View, Text, StyleProp, ViewStyle, TouchableOpacityProps, Image } from 'react-native'; // <-- Adicionei o Image aqui
import { styles } from "./style";
import React from 'react'; 

type Props = TouchableOpacityProps & {
    title?: string; 
    children?: React.ReactNode; 
    style?: StyleProp<ViewStyle>;
}

export default function Card({ title, children, style, ...rest }: Props) {
    return (
        <View style={[styles.card, style]} {...rest}>
            {title && <Text style={styles.text}>{title}</Text>} 
            
            <Image 
                source={require('../../../assets/neyma.png')} 
                style={styles.imageNeymar} 
                resizeMode="cover" 
            />
            
            {children} 
        </View>
    );
}