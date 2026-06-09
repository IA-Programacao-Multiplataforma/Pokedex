import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2E2E2E',
    },
    /* Construção Visual Recortada da Pokébola */
    pokeballHeader: {
        height: 250,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    pokeballTop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 140,
    },
    pokeballLine: {
        position: 'absolute',
        top: 138,
        left: 0,
        right: 0,
        height: 6,
        backgroundColor: '#000',
        zIndex: 2,
    },
    pokeballCutout: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 110,
        backgroundColor: '#ffffff', 
        borderColor: '#ffffff',
        borderWidth: 6,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
    },
    avatarTouch: {
        width: 140,
        height: 140,
        borderRadius: 70,
        borderWidth: 6,
        borderColor: '#000',
        overflow: 'hidden',
        backgroundColor: '#FFF',
        zIndex: 5,
        marginTop: -10,
    },
    avatarImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    backButton: {
        position: 'absolute',
        top: 35,
        left: 20,
        zIndex: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.13)',
        padding: 10,
        borderRadius: 20,
    },
    backButtonText: {
        color: '#FFF',
        fontSize: 20,
    },
    /* Conteúdo das Estatísticas */
    profileContent: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 25,
        paddingTop: 10,
    },
    trainerNameText: {
        color: '#FFF',
        fontSize: 32,
        fontWeight: '900',
        letterSpacing: 1.5,
        marginVertical: 15,
        fontFamily: 'System', // Substitua pela sua fonte Cartoon/Impact se necessário
    },
    statsCard: {
        backgroundColor: '#1E1E1E',
        borderColor: '#9b8239', // Borda sutil arroxeada/grafite vista na imagem
        borderWidth: 4,
        borderRadius: 35,
        width: '100%',
        padding: 20,
        alignItems: 'center',
    },
    winsMainBox: {
        backgroundColor: '#333333',
        width: '100%',
        borderRadius: 20,
        paddingVertical: 15,
        paddingHorizontal: 20,
        alignItems: 'center',
        marginBottom: 15,
    },
    winsTitle: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 5,
    },
    valueRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    trophyIcon: {
        fontSize: 34,
        marginRight: 10,
    },
    mainStatNumber: {
        color: '#FFF',
        fontSize: 38,
        fontWeight: '900',
    },
    secondaryStatsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    subStatBox: {
        backgroundColor: '#333333',
        width: '47%',
        borderRadius: 18,
        paddingVertical: 12,
        alignItems: 'center',
    },
    subStatTitle: {
        color: '#AAA',
        fontWeight: 'bold',
        fontSize: 12,
        marginBottom: 4,
    },
    swordsIcon: {
        fontSize: 22,
        marginRight: 6,
    },
    shieldIcon: {
        fontSize: 22,
        marginRight: 6,
    },
    subStatNumber: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: '900',
    },
    /* Botão Sair da parte inferior */
    logoutButton: {
        borderWidth: 3,
        borderColor: '#9E2A2B',
        backgroundColor: '#4A4A4A',
        width: '100%',
        paddingVertical: 14,
        borderRadius: 15,
        alignItems: 'center',
        marginTop: 'auto',
        marginBottom: 20,
    },
    logoutText: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: '900',
        letterSpacing: 1,
    },
});