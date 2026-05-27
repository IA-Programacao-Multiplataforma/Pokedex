import { View, Text, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router'; 
import Button from '../componets/button';
import Input from '../componets/input';
import Card from '../componets/card';

export default function Index() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    
    const router = useRouter(); 

    function handleLogin() {
        if (email === 'neyma' && senha === 'vaiBrasil') {
            router.push('/dash'); 
        } else {
            Alert.alert('Falta!', 'Faltou ousadia e alegria. Usuário ou senha incorretos.');
        }
    }

    return (
        <View style={styles.container}>
            <Card>
                <Text style={styles.title}>Bem Vindo</Text>

                <Text style={styles.label}>Email</Text>
                <Input 
                    title="Digite seu email" 
                    value={email} 
                    onChangeText={setEmail} 
                />
                
                <Text style={styles.label}>Senha</Text>
                <Input 
                    title="Digite sua senha" 
                    secureTextEntry 
                    value={senha}
                    onChangeText={setSenha}
                />
                
                <Button title="Login" onPress={handleLogin} />
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FDE100',
        flex: 1,
        padding: 32,
        justifyContent: 'center',
    },
    label: {
        color: '#009B3A',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 4,
    },
    title: {
        color: '#002776', 
        fontSize: 28,
        fontWeight: '900',
        fontStyle: 'italic',
        textAlign: 'center',
        marginBottom: 8,
        textTransform: 'uppercase',
    }
});