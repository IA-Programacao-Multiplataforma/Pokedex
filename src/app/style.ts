// src/app/styles.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center', 
    },
    topHalf: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '50%',
        backgroundColor: '#E3350D', 
    },
    bottomHalf: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '50%',
        backgroundColor: '#F5F5F5', 
    },
    middleBand: {
        position: 'absolute',
        top: '50%',
        left: 0,
        right: 0,
        height: 16,
        backgroundColor: '#222224',
        marginTop: -8, 
    },
    loginCard: {
        backgroundColor: '#FFFFFF',
        width: '90%',
        maxWidth: 400,
        padding: 32,
        borderRadius: 24, 
        borderWidth: 4, 
        borderColor: '#222224',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 10,
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    pokeballIcon: {
        width: 70,
        height: 70,
        marginBottom: 10,
    },
    label: {
        color: '#3B4CCA', 
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 4,
        marginTop: 10,
        marginBottom: 4,
    },
    title: {
        color: '#FFCC00', 
        textShadowColor: '#3B4CCA', 
        textShadowOffset: { width: -2, height: 2 },
        textShadowRadius: 1,
        fontSize: 34,
        fontWeight: '900',
        textAlign: 'center',
        textTransform: 'uppercase',
        letterSpacing: 2,
    }
});