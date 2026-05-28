import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    button: {
        width: '100%',
        height: 52,
        backgroundColor: '#FFCC00', 
        borderRadius: 12, 
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    title: {
        color: '#3B4CCA', 
        fontSize: 18,
        fontWeight: '900',
        textTransform: 'uppercase', 
        letterSpacing: 1, 
    }
});