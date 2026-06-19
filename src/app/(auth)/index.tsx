import { View, Text, Alert, Image, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router'; 
import Button from '../../componets/button-login'; 
import Input from '../../componets/input';
import { styles } from '@/styles/style';
import { useAuth } from '@/context/AuthContext';

export default function Index() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false); 
    
    const router = useRouter();
    const { signIn } = useAuth();

    async function handleLogin() {
        if (!email.trim() || !senha.trim()) {
            Alert.alert('Opa, Treinador!', 'Por favor, preencha o nome e a senha secreta.');
            return;
        }

        setIsSubmitting(true); 
        try {
            const isValid = await signIn(email, senha);

            if (isValid) {
                router.replace('/team');
            } else {
                Alert.alert('Ataque Falhou!', 'A Equipe Rocket sabotou seu acesso. Treinador ou senha incorretos.');
            }
        } catch (error) {
            Alert.alert('Erro de Conexão', 'Não foi possível contatar o Centro Pokémon. Verifique sua internet.');
        } finally {
            setIsSubmitting(false); 
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
                        editable={!isSubmitting}
                    />
                    
                    <Text style={styles.label}>Senha Secreta</Text>
                    <Input 
                        title="Digite sua senha" 
                        secureTextEntry 
                        value={senha}
                        onChangeText={setSenha}
                        editable={!isSubmitting}
                        returnKeyType="done"
                        onSubmitEditing={handleLogin}
                    />
                    
                    <Button 
                        title={isSubmitting ? "Carregando..." : "Entrar"} 
                        onPress={handleLogin} 
                        disabled={isSubmitting} 
                    />

                    {/* --- BOTÃO PARA IR PARA O CADASTRO --- */}
                    <Text 
                        style={{
                            textAlign: 'center', 
                            marginTop: 20, 
                            color: '#007AFF', 
                            fontWeight: 'bold',
                            textDecorationLine: 'underline'
                        }}
                        onPress={() => router.push('/register')} 
                    >
                        Não tem uma conta? Cadastre-se aqui
                    </Text>
                    {/* ------------------------------------- */}
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}