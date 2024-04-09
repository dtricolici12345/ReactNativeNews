

import React from 'react';
import axios from 'axios';
// import styled from 'styled-components/native';
import { View, Alert, FlatList, ActivityIndicator, Text, RefreshControl,TouchableOpacity, StyleSheet, Image } from 'react-native';
import Post from '../components/Post'; 
import { Loading } from '../components/Loading';




export const HomeScreen = ({ navigation }) => {

  const [items, setItems]= React.useState();
  const [isLoading, setIsLoading]= React.useState(true);

const fetchPosts = () => {
  setIsLoading(true);
  axios.get('https://66157dbdb8b8e32ffc7b17fd.mockapi.io/articles')
  .then(({ data }) => {
    setItems(data);
  })
  .catch(err => {
    console.log(err);
    Alert.alert('Error', 'Error receiving articles')
  })
  .finally(() => {
    setIsLoading(false);
  });
}


  React.useEffect(fetchPosts, []);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 15 }}>Loading...</Text>
      </View>
    );
  }

return (
  <View>
    <FlatList 
      refreshControl={
        <RefreshControl 
          refreshing={isLoading}
          onRefresh={fetchPosts} 
        />
      }
      data={items}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('FullPost', { id: item.id, title: item.title })}>
          <Post title={item.title} imageUrl={item.imageUrl} createdAt={item.createdAt} />
        </TouchableOpacity>
      )}
    />
  </View>
);
}
