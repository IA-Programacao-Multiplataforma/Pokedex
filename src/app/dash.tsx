import { View, Text, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import Button from '../componets/button';

export default function Caiu() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            
            <Image 
 
                source={require('../../assets/ney.png')} 
                style={styles.imageNeymar} 
                resizeMode="cover" 
            />               
            

            <Button 
                title="Voltar" 
                onPress={() => router.back()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009B3A', 
        alignItems: 'center',
        justifyContent: 'center',
        padding: 32,
        gap: 24,
    },
    title: {
        color: '#FDE100', 
        fontSize: 32,
        fontWeight: '900',
        textAlign: 'center',
        fontStyle: 'italic',
    },
    imageNeymar: {
        width: 300,
        height: 200,
        borderRadius: 16,
        borderWidth: 4,
        borderColor: '#FDE100',
    }
});