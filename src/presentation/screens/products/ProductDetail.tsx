import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { ActivityIndicator, Button, Icon } from 'react-native-paper';
import Carousel from 'react-native-reanimated-carousel';
import { formatMiles } from '../../../utils/Utils';

export const ProductDetail = ({ route, navigation }: any) => {

  const { item } = route.params;
  const { width, height } = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const goToEditarProducto = ()=> {
    navigation.navigate('EditarProductos', { item: item })
  }

  const deleteArticulo = () => {
    setLoading(false);

    fetch(`https://pqt-calva-ws.onrender.com/api/articulos/${item._id}`, {
      method: "DELETE",
      redirect: "follow"
    }).then(async (response) => {
      const codigo = response.status;
      const data = await response.json();
      return { codigo, data };
    }).then((result) => {
      
      console.log(result)
      if (result.codigo == 200) {

      }
      setLoading(true);
      navigation.goBack();

    }).catch((error) => {
      console.error(error);
      setLoading(true);
    });
  };

  useEffect(() => {
    console.log("🚀 ~ ProductDetail ~ item:", item);
    const photos = new String(item.fotos).split(',');
    const oProducts: any = [];
    for (let v = 0; v < photos.length; v++) {
      oProducts.push({
        id: v.toString(),
        image: photos[v],
      });
    }

    setProducts(oProducts);
    setLoading(true);

  }, []);

  return (
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
                  autoPlay={products.length > 1}
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
                  <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{`Marca: `}<Text style={{ fontWeight: '400' }}>{`${item.marca}`}</Text></Text>
                  <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{`Descripción: `}<Text style={{ fontWeight: '400' }}>{`${item.descripcion}`}</Text></Text>
                  <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{`Talla: `}<Text style={{ fontWeight: '400' }}>{`${item.talla}`}</Text></Text>
                  <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{`Color: `}<Text style={{ fontWeight: '400' }}>{`${item.color}`}</Text></Text>
                  <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{`Precio: `}<Text style={{ fontWeight: '400' }}>{`${formatMiles(item.precio, true)}`}</Text></Text>
                </View>

                {/*Este bloque solo es para el admin*/}
                <View style={{ marginHorizontal: 20 }}>
                  <Button
                    icon="lead-pencil"
                    mode="contained"
                    onPress={ goToEditarProducto }
                    style={{ borderRadius: 8 }}
                    buttonColor='#2196F3'
                    textColor='#FFFF'
                  >
                    Editar producto
                  </Button>
                </View>

                <View style={{ marginTop: 20, marginHorizontal: 20 }}>
                  <Button
                    icon="trash-can"
                    mode="contained"
                    onPress={deleteArticulo}
                    style={{ borderRadius: 8 }}
                    buttonColor='#C62828'
                    textColor='#FFFF'
                  >
                    Eliminar producto
                  </Button>
                </View>

              </View>

            </ScrollView>

          </View> :
          <View style={{ justifyContent: 'center', alignContent: 'center', marginTop: 250 }}>
            <ActivityIndicator animating={true} color={'#ff9887'} size={50} />
          </View>
      }

    </View>

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
