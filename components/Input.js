import React, { useState, useCallback, memo, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        marginVertical: 7,
    },
    input: {
        fontSize: 16,
        color: '#404b69',
        backgroundColor: 'transparent',
    },
});

const Input = ({
    onFieldChange,
    name,
    value,
    multiline,
    error,
    label,
    keyboardType,
    numberOfLines,
    password,
    disabled,
    maxLength,
}) => {
    const [fieldValue, setFieldValue] = useState(value);
    const [errorText, setErrorText] = useState(error);

    const onChange = useCallback(
        (val) => {
            setFieldValue(val);
            setErrorText(null);
            onFieldChange(name, val);
        },
        [name, onFieldChange, setFieldValue, setErrorText],
    );

    useEffect(() => setErrorText(error), [error]);

    useEffect(() => {
        setFieldValue(value);
    }, [value]);

    return (
        <>
            <View style={styles.inputContainer}>
                <TextInput
                    onChangeText={onChange}
                    value={fieldValue}
                    style={styles.input}
                    editable={!disabled}
                    autoCapitalize="none"
                    keyboardType={keyboardType || 'default'}
                    secureTextEntry={password}
                    spellCheck={false}
                    error={!!errorText}
                    multiline={multiline}
                    numberOfLines={numberOfLines}
                    label={label}
                    maxLength={maxLength}
                />
                {errorText && (
                    <HelperText type="error" visible>
                        {errorText}
                    </HelperText>
                )}
            </View>
        </>
    );
};

export { Input };