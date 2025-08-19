import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, Card, Icon } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { formatMiles } from '../../../utils/Utils';
import { useIsFocused } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

export const ManScreen = ({ navigation }: any) => {

    const isFocused = useIsFocused();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    const getData = async () => {

        fetch("https://pqt-calva-ws.onrender.com/api/articulos", {
            method: "GET",
            redirect: "follow"
        }).then(async (response) => {
            const codigo = response.status;
            const data = await response.json();
            return { codigo, data };
        }).then((result) => {
            console.log(result)
            if (result.codigo == 200) {
                console.log("🚀 ~ getArticulos ~ result.data:", result.data);

                if (result.data && result.data.length > 0) {
                    const oMan = result.data.filter((item: any) => item.clasif == 'Hombre');
                    console.log("🚀 ~ getData ~ oMan:", oMan)
                    setData(oMan);
                    setLoading(true);
                } else {
                    setData([]);
                    setLoading(true);
                }
            }

        }).catch((error) => {
            console.error(error);
            setData([]);
            setLoading(true);
        });

    };

    useEffect(() => {
        getData();
    }, [isFocused]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f8d6c3' }} edges={['top', 'bottom']}>
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

                    {
                        loading ?
                            <>
                                <View style={{ backgroundColor: '#fff', flex: 1 }}>

                                    {
                                        data.length > 0 ?
                                            <ScrollView contentContainerStyle={styles.containerCard}>

                                                {data.map((item: any, index) => (
                                                    <View key={index.toString()} style={styles.cardWrapper}>
                                                        <Card style={styles.card} onPress={() => { navigation.navigate('ProductDetail', { item: item }); }}>
                                                            <FastImage
                                                                style={{ width: 'auto', height: 100, borderRadius: 10 }}
                                                                source={{
                                                                    //uri: `${item.foto}`,
                                                                    uri: new String(item.fotos).split(',')[0],
                                                                    priority: FastImage.priority.normal,
                                                                }}
                                                                resizeMode={FastImage.resizeMode.cover}
                                                            />
                                                            <Card.Content style={styles.content}>
                                                                <Text style={styles.title}>{item.descripcion}</Text>
                                                                <Text style={styles.price}>{formatMiles(item.precio, true)}</Text>
                                                            </Card.Content>
                                                        </Card>
                                                    </View>
                                                ))}

                                            </ScrollView> :
                                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                                <Text style={{ textAlign: 'center', color: '#ff9887', fontSize: 17, fontWeight: '500' }}>No existen productos para hombre</Text>
                                            </View>
                                    }

                                </View>
                            </> : <View style={{ justifyContent: 'center', alignContent: 'center', marginTop: 250 }}>
                                <ActivityIndicator animating={true} color={'#ff9887'} size={50} />
                            </View>
                    }

                </View>

                <View style={[styles.innerContainer, { gap: 40 }]}>

                    <TouchableOpacity
                        onPress={() => {
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

    containerCard: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 10,
    },
    cardWrapper: {
        width: '48%',
        marginBottom: 15,
    },
    card: {
        borderRadius: 10,
        overflow: 'hidden',
    },
    image: {
        height: 120,
        borderRadius: 0,
    },
    content: {
        paddingVertical: 8,
        alignItems: 'center',
        backgroundColor: '#FFF'
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    price: {
        fontSize: 13,
        color: '#4CAF50',
        marginTop: 4,
        fontWeight: '600',
    },
});