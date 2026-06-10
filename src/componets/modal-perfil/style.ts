import { StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
        alignItems: 'center', // <-- Garante que o modal fique no meio da tela no PC
    },
    bottomSheet: {
        height: height * 0.65, // Aumentei um pouquinho para dar espaço aos itens
        width: '100%',
        maxWidth: 500, // <-- O SEGREDO: No PC, ele não passa de 500px de largura
        backgroundColor: '#7A7A7A',
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        paddingTop: 25,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    tabRow: {
        flexDirection: 'row',
        backgroundColor: '#4A4A4A',
        borderRadius: 25,
        padding: 4,
        width: '100%',
        marginBottom: 20,
    },
    tabButton: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        borderRadius: 22,
    },
    activeTabButton: {
        backgroundColor: '#E61C1C',
    },
    tabText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    gridContainer: {
        width: '100%',
        paddingBottom: 20,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center', // <-- Centraliza os itens em vez de jogar para as bordas
        gap: 15, // <-- Adiciona um espaçamento uniforme entre os itens (funciona nativo no React Native moderno)
        width: '100%',
    },
    gridItem: {
        width: 100,  // <-- TAMANHO FIXO: Perfeito pro celular e não explode no PC
        height: 100, // <-- TAMANHO FIXO
        marginBottom: 10,
        borderRadius: 50, // <-- Metade da largura/altura para ficar perfeitamente redondo
        backgroundColor: '#FFF',
        overflow: 'hidden',
        borderWidth: 3,
        borderColor: 'transparent',
    },
    selectedItem: {
        borderColor: '#FFCC00',
    },
    gridAvatar: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    colorCircle: {
        borderRadius: 50,
    },
    saveButton: {
        backgroundColor: '#4E4E4E',
        width: '60%',
        paddingVertical: 12,
        borderRadius: 25,
        alignItems: 'center',
        marginBottom: 25,
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#666',
    },
    saveButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});