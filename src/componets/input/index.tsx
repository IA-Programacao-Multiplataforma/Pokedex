import { TextInput, TextInputProps, StyleSheet } from 'react-native';
import { styles } from './style';
type Props = TextInputProps & {
    title?: string;
};

export default function Input({ title, style, ...rest }: Props) {
    return (
        <TextInput 
            placeholder={title}
            style={[styles.input, style]}
            {...rest} 
        />
    );
}