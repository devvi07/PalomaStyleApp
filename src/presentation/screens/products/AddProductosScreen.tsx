import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import { ActivityIndicator, Button, Card, IconButton, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export const AddProductosScreen = ({ route, navigation }: any) => {

    const [ loading, setLoading ] = useState(true);
    const [ marca, setMarca ] = useState('');
    const [ descripcion, setDescripcion ] = useState('');
    const [ talla, setTalla ] = useState('');
    const [ color, setColor ] = useState('');
    const [ precio, setPrecio ] = useState('');
    const [ clasif, setClasif ] = useState('');
    const [ photos, setPhotos ] = useState([]);

    const takePhoto = async() => {

        setLoading(false);
        const result = await launchCamera({
            mediaType: 'photo',
            includeBase64: true,
            quality: 0.7,
            cameraType: 'back'
        });

        if (result.assets && result.assets[0].uri) {
            const image = result.assets[0];
            
            const data = new FormData();
            data.append('file', {
                uri: image.uri,
                type: image.type,
                name: image.fileName,
            });
            
            data.append('upload_preset', 'paloma-style'); // lo configuras en Cloudinary

            const res = await fetch('https://api.cloudinary.com/v1_1/dyfx8jypt/image/upload', {
                method: 'POST',
                body: data,
            });

            const json = await res.json();

            const photoUri: any = [];
            photoUri.push(json.secure_url);

            if(photos.length>0){
                for(const photo of photos){
                    photoUri.push(photo);
                }
                setPhotos(photoUri);
            }else{
                setPhotos(photoUri);
            }
            
            setLoading(true);
              
        }
    
    }

    const createArticulo = async (articulo: any) => {
        setLoading(false);
        console.log("🚀 ~ createArticulo ~ articulo:", articulo)
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        fetch("https://pqt-calva-ws.onrender.com/api/articulos", {
            method: "POST",
            headers: myHeaders,
            body: articulo,
            redirect: "follow"
        }).then(async (response) => {
            const codigo = response.status;
            const texto = await response.text();
            return { codigo, texto };
        }).then((result) => {
            console.log(result);
            if (result.codigo == 201) {
                console.log('Articulo creado exitosamente!');
                setLoading(true);
                navigation.navigate('HomeScreen');
                //setAcept(1);
                //setMessage('¡Cliente registrado exitosamente!');
                //setLoading(true);
                //showAlert();
            }
        }).catch((error) => {
            console.error(error)
        });

    }

    const addArticulo = () => {


        /*if (
            numero.length == 0 ||
            //zona.length == 0 ||
            nombre.length == 0 ||
            direccion.length == 0 ||
            tel.length == 0 ||
            nombreRecibe.length == 0 ||
            direccionRecibe.length == 0 ||
            telRecibe.length == 0

        ) {
            setMessage('¡Todos los campos son necesarios!');
            showAlert();
            return;
        }*/

        let sPhotos = '';
        for (let i = 0; i < photos.length; i++) {
            sPhotos += photos[i];
            if (i < photos.length - 1) {
                sPhotos += ',';
            }
        }

        const articulo = JSON.stringify({
            "marca": marca.trim(),
            "descripcion": descripcion.trim(),
            "talla": talla.trim(),
            "color": color.trim(),
            "precio": precio.trim(),
            "clasif": clasif.trim(),
            "fotos": sPhotos
        });

        createArticulo(articulo);

    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ff9887' }} edges={['top', 'bottom']}>
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
                
                {
                    loading ? 
                    <KeyboardAvoidingView
                        style={{ flex: 1 }}
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0} // ajusta según tu header
                    >

                        <ScrollView
                            contentContainerStyle={{ flexGrow: 1 }}
                            keyboardShouldPersistTaps="handled"
                        >

                            <View style={[ styles.container2 ]}>

                                <View style={styles.containerTitle}>
                                    <Text style={styles.title}>Agregar producto</Text>
                                </View>

                                <View style={{ marginTop: 10, marginHorizontal: 16 }}>
                                    <TextInput
                                        label="Marca"
                                        value={marca}
                                        onChangeText={text => setMarca(text)}
                                        theme={{ colors: { primary: '#ff9887' } }}
                                        style={styles.input}
                                        textColor='#000'
                                    />
                                </View>

                                <View style={{ marginTop: 10, marginHorizontal: 16 }}>
                                    <TextInput
                                        label="Descripción"
                                        value={descripcion}
                                        onChangeText={text => setDescripcion(text)}
                                        theme={{ colors: { primary: '#ff9887' } }}
                                        style={styles.input}
                                        textColor='#000'
                                    />
                                </View>

                                <View style={{ marginTop: 10, marginHorizontal: 16 }}>
                                    <TextInput
                                        label="Talla"
                                        value={talla}
                                        onChangeText={text => setTalla(text)}
                                        theme={{ colors: { primary: '#ff9887' } }}
                                        style={styles.input}
                                        textColor='#000'
                                    />
                                </View>

                                <View style={{ marginTop: 10, marginHorizontal: 16 }}>
                                    <TextInput
                                        label="Color"
                                        value={color}
                                        onChangeText={text => setColor(text)}
                                        theme={{ colors: { primary: '#ff9887' } }}
                                        style={styles.input}
                                        textColor='#000'
                                    />
                                </View>

                                <View style={{ marginTop: 10, marginHorizontal: 16 }}>
                                    <TextInput
                                        label="Precio"
                                        value={precio}
                                        onChangeText={text => setPrecio(text)}
                                        theme={{ colors: { primary: '#ff9887' } }}
                                        style={styles.input}
                                        textColor='#000'
                                        keyboardType='numeric'
                                    />
                                </View>

                                <View style={{ marginTop: 10, marginHorizontal: 16 }}>
                                    <TextInput
                                        label="Clasificación"
                                        value={clasif}
                                        onChangeText={text => setClasif(text)}
                                        theme={{ colors: { primary: '#ff9887' } }}
                                        style={styles.input}
                                        textColor='#000'
                                    />
                                </View>

                                <View style={{ marginHorizontal: 40, marginTop: 15 }}>
                                    <Card style={{ margin: 16 }} onPress={ takePhoto }>

                                        <View style={{ height: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: photos.length>0 ? '#f0e7f6' :'#eee' }}>
                                            <IconButton icon="camera" size={80} style={{ backgroundColor: '#fFFF' }} />
                                        </View>
                                        <Card.Title
                                            title="Tomar foto"
                                            titleStyle={{ textAlign: 'center', color: '#000', fontWeight: '700' }}
                                            style={{
                                                backgroundColor: '#F6F6F6',
                                                borderBottomEndRadius: 7,
                                                borderBottomLeftRadius: 7
                                            }}
                                        />

                                    </Card>
                                    {
                                        photos.length>0 &&
                                        <View>
                                            <Text style={{ textAlign: 'center', fontSize: 15, color:'#000', fontWeight: '600' }}>{`Fotos adjuntas: ${photos.length}\n`} </Text>
                                        </View>
                                    }
                                </View>

                                <View style={{ marginHorizontal: 20, marginTop: 25, marginBottom: 25 }}>
                                    <Button
                                        icon="check-bold"
                                        mode="contained"
                                        onPress={addArticulo}
                                        buttonColor='#ff9887'
                                        labelStyle={{ color: '#FFF' }}
                                        style={{ borderRadius: 7 }}
                                    >
                                        Registrar
                                    </Button>

                                    <View style={{ marginTop: 10 }}>
                                        <Button
                                            icon="close-thick"
                                            mode="contained"
                                        onPress={() => { navigation.goBack(); }}
                                        buttonColor='#e2e2e2'
                                        labelStyle={{ color: '#000' }}
                                        style={{ borderRadius: 7 }}
                                    >
                                        Cancelar
                                    </Button>
                                </View>

                            </View>

                            </View>

                        </ScrollView>

                    </KeyboardAvoidingView>:
                    <View style={{ justifyContent: 'center', alignContent: 'center', marginTop: 250 }}>
                        <ActivityIndicator animating={true} color={'#ff9887'} size={50} />
                    </View>
                }

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
        //#f4b89b --
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
    container2: {
        flex: 1,
        backgroundColor: '#F6F6F6',
        marginHorizontal: 8,
        marginTop: 10,
        //marginBottom: 10,
        borderRadius: 10
    },
    containerTitle: {
        marginTop: 16
    },
    title: {
        color: '#ff9887',
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 16
    },
    input: {
        borderRadius: 7,
        backgroundColor: '#FFF',
        borderColor: '#ff9887'
    }
});