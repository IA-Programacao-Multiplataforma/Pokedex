import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    bottomSheet: {
        height: height * 0.6,
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
        justifyContent: 'space-between',
        width: width - 40,
    },
    gridItem: {
        width: (width - 70) / 3,
        height: (width - 70) / 3,
        marginBottom: 15,
        borderRadius: 100,
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
        borderRadius: 100,
    },
    saveButton: {
        backgroundColor: '#4E4E4E',
        width: '60%',
        paddingVertical: 12,
        borderRadius: 25,
        alignItems: 'center',
        marginBottom: 25,
        borderWidth: 1,
        borderColor: '#666',
    },
    saveButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});