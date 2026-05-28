import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    cardContainer: {
        width: 340, 
        minHeight: 480, 
        alignSelf: 'center', 
        borderRadius: 12,
        borderWidth: 12, 
        borderColor: '#FFE165', 
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 8,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    pokemonName: {
        fontSize: 24,
        fontWeight: '900',
        color: '#111',
        textTransform: 'capitalize',
    },
    pokemonId: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#333',
    },
    headerRight: {
        alignItems: 'flex-end',
    },
    hpText: {
        fontSize: 20,
        fontWeight: '900',
        color: '#D32F2F', 
        marginBottom: 6,
    },
    // Estilos dos botões modificados para suportar múltiplos botões lado a lado
    actionsContainer: {
        flexDirection: 'row',
        gap: 6, // Cria um espaçamento pequeno entre os botões
    },
    actionButton: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#333',
        minWidth: 75,
        alignItems: 'center',
        justifyContent: 'center',
    },
    evolveButton: {
        backgroundColor: '#FFF',
    },
    evolveButtonText: {
        fontSize: 11,
        fontWeight: '900',
        color: '#333',
        textTransform: 'uppercase',
    },
    devolveButton: {
        backgroundColor: '#EAEAEA', // Fundo cinza suave para diferenciar do evoluir
        borderColor: '#555',
    },
    devolveButtonText: {
        fontSize: 11,
        fontWeight: '900',
        color: '#555',
        textTransform: 'uppercase',
    },
    imageFrame: {
        backgroundColor: '#F8F8F8',
        width: '100%',
        height: 190,
        borderWidth: 4,
        borderColor: '#B0B0B0', 
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
        marginBottom: 12,
    },
    image: {
        width: 170,
        height: 170,
    },
    typesContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.9)',
        paddingVertical: 6,
        borderRadius: 20,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)',
    },
    typeText: {
        fontSize: 12,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: '#333',
        marginHorizontal: 8,
    },
    attacksContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)', 
        borderRadius: 8,
        padding: 12,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)',
    },
    attackRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
        paddingVertical: 10,
    },
    attackName: {
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'capitalize',
        color: '#222',
    },
    attackDamage: {
        fontSize: 18,
        fontWeight: '900',
        color: '#111',
    }
});