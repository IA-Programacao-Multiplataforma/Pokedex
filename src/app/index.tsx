import { View, Text, StyleSheet, Alert, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router'; 
import Button from '../componets/button'; 
import Input from '../componets/input';
import { styles } from './style';

export default function Index() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    
    const router = useRouter(); 

    function handleLogin() {
        if (email.toLowerCase() === 'ash' && senha === 'pikachu') {
            router.push('/pokedex'); 
        } else {
            Alert.alert('Ataque Falhou!', 'A Equipe Rocket sabotou seu acesso. Treinador ou senha incorretos.');
        }
    }

    return (
        <KeyboardAvoidingView 
            style={{ flex: 1 }} 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.container}>
                
                <View style={styles.topHalf} />
                <View style={styles.middleBand} />
                <View style={styles.bottomHalf} />
                {/* ---------------------------------- */}

                <View style={styles.loginCard}>
                    <View style={styles.headerContainer}>
                        <Image 
                            source={{ uri: 'https://img.icons8.com/color/96/pokeball-2.png' }} 
                            style={styles.pokeballIcon} 
                        />
                        <Text style={styles.title}>Pokédex</Text>
                    </View>

                    <Text style={styles.label}>Treinador</Text>
                    <Input 
                        title="Digite seu nome" 
                        value={email} 
                        onChangeText={setEmail} 
                    />
                    
                    <Text style={styles.label}>Senha Secreta</Text>
                    <Input 
                        title="Digite sua senha" 
                        secureTextEntry 
                        value={senha}
                        onChangeText={setSenha}
                    />
                    
                    <Button title="Entrar" onPress={handleLogin} />
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}
