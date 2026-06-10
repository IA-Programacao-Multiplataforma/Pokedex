import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 20,
        backgroundColor: '#111112',
        borderBottomWidth: 1,
        borderBottomColor: '#444',
        paddingBottom: 12,
        marginBottom: 18,
    },
    titleContainer: {
        flexDirection: 'column',
        width: '100%',
    },
    title: {
        fontSize: 30,
        color: '#FFCC00',
        fontWeight: 'bold',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: '#FFF',
        fontWeight: '600',
        letterSpacing: 1.2,
    },
    buttonGroup: {
        flexDirection: 'row',
        gap: 10,
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 14,
        width: '100%',
    },
    navButton: {
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 14,
        minWidth: 70,
        alignItems: 'center',
        backgroundColor: '#333',
    },
    activeButton: {
        backgroundColor: '#FFCC00',
    },
    activeButtonText: {
        color: '#111',
    },
    logoutButton: {
        backgroundColor: '#E3350D',
    },
    navText: {
        fontSize: 12,
        color: '#FFF',
        fontWeight: 'bold',
        textTransform: 'uppercase',
    }
});
