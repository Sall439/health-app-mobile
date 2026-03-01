import { Tabs } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';
import COLORS from "../../src/constants/theme"
import Fontisto from '@expo/vector-icons/Fontisto';
import FontAwesome from '@expo/vector-icons/FontAwesome';
export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false , tabBarStyle: {height: 100}}}>
      <Tabs.Screen name="home"  options={{tabBarIcon: ({color}) => {
        return <Ionicons name="home-outline" size={24} color={color}/>
      },  tabBarActiveTintColor: "#2563eb",
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: {
          fontSize: 14
        }
       }}/>

      <Tabs.Screen name="appointment" options={{tabBarIcon: ({color}) => {
        return <Ionicons name="calendar-outline" size={24} color={color}/>
      },  tabBarActiveTintColor: "#2563eb",
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: {
          fontSize: 14
        }
       }}/>

        <Tabs.Screen name="doctor" options={{tabBarIcon: ({color}) => {
        return <Fontisto name="doctor" size={24} color={color}/>
      },  tabBarActiveTintColor: "#2563eb",
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: {
          fontSize: 14
        }
       }}/>

         <Tabs.Screen name="Hospital" options={{tabBarIcon: ({color}) => {
        return <FontAwesome name="hospital-o" size={24} color={color}/>
      },  tabBarActiveTintColor: "#2563eb",
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: {
          fontSize: 14
        }
       }}/>

      <Tabs.Screen name="profile" options={{tabBarIcon: ({color}) => {
        return <Ionicons name="person-circle-outline" size={24} color={color}/>
      },  tabBarActiveTintColor: "#2563eb",
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: {
          fontSize: 14
        }
       }}/>
  
    </Tabs>
  );
}