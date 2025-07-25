import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { ActivityIndicator, Icon } from 'react-native-paper';
import Carousel from 'react-native-reanimated-carousel';
import { SafeAreaView } from 'react-native-safe-area-context';
import { formatMiles } from '../../../utils/Utils';

export const ProductDetail = ({ route, navigation }: any) => {

    const { item } = route.params;
    const { width, height } = useWindowDimensions();
    const [index, setIndex] = useState(0);
    const [ products, setProducts ] = useState([]);
    const [ loading, setLoading ] = useState(false);



    /*const products = [{
    id: '1',
    name: 'Nike Air Max',
    price: '$120',
    image: 'https://res.cloudinary.com/dyfx8jypt/image/upload/v1746201137/samples/ecommerce/shoes.png',
  },
  {
    id: '2',
    name: 'Adidas Ultraboost',
    price: '$140',
    image: 'https://res.cloudinary.com/dyfx8jypt/image/upload/v1746201136/samples/ecommerce/analog-classic.jpg',
  },
  {
    id: '3',
    name: 'Puma RS-X',
    price: '$110',
    image: 'https://res.cloudinary.com/dyfx8jypt/image/upload/v1746201148/cld-sample-5.jpg',
  },
];*/

    useEffect(()=>{
        console.log("🚀 ~ ProductDetail ~ item:", item);
        const photos = new String(item.fotos).split(',');
        const oProducts: any = [];
        for(let v=0; v<photos.length;v++){
            oProducts.push({
                id: v.toString(),
                image: photos[v],
            });
        }

        setProducts(oProducts);
        setLoading(true);

    },[]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFF' }} edges={['top', 'bottom']}>
            <View style={{ flex: 1, backgroundColor: '#FFF' }}>

                {
                    loading ?
                    <View style={{ backgroundColor: '#fff', flex: 1 }}>

                    <ScrollView>

                        <View style={styles.container}>
                            <Carousel
                                loop
                                width={width}
                                height={300}
                                autoPlay={products.length>1}
                                data={products}
                                scrollAnimationDuration={1000}
                                onSnapToItem={(i) => setIndex(i)}
                                renderItem={({ item }: any) => (
                                <View style={styles.card}>
                                    <Image source={{ uri: item.image }} style={styles.image} />
                                    {/*<FastImage
                                        style={{ width: 250, height: 200, borderRadius: 10 }}
                                        source={{
                                            uri: item.image,
                                            priority: FastImage.priority.normal,
                                        }}
                                        resizeMode={FastImage.resizeMode.cover}
                                    />*/}
                                    {/*<View style={styles.footer}>
                                        <Text style={styles.name}>{item.name}</Text>
                                        <Text style={styles.price}>{item.price}</Text>
                                    </View>*/}
                                </View>
                                )}
                            />
                            {/* Dots */}
                            <View style={styles.dotsContainer}>
                                {products.map((_, i) => (
                                <View key={i}
                                    style={[
                                        styles.dot,
                                        index === i ? styles.activeDot : styles.inactiveDot,
                                    ]}
                                />
                                ))}
                            </View>

                            <View style={{ top: -50, marginHorizontal: 20 }}>
                                <Text>{`Marca: ${item.marca}`}</Text>
                                <Text>{`Descripción: ${item.descripcion}`}</Text>
                                <Text>{`Talla: ${item.talla} cm` }</Text>
                                <Text>{`Color: ${item.color}` }</Text>
                                <Text>{`Precio: ${formatMiles(item.precio, true)}` }</Text>
                            </View>

                        </View>

                    </ScrollView>

                </View>:
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
    marginTop: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 0,
    overflow: 'hidden',
    elevation: 3,
    marginHorizontal: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    resizeMode: 'cover'
  },
  footer: {
    padding: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  price: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    top: -80
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 6,
    marginHorizontal: 6,
  },
  activeDot: {
    backgroundColor: '#ff9887',
  },
  inactiveDot: {
    backgroundColor: '#ccc',
  },
});
