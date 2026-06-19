import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: '#222224' 
    },
    centerContainer: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#222224' 
    },
    loadingText: { 
        color: '#FFF', 
        marginTop: 10, 
        fontWeight: 'bold' 
    },
    teamSection: { 
        paddingHorizontal: 15,
        marginBottom: 20 
    },
    sectionTitle: { 
        color: '#FFCC00', 
        fontSize: 20, 
        fontWeight: 'bold', 
        marginBottom: 10, 
        textTransform: 'uppercase' 
    },
    teamCard: { 
        backgroundColor: '#333', 
        borderRadius: 20, 
        padding: 15,
        borderWidth: 3, 
        borderColor: '#FFCC00', 
        marginBottom: 20 
    },
    teamScroll: { 
        gap: 15 
    },
    teamMemberWrapper: { 
        width: 180 
    }
});

export const modalStyles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalBox: {
        backgroundColor: '#333',
        width: '85%',
        maxWidth: 400,
        borderRadius: 20,
        padding: 25,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FFCC00',
    },
    modalTitle: {
        color: '#FFCC00',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    modalText: {
        color: '#FFF',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
        lineHeight: 24,
    },
    buttonPrimary: {
        backgroundColor: '#FFCC00',
        width: '100%',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonDanger: {
        backgroundColor: '#E3350D',
        width: '100%',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonCancel: {
        backgroundColor: '#555',
        width: '100%',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonTextDark: {
        color: '#000',
        fontWeight: '900',
        fontSize: 16,
    },
    buttonTextWhite: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    }
});