// 모든 약 정보 볼 수 있는 메인화면
import axios from 'axios';
import React from 'react';
import {StyleSheet,  View, ScrollView, TouchableOpacity, AccessibilityInfo, UIManager, findNodeHandle} from 'react-native';
import { Text, TouchableRipple, Button  } from 'react-native-paper';
// 화면 비율
import { Dimensions } from 'react-native'; 
const { width, height } = Dimensions.get('window');

// navigation
import 'react-native-gesture-handler';

// 외부에서 불러온 것들
import Icon from 'react-native-vector-icons/FontAwesome';
import BookMarkModal from '../BookMark/BookMarkModal';
// 약목록 보여주는 component
import List from '../../Components/Lists';
import Card from '../../Components/Card';

// 로딩
import Loading from '../../Components/Loading';

// 서버 포트
import ServerPort from '../../Components/ServerPort';
const IP = ServerPort();

function MedicineMain({navigation}) {

  const [medicinedata, setMedicinedata] = React.useState([]);//약 정보
  const [page, setPage] = React.useState(1);//다음 page 번호
  const [isLoading, setIsLoading] = React.useState(false); // 로딩 상태 추가

  const [screenReaderEnabled, setScreenReaderEnabled] = React.useState(false);
  const [reduceMotionEnabled, setReduceMotionEnabled] = React.useState(false);

  React.useEffect(() => {
    const reduceMotionChangedSubscription = AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      isReduceMotionEnabled => {
        setReduceMotionEnabled(isReduceMotionEnabled);
      },
    );
    const screenReaderChangedSubscription = AccessibilityInfo.addEventListener(
      'screenReaderChanged',
      isScreenReaderEnabled => {
        setScreenReaderEnabled(isScreenReaderEnabled);
      },
    );

    AccessibilityInfo.isReduceMotionEnabled().then(isReduceMotionEnabled => {
      setReduceMotionEnabled(isReduceMotionEnabled);
    });
    AccessibilityInfo.isScreenReaderEnabled().then(isScreenReaderEnabled => {
      setScreenReaderEnabled(isScreenReaderEnabled);
    });

    return () => {
      reduceMotionChangedSubscription.remove();
      screenReaderChangedSubscription.remove();
    };

    
  }, []);

  const handlePageChange = (newPage) => {
    // console.log("페이지 바뀜?",newPage)
    setPage(newPage);
  }

  const speak = () => {
    AccessibilityInfo.announceForAccessibility(selectedDate+"를 선택하셨습니다!");
  };

  React.useEffect(() => {
    const setData = async () => {
      setIsLoading(true); // 로딩 상태 true 로 변경
      try {
        const res = await axios.get(`${IP}/medicine/search`, {
          params: {
            pageNo: page,
          },
        });
        setMedicinedata(res.data.items);
        setTimeout(() => {
          setIsLoading(false); // 3초 후 로딩 상태 false 로 변경
        }, 4000); // 4초의 지연 시간 설정
      } catch (error) {
        console.log('Medicine 목록 가져오기 실패', error);
        setIsLoading(false); // 에러 발생 시에도 로딩 상태 false 로 변경
      }
    };
    setData();
  }, [page]);

  //북마크 리스트 가져오는 AXIOS
  const [bookmark, setBookmark] = React.useState([]);//bookmark 리스트 있는지 확인
  React.useEffect(()=>{
    const Bookmark = () => {
      axios.post(`${IP}/medicine/bookmarklist`,{
        token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoibW9ua2V5MyIsImV4cCI6MTY4NTA5NTAxNCwiaWF0IjoxNjg0NDkwMjE0fQ.F9ZRcSS5Jb6zmFR6awLORFCsSxZvfBKCR1Mra8T00lQ"//걍 지정해줌
      })
      .then(function(res){
        console.log("북마크 잘 가져왔나요?", res.data);
        setBookmark(res.data);
        console.log("test",bookmark);
      })
      .catch(function(e){
        console.log("즐겨찾기 리스트 못 가져옴,,,", e)
      })

    };
    Bookmark();
    // console.log("bookmark배열 값 잘 가져오나요?",bookmark)
  },[]);
 
  return (
    <View style={styles.c}>
      {isLoading ? (
        <Loading /> // 로딩 중인 동안 로딩 3초간 스피너 표시
      ) : (
        <View style={styles.container} >
          <ScrollView style={{margin:10}}>
          <Card 
            medicinedata={medicinedata} 
            bookmark = {bookmark} //bookmark list넘겨줌
            setBookmark = {setBookmark} //bookmark list를 변경하는 함수 넘겨줌
            onPress={(medicinename, bookmark) => {
              AccessibilityInfo.announceForAccessibility(medicinename+"을 선택하셨습니다!");
              navigation.navigate('Detail', { medicinename, bookmark })
            }}
          />
          <View style={{flexDirection: 'row',justifyContent:"space-between", alignItems:'center'}}>
         <TouchableRipple onPress={()=>{page > 1 && handlePageChange(page -1)}}>
           <Button mode="Outlined">이전 페이지</Button>
         </TouchableRipple>
         <Text>{page}</Text>
         <TouchableRipple onPress={()=>{handlePageChange(page +1)}}>
           <Button mode="Outlined">다음 페이지</Button>
         </TouchableRipple>
      </View>
        </ScrollView>

        </View>
        
      )}
      
    </View>
  );
}

const styles = StyleSheet.create({
  c:{
    flex: 1,
  },
  container: {
    width: width,
    height: height,
    flex: 1,
    paddingTop:20,
    paddingRight:20,
    paddingLeft:20,
    backgroundColor:'#eaeaea'
  },
  title: {
    borderBottomWidth:1,
    borderBottomColor: 'black',
    marginBottom: '10%',
  },
  medibox: {
    flex:1,
    flexDirection: 'row',
    alignItems: "center",
    borderWidth:1,
    borderBottomColor: 'black',
    marginBottom: '10%',
  },
  mediicon:{
    borderWidth:1,
    // height:'100%',
    justifyContent: "center",
    alignItems: "center",
  },
  medititletext:{
     borderWidth:1,
     borderColor:'blue',
     width:'70%',
    justifyContent: "center",
    alignItems: "center",
  },
  meditext:{
    borderWidth:1,
    justifyContent: "center",
    alignItems: "center",
  },
  medimodal:{
    flex: 1, 
    // borderBottomWidth:1,
    justifyContent: 'center', 
    alignItems: 'center'
  }
});

export default MedicineMain;

