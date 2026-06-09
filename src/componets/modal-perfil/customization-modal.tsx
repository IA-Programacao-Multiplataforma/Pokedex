import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Modal, StyleSheet, Dimensions } from 'react-native';
import {styles} from '@/componets/modal-perfil/style'

// Mock de imagens do Ash com expressões diferentes para simular sua lista
const MOCK_AVATARS = [
    'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjxLvyyzrsdMKUqGZciyYYbEgPdbIz21P4ATE-pjai8GL38-Ag3ANtGOBxs35FQbO3RqZWFl5g0wuzrx0MeElIKjWAkmDEDAXngsodAjKVIzMn8W0OysbeyjsOoZ96oPG0APH2PGC4hk9o/s200/01+ash.PNG',
    'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjdxx9VnjDFTzYAFNgO-JwuZKEo8nlJHM3vVIo92Zjjxu_c9_aHqEqX-N4l1r7AzF8xXm9VEDUDl1cpkE3UE-6sUAfuN03W0rWEtPup18OZ07ec6NpXe7ywsWheY2myVTZGo9kb4527XlY/s200/02+misty.png',
    'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhAPKgDTx0Vxoc8tqM04jQWswopTs1WVSUexEXqn2crB83ongNfDTO7PNM4-ouvceuR95EhQuwZWOX5__iKOpXscBs1NxjWCprZ0af_l_YISGSJxGQo6BuZMLicsy_6MOvK86JqTrADSLk/s200/05+may.png',
    'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgLZ0oiWkDqoHp1n3AYZtx8MUq5j8OWSiBCFFzY74AyWgj9yF_QXlDTRau8kxgtBI6kB_G1WHtqfjlLFOp6I56WVfkFwsHI3Ppnnhxuv6GLSY-4UZyfPqmXH0lrZF3XQ0H5hTgVLLm4Ous/s200/06+max.png',
    'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgo8kgHRGntgccKcmeNP2UYErAYWvkt7BZMVOeTO_6mvDgs_Ni0HYKC3M3Sp3waVjwT0IK-kYQhyphenhyphenhd66B-pnBcOTYmrXKTYYLfwQexBCaOxijNboxcvKWKynUiMNJYfbHmPBGeM_4nES7k/s200/07+dawn.png',
    'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhYK1uvjdOUT3D7j3OCXaUrlSunOtYPI2B2iaR7cO0BV936yrDBCBRX2E95mdF6cayEUKLdlyIDUcgj8tJkABKgnSq4YXmLirgNxuJlh0p9oOEb57rr6HI-_OUENkFGQjbMMwyvpX4JQZ0/s200/08+cilan.png',
    'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiK0t7Wgk7qyRW3HEIitIDQbJnO-K5P4Ox3iY80jj3HVt6RBJeojyKs6HNxIP8tktHQ1jM2we5T5KMgimtOHmhdIp-OFBI_WXgKUg1D2v0ob-p3kIhvjNRBUvIq_ON1DfzQcnUflsVY7d4/s200/16+casey.png',
    'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjDUqeh-4H_1LucaX-72QJ637TjW66oQ9EHAH-FyfTEPE2UcWuEHYCa23_dMIwKJa7XbwxJYx00h-rbZ7YnHLQFnektBtf_0_sqI_aG0xbcomJOP6KEE_qyJF65ZDyF03iwfzQ4L-2DpMg/s200/17+ritchie.png',
    'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiOg3chgKRZ5OhOSccxA_hIG1ncA58vwRiQAHrHJwQhSykk5ZqzJl7C-S2MEha6USyM3e_JXVAdV7bLIbHjbxCRxYgleC9ZVAsSFNSbyHX3C5xOCtEQhiHSACYo0kZLJaKDoEDsxggaQUo/s200/27+conway.png',
    'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjw31eZUH3iVITDwnSOHAksCSafPI79iuuddOVlKYzcysYg3STSg2E46gQNQ9u7feubrvEpF5NZ9HY8aOXLzGKbVRI58KhkTnTK3iPfpzSVGbV9DyFkTCNTomn8OxJjW_mPSXhISHHuN7c/s200/26+cheryl.png',
    'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiw9q5QZlHnXG4NKSCGsaeERg4xOH0YLzWw5_ZCWFwyFJSLzZP5X5d_qQyVSZ52YFs5PWsOSWO7W0VyKdw22qQijn3unHNlM1Vg2fZfbE0tcB5QI5V0OIOiemYSQOa9H47CXYRwPIpd5EY/s200/30+lyra.png',
    'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgTOiY3PgYe2moWRYY7fRni89HKZx0Dk2ZV_31aYtFvLgg_cxyuJoyktFaCf4Y1u7dwNYBlLNh_t4r0GncGuB9-o0EP32k3xcmXOjs2mwcpX9ncuJYCBqGyb8wfs9mYeEtsSs1fTx9lYJE/s200/31+nando.png',
    'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgIbx-Va5bg2_DfDUa5eAG-pDGQabiYo9DF9zsSzYNTy9O4CCIXaUWHcIdTUVDtR17N1ZCvIc7Rx_uvpP2oWEqrAEDje4JO7ZC8HV7vM5PVl5eu37UQd5b5uECMctQB43dgPTU_bduJVQs/s200/32+paul.png',
    'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjXXdHKzRvfJHmfZY9CLwmWT1mcdeG36XdOQog6GV-8O65EVabJzExhM2QCTe-j-u9pryJtOG9hVkHVJQs8OAOqW45EoEb09h4I606w1Nx_1ACUivq_TWueXJZsC0q0156GFLi7NfxQsP4/s200/45+shauna.png',
    'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgpryxFm0CZLd-YuyTgCIWVlLPEzZ_eZe5tTtQAII-zqMffp4Q5Ys04DSWQZgAr8v7AqRpRVjHQOMuT7NL6AmuXz1clyjjRVPdMbuwz9D_bsxPwx_M5Xy61WV69x0XjE1NLtBLys6jCbn4/s200/38+georgia.png',
];

