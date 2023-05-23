// import * as React from 'react';
// import { Avatar, Button, Card, Text } from 'react-native-paper';
// import { View} from 'react-native';

// import 'react-native-gesture-handler';
// import { useNavigation } from '@react-navigation/native';

// const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

// const navigation = useNavigation();
// const handlePress = (medicinedata) => {
//     console.log("itemSeq나와라@",medicinedata)
//     navigation.navigate('Detail', {medicinedatitemSeq: medicinedata})
//   }

// const MyComponent = ({medicinedata}) => (
    
//     <View>
//       {medicinedata.map((item, idx) => (
//         <Card key={idx}>
//           <Card.Title title={item.title} subtitle={item.subtitle} left={LeftContent} />
//           <Card.Content>
//             <Text variant="titleLarge">{item.title}</Text>
//             <Text variant="bodyMedium">{item.subtitle}</Text>
//           </Card.Content>
//           <Card.Cover source={{ uri: item.imageUri }} />
//           <Card.Actions>
//             {/* <Button onPress={() => console.log("취소")}>Cancel</Button> */}
//             <Button onPress={() =>  handlePress(medicinedata[idx].itemSeq)}>약 보러가기</Button>
//           </Card.Actions>
//         </Card>
//       ))}
//     </View>
//   );
  

// export default MyComponent;


import * as React from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { View, StyleSheet, AccessibilityInfo } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// 아이콘
import Icon from 'react-native-vector-icons/FontAwesome';
import noimage from '../assets/noimage.png';


const LeftContent = props => <Avatar.Icon {...props} icon="pill" />

const MyComponent = ({medicinedata,bookmark, setBookmark}) => {
  const navigation = useNavigation();
  console.log("bookmarkjksadhk",bookmark)
  const handlePress = (itemSeq, bookmark) => {
    console.log("itemSeq나와라@", itemSeq)
    console.log("bookmark13kjsd",bookmark)
    navigation.navigate('Detail', {medicinedatitemSeq: itemSeq, bookmark: bookmark, setBookmark: setBookmark})// bookmark, bookmarklist 변경하는 함수 그대로 MedicineDetail로 넘겨주는 통로임!!!!!! 
  }

  return (
    <View>
      
      {medicinedata.map((item, idx) => (
        <Card key={idx} style={{marginBottom:30}} onPress={() => handlePress(medicinedata[idx].itemSeq, bookmark)}
        accessible={true}
        accessibilityElementsHidden={true}>
          <View 
          accessibilityLabel={`${medicinedata[idx].itemName.split("(")[0]}`}
          accessible={true}>
          <Card.Title title={medicinedata[idx].itemName} subtitle={medicinedata[idx].updateDe} left={LeftContent} accessible={false}
          />
          <Card.Content accessible={false}>
            {/* <Text variant="titleLarge">{medicinedata[idx].updateDe}</Text> */}
            {/* <Text variant="bodyMedium">{medicinedata[idx].updateDe}</Text> */}
          </Card.Content >
            {/* {
                medicinedata[idx].itemImage === null?<Icon style={styles.mediicon} name="medkit" size={70} color="black" />:
                <Card.Cover source={{uri : medicinedata[idx].itemImage}}/>
            } */}
            {
                medicinedata[idx].itemImage === null?<Card.Cover  source={{ uri: 'https://panacea.s3.ap-northeast-2.amazonaws.com/default/medicine_default.jpg' }}  style={{ width:'100%'}}/>:
                <Card.Cover source={{uri : medicinedata[idx].itemImage}} accessible={false}/>
            }
          {/* <Card.Cover source={{ uri: item.imageUri }} /> */}
          <Card.Actions accessible={false}>
            {/* <Button onPress={() => console.log("취소")}>Cancel</Button> */}
            {/* <Button onPress={() => handlePress(medicinedata[idx].itemSeq)}>약 보러가기</Button> */}
          </Card.Actions>
          </View>
        </Card>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
    // container: {
    //   width: width *0.82,
    //   height: height,
    // },
    medibox: {
      flex:1,
      flexDirection: 'row',
      alignItems: "center",
      borderWidth:1,
      borderRadius:10,
      marginBottom: '10%',
      padding:5,
      },
      mediicon:{
      // borderWidth:1,
      // borderColor:'red',
      padding:2,
      justifyContent: "center",
      alignItems: "center",
      marginRight:15,
      },
      mediimage:{
        width: 100 , 
        height: 100,
        resizeMode:"contain",
        
      },
      medititletext:{
          // borderWidth:1,
          // borderColor:'blue',
          width:'90%',
          margin:10,
      // justifyContent: "center",
      // alignItems: "center",
      },
      meditext:{
      // borderWidth:1,
      // justifyContent: "center",
      // alignItems: "center",
      },
  });
  

export default MyComponent;
