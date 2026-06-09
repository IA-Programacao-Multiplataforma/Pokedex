import { TouchableOpacity, Text, TouchableOpacityProps } from "react-native"
import { styles } from "./style";

type Props = TouchableOpacityProps & {
    title: string;
};

export default function Button({ title, style, ...rest }: Props) {
    return (
        <TouchableOpacity activeOpacity={0.8} style={[styles.button, style]} {...rest}>
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    );
}