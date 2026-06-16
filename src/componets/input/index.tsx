import { TextInput, TextInputProps } from 'react-native';
import { styles } from './style';

type Props = TextInputProps & {
    title?: string;
};

export default function Input({ title, style, value, onChangeText, ...rest }: Props) {
    return (
        <TextInput 
            placeholder={title}
            value={value}
            onChangeText={onChangeText}
            placeholderTextColor="#A0AAB2"
            style={[styles.input, style]}
            {...rest} 
        />
    );
}