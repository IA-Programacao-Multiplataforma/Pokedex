import { StyleSheet, Platform, StatusBar } from 'react-native';

export const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 22,
        backgroundColor: '#111112',
        borderBottomWidth: 1,
        borderBottomColor: '#2A2A2E',
        paddingTop: Platform.OS === 'web' ? 20 : (StatusBar.currentHeight || 40) + 15,
        paddingBottom: 18,
        marginBottom: 18,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.18,
        shadowRadius: 16,
        elevation: 5,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        gap: 12,
        marginBottom: 14,
    },
    logo: {
        width: 52,
        height: 52,
    },
    title: {
        fontSize: 32,
        color: '#FFCC00',
        fontWeight: '900',
        letterSpacing: 1.8,
        textTransform: 'uppercase',
    },
    subtitle: {
        fontSize: 13,
        color: '#E6E6E6',
        fontWeight: '600',
        marginTop: 2,
        letterSpacing: 0.8,
        textTransform: 'uppercase',
    },
    buttonGroup: {
        flexDirection: 'row',
        gap: 10,
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
    },
    navButton: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 20,
        minWidth: 84,
        alignItems: 'center',
        backgroundColor: '#1F1F22',
        borderWidth: 1,
        borderColor: '#2E2E33',
    },
    activeButton: {
        backgroundColor: '#FFCC00',
        borderColor: '#FFCC00',
    },
    activeButtonText: {
        color: '#111',
    },
    navText: {
        fontSize: 12,
        color: '#F7F7F7',
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 0.8,
    }
});