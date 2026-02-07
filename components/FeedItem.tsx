import React from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions } from 'react-native';
import { FeedItemType } from '../types/Feed';

interface Props {
  item: FeedItemType;
}

const FeedItem: React.FC<Props> = ({ item }) => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  
  return (
    <View style={styles.card}>
      <Image 
        source={{ uri: item.download_url }} 
        style={[styles.image, { height: isLandscape ? 180 : 200 }]} 
      />
      <Text style={styles.author}>Author: {item.author}</Text>
      <Text style={styles.id}>ID: {item.id}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  image: {
    width: '100%',
    borderRadius: 8,
  },
  author: {
    marginTop: 8,
    fontWeight: 'bold',
  },
  id: {
    color: '#666',
    marginTop: 4,
  },
});

export default FeedItem;