import React from 'react';
import styled from 'styled-components/native';
import { View } from 'react-native';
import axios from 'axios';
import { Loading } from '../components/Loading';


const PostImage = styled.Image`
border-radius: 10px;
width: 100%;
height: 280px;
margin-bottom: 20px;
`;
const PostText = styled.Text`
font-size: 18px;
line-height: 24px;
`;

export const FullPostScreen = ({ route, navigation }) => {
    const [isLoading, setIsLoading]= React.useState(true);
    const [data, setData]= React.useState(true);
    const { id, title } = route.params;


    React.useEffect(() => {
        navigation.setOptions({
            title,
          });
        axios.get('https://66157dbdb8b8e32ffc7b17fd.mockapi.io/articles/' + id)
        .then(({ data }) => {
          setData(data);
        })
        .catch(err => {
          console.log(err);
          Alert.alert('Error', 'Error receiving article')
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, []);

    if(isLoading) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Loading />
        </View>
        );
      }
      

    return(
       <View style={{padding: 20 }}>
        <PostImage source = {{uri: data.imageUrl}} />
        <PostText>{data.text}</PostText>
        </View>
    )
}

