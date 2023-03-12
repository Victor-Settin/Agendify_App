import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function PopUpEmailAlreadyExists(props) {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={props.isVisible}
        >
            <TouchableOpacity
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(0,0,0,0.5)",
                }}
                onPress={props.onClose}
            >
                <View
                    style={{
                        backgroundColor: "white",
                        padding: 22,
                        borderRadius: 4,
                        alignItems: "center",
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                    }}
                >
                    <Icon name="check-circle" size={50} color="green" />
                    <Text
                        style={{
                            marginTop: 15,
                            marginBottom: 15,
                            textAlign: "center",
                        }}
                    >
                        Email already exists.
                    </Text>

                    <TouchableOpacity onPress={props.onClose}>
                        <Text style={{ color: "#007AFF", fontSize: 18 }}>
                            OK
                        </Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    );
}
