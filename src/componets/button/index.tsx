import { TouchableOpacity, Text, TouchableOpacityProps, StyleProp, ViewStyle } from "react-native"

import {styles} from "./style";

type Props = TouchableOpacityProps & {
    title: string;
};

export default function Button({ title, style, ...rest }: Props) {
    return (
        <TouchableOpacity style={[styles.button, style]} {...rest}>
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    );
}