import { View, Text, Alert, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router'; 
import Button from '../../componets/button-login'; 
import Input from '../../componets/input';
import { styles } from '@/styles/style';
import { registerRequest } from '@/integration/authIntegration'; 

export default function Register() {
    const [username, setUsername] = useState(''); 
    const [senha, setSenha] = useState('');
    const [senhaConfirme, setSenhaConfirme] = useState(''); // 1. Novo estado para a confirmação
    const [isRegistering, setIsRegistering] = useState(false); 
    
    const router = useRouter();

    async function handleRegister() {
        // Validação 1: Verificar se algum campo ficou em branco
        if (!username.trim() || !senha.trim() || !senhaConfirme.trim()) {
            Alert.alert('Opa, Recruta!', 'Por favor, preencha todos os campos para iniciar sua jornada.');
            return;
        }

        // Validação 2: Verificar se as senhas são iguais
        if (senha !== senhaConfirme) {
            Alert.alert('Ataque de Confusão!', 'As senhas digitadas não são iguais. Verifique e tente novamente.');
            return;
        }

        // Validação 3: Segurança básica (opcional)
        if (senha.length < 6) {
            Alert.alert('Senha Fraca!', 'Sua senha secreta deve ter pelo menos 6 caracteres.');
            return;
        }

        setIsRegistering(true); 

        try {
            await registerRequest({ 
                username: username.trim(), 
                password: senha 
            });

            Alert.alert(
                'Inscrição Concluída! 🎉', 
                'Sua licença de Treinador Pokémon foi emitida. Agora faça seu login!',
                [
                    { 
                        text: 'Ir para o Login', 
                        onPress: () => router.replace('/') 
                    }
                ]
            );

        } catch (error: any) {
            console.error("Erro no cadastro:", error);
            if (error.response && error.response.status === 400) {
                Alert.alert('Inscrição Recusada', 'Este nome de treinador já está em uso.');
            } else {
                Alert.alert('Erro no Servidor', 'O sistema do laboratório do Prof. Carvalho está fora do ar.');
            }
        } finally {
            setIsRegistering(false); 
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

                <View style={styles.loginCard}>
                    <View style={styles.headerContainer}>
                        <Image 
                            source={{ uri: 'https://img.icons8.com/color/96/pokeball-2.png' }} 
                            style={styles.pokeballIcon} 
                        />
                        <Text style={styles.title}>Novo Treinador</Text>
                    </View>

                    <Text style={styles.label}>Nome de Treinador</Text>
                    <Input 
                        title="Escolha seu nome de usuário" 
                        value={username} 
                        onChangeText={setUsername} 
                        editable={!isRegistering}
                    />
                    
                    <Text style={styles.label}>Senha Secreta</Text>
                    <Input 
                        title="Crie uma senha segura" 
                        secureTextEntry 
                        value={senha}
                        onChangeText={setSenha}
                        editable={!isRegistering} 
                    />

                    {/* 2. Novo Input adicionado visualmente no Card */}
                    <Text style={styles.label}>Confirmar Senha</Text>
                    <Input 
                        title="Digite a senha novamente" 
                        secureTextEntry 
                        value={senhaConfirme}
                        onChangeText={setSenhaConfirme}
                        editable={!isRegistering} 
                        returnKeyType="done"
                        onSubmitEditing={handleRegister} // Permite enviar ao apertar Enter no teclado
                    />
                    
                    <Button 
                        title={isRegistering ? "Enviando dados..." : "Registrar Licença"} 
                        onPress={handleRegister} 
                        disabled={isRegistering} 
                    />

                    <Text 
                        style={{ textAlign: 'center', marginTop: 15, color: '#007AFF' }}
                        onPress={() => router.push('/')}
                    >
                        Já tenho uma conta
                    </Text>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}