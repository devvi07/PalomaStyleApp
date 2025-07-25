import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import { Icon } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export const KidsScreen = ({ navigation }: any) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }} edges={['top', 'bottom']}>
            <View style={{ flex: 1, backgroundColor: '#FFF' }}>

                <View style={styles.container}>
                    {/* Logo centrado */}
                    <View style={styles.logoContainer}>
                        <Image
                            style={{
                                width: 110,
                                height: 110,
                                resizeMode: 'contain'
                            }}
                            source={require('../../../assets/image/PalomaHeartP.png')}
                        />
                    </View>
                </View>

                <View style={{ backgroundColor: '#fff', flex: 1 }}>

                    <ScrollView>

                        <Text>KIDS</Text>

                    </ScrollView>

                </View>

                <View style={[styles.innerContainer, { gap: 40 }]}>

                    <TouchableOpacity 
                                        onPress={()=>{ 
                                            navigation.navigate('HomeScreen');
                                         }}
                                    >
                                        <View style={{ alignItems: 'center', padding: 7 }}>
                                            <Icon
                                                source="home"
                                                color={'#ff9887'}
                                                size={40}
                                            />
                                            <Text style={{ color: '#ff9887', fontWeight: '700' }}>Inico</Text>
                                        </View>
                                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Women');
                        }}
                    >
                        <View style={{ alignItems: 'center', padding: 7 }}>
                            <Icon
                                source="face-woman"
                                color={'#ff9887'}
                                size={40}
                            />
                            <Text style={{ color: '#ff9887', fontWeight: '700' }}>Mujer</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Men');
                        }}
                    >
                        <View style={{ alignItems: 'center', padding: 7 }}>
                            <Icon
                                source="face-man"
                                color={'#ff9887'}
                                size={40}
                            />
                            <Text style={{ color: '#ff9887', fontWeight: '700' }}>Hombre</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Kids');
                        }}
                    >
                        <View style={{ alignItems: 'center', padding: 7 }}>
                            <Icon
                                source="human-queue"
                                color={'#ff9887'}
                                size={40}
                            />
                            <Text style={{ color: '#ff9887', fontWeight: '700' }}>Niños</Text>
                        </View>
                    </TouchableOpacity>


                </View>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 90,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        zIndex: 10,
    },
    logoContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    logoText: {
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 1,
        color: '#333',
    },
    iconBtn: {
        padding: 6,
    },
    rightIcons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    header: {
        backgroundColor: '#FFF',
        height: 90,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        //borderRadius: 10,-
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8, // Android
        //borderBottomWidth: 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        //borderBottomStartRadius: 20,
        //borderBottomEndRadius: 20
    },
    bottomNav: {
        backgroundColor: '#e4e4f2',
        height: 70,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        //borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8, // Android
        justifyContent: 'center',
        //alignItems: 'center',
    },
    innerContainer: {
        backgroundColor: '#F6F6F6',
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 10,
        marginHorizontal: 16,
        marginBottom: 10
    },
});