const MOCK_COLORS = [
    '#FF3838', '#00A8CC', '#00C896', 
    '#0056B3', '#6F2CF3', '#C779F4', 
    '#FF7A00', '#1212B3', '#000000',
    '#f073d5', '#0ea80c', '#49240f'
];

interface CustomizationModalProps {
    visible: boolean;
    onClose: () => void;
    currentAvatar: string;
    currentBgColor: string;
    onSave: (avatar: string, color: string) => void;
}

export default function CustomizationModal({ 
    visible, 
    onClose, 
    currentAvatar, 
    currentBgColor, 
    onSave 
}: CustomizationModalProps) {
    const [activeTab, setActiveTab] = useState<'avatar' | 'fundo'>('avatar');
    const [tempAvatar, setTempAvatar] = useState<string>(currentAvatar);
    const [tempBgColor, setTempBgColor] = useState<string>(currentBgColor);

    const handleSave = () => {
        onSave(tempAvatar, tempBgColor);
        onClose();
    };

    return (
        <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
            <View style={styles.modalOverlay}>
                <View style={styles.bottomSheet}>
                    
                    {/* Botões de Alternância: Avatar / Fundo */}
                    <View style={styles.tabRow}>
                        <TouchableOpacity 
                            style={[styles.tabButton, activeTab === 'avatar' && styles.activeTabButton]} 
                            onPress={() => setActiveTab('avatar')}
                        >
                            <Text style={styles.tabText}>Avatar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={[styles.tabButton, activeTab === 'fundo' && styles.activeTabButton]} 
                            onPress={() => setActiveTab('fundo')}
                        >
                            <Text style={styles.tabText}>Fundo</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Área de Seleção Grid */}
                    <ScrollView contentContainerStyle={styles.gridContainer} showsVerticalScrollIndicator={false}>
                        {activeTab === 'avatar' ? (
                            <View style={styles.grid}>
                                {MOCK_AVATARS.map((imgUrl, index) => (
                                    <TouchableOpacity 
                                        key={index} 
                                        style={[styles.gridItem, tempAvatar === imgUrl && styles.selectedItem]} 
                                        onPress={() => setTempAvatar(imgUrl)}
                                    >
                                        <Image source={{ uri: imgUrl }} style={styles.gridAvatar} />
                                    </TouchableOpacity>
                                ))}
                            </View>
                        ) : (
                            <View style={styles.grid}>
                                {MOCK_COLORS.map((color, index) => (
                                    <TouchableOpacity 
                                        key={index} 
                                        style={[
                                            styles.gridItem, 
                                            styles.colorCircle, 
                                            { backgroundColor: color },
                                            tempBgColor === color && styles.selectedItem
                                        ]} 
                                        onPress={() => setTempBgColor(color)}
                                    />
                                ))}
                            </View>
                        )}
                    </ScrollView>

                    {/* Botão de Salvar interno do Modal */}
                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <Text style={styles.saveButtonText}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}
