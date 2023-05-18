//gpt 채팅 화면

import React, {useState} from 'react'
import {View, Text,StyleSheet, TextInput, TouchableOpacity, Platform} from 'react-native'

// 서버통신
import axios from 'axios';
import ServerPort from '../../Components/ServerPort';
const IP = ServerPort();

import MessageList from '../../Components/MessageList';

import Icon from '@expo/vector-icons/MaterialCommunityIcons';
//색 모음
import {theme} from '../../theme';
// import { Platform } from 'react-native';


const messages = [];
function Gpt({navigation, route}){

  // // 사용자 메세지 1개 보내기 성공
  // const [message, setMessage] = useState(''); //message입력

  // const sendMessageToServer = async () => {
  //   try {
  //     const res = await axios.post(`${IP}/chat/question`, {
  //       content: message,
  //     });
  //     // 성공적으로 요청이 처리되었을 때의 동작을 수행하십시오.
  //     console.log("chatgpt sendMessage...", message)
  //     console.log('메시지 전송 완료', res.data);
  //     setMessage(''); // 메시지 입력 초기화
  //   } catch (error) {
  //     // 요청이 실패한 경우에 대한 오류 처리를 수행하십시오.
  //     console.log("chat gpt메세지 보내기 실패,,,", error)
  //     console.log("뭐보냄?...", message)
  //   }
  // };

  // 사용자가 보낸 메세지 전부 axios통신보내버리기
  const [message, setMessage] = useState(''); // 사용자 메시지 입력
  const [conversations, setConversations] = useState([]); // 대화 목록
   // 사용자가 보낸 데이터를 저장할 배열
  const sendMessageToServer = async (mesasage) => {

    messages.push({ role: 'user', content: message });
    setMessage(''); // 메시지 입력 초기화

    const newConversation = [
      { role: 'user', content: message }, // 사용자 메시지
    ];
    setConversations(prevConversations => [...prevConversations, newConversation]);

    try {
      const res = await axios.post(`${IP}/chat/question`,messages);
      console.log("chatgpt sendMessage...", message);
      console.log('메시지 전송 완료', res.data);
  
      const newConversation = [
        { role: 'assistant', content: res.data }, // 어시스턴트의 응답
      ];
      messages.push({ role: 'assistant', content: res.data })
      setConversations(prevConversations => [...prevConversations, newConversation]);
      console.log(conversations)
      console.log("COMPLEATE")
      // setMessage(''); // 메시지 입력 초기화
    } catch (error) {
      console.log("chat gpt메세지 보내기 실패,,,", error);
      console.log("뭐보냄?...", message);
    }
  };
 
   return(
        <View style={{flex:1}}>
            <MessageList conversations={conversations}/>
            {/* 입력 창 */}
            <View style={styles.TextInputcontainer}>
                <View style={styles.innerContainer}>
                    <View style={styles.inputAndMicrophone}>
                        <TouchableOpacity 
                        style={styles.emoticonButton}
                        >
                            <Icon name="emoticon-outline" size={23} color={theme.colors.description} />
                        </TouchableOpacity>
                        <TextInput
                            multiline
                            placeholder='쓰고 싶은 말 써봐라!'
                            style={styles.input}
                            value={message} // 현재 message 값을 입력 값으로 설정
                            onChangeText={text=>setMessage(text)}
                        />
                        <TouchableOpacity style={styles.rightIconButtonStyle}>
                            <Icon name="paperclip" size={23} color={theme.colors.description} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.rightIconButtonStyle}>
                            <Icon name="camera" size={23} color={theme.colors.description} />
                        </TouchableOpacity>
                    </View>    
                    {/* 일단 잠들어 있어라,,,, 돈 나간다!!!!!! */}
                    <TouchableOpacity style={styles.sendButton} onPress={() => sendMessageToServer(message)}>
                    {/* <TouchableOpacity style={styles.sendButton} > */}
                            <Icon name={message ? "send" : "microphone"} size={23} color={theme.colors.white} />
                    </TouchableOpacity>
                </View>
            </View>

        </View>



    )
}

export default Gpt;

const styles = StyleSheet.create({
    TextInputcontainer:{
      justifyContent: 'center',
      backgroundColor: theme.colors.white
    },
    innerContainer:{
      paddingHorizontal:10,
      marginHorizontal:10,
      justifyContent:'space-between',
      alignItems:'center',
      flexDirection:'row',
      paddingVertical:10
    },
    inputAndMicrophone:{
      flexDirection:'row',
      backgroundColor:theme.colors.inputBackground,
      flex:3,
      marginRight:10,
      paddingVertical: Platform.OS === "ios" ? 10 : 0,
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    emoticonButton:{
      justifyContent:'center',
      alignItems: 'center',
      paddingLeft: 10,
    },
    rightIconButtonStyle:{
        justifyContent:'center',
        alignItems: 'center',
        paddingRight: 15,
        paddingLeft: 10,
        borderLeftWidth:1,
        borderLeftColor:'#fff'
    },
    input:{
      backgroundColor:'transparent',
      paddingLeft:20,
      color: theme.colors.inputText,
      flex:3,
      fontSize:15,
      height:50,
      alignSelf: 'center',
    },
    sendButton:{
      backgroundColor: theme.colors.primary,
      borderRadius: 50,
      height: 50,
      width: 50,
      alignItems:'center',
      justifyContent: 'center'
      
    }
  });