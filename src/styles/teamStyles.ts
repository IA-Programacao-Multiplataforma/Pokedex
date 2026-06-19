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
})