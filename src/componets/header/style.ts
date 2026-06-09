import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
        marginTop: 20, 
        borderBottomWidth: 1,
        borderBottomColor: '#444',
        paddingBottom: 10,
        paddingHorizontal: 20, 
    },
    titleContainer: {
        flexDirection: 'column',
    },
    title: {
        fontSize: 28, 
        color: '#FFCC00', 
    },
    subtitle: {
        fontSize: 14,
        color: '#FFF',
        fontWeight: '600',
        letterSpacing: 2,
    },
    logoutButton: {
        backgroundColor: '#E3350D', 
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#222224',
    },
    logoutText: {
        color: '#FFF',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 12,
    }, 
    profileButton: {
        backgroundColor: '#81c9d4', 
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#222224',
    },
    profileText: {
        color: '#FFF',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 12,
    }
});