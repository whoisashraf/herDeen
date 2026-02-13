import { SideDrawer } from '@/components/side-drawer';
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function DrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={() => <SideDrawer />}
        screenOptions={{
          headerShown: false,
          drawerType: 'slide',
          overlayColor: 'rgba(0,0,0,0.5)',
          drawerStyle: {
            width: 280,
          },
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: 'Home',
          }}
        />
        <Drawer.Screen
          name="explore"
          options={{
            drawerLabel: 'Explore',
          }}
        />
        <Drawer.Screen
          name="planner"
          options={{
            drawerLabel: 'AI Day Planner',
          }}
        />
        <Drawer.Screen
          name="ibadah-goals"
          options={{
            drawerLabel: 'Ibadah Goals',
          }}
        />
        <Drawer.Screen
          name="journal"
          options={{
            drawerLabel: 'Her Journal',
          }}
        />
        <Drawer.Screen
          name="journal-editor"
          options={{
            drawerLabel: 'Journal Editor',
            drawerItemStyle: { display: 'none' },
          }}
        />
        <Drawer.Screen
          name="journal-mood"
          options={{
            drawerLabel: 'Journal Mood',
            drawerItemStyle: { display: 'none' },
          }}
        />
        <Drawer.Screen
          name="journal-entry"
          options={{
            drawerLabel: 'Journal Entry',
            drawerItemStyle: { display: 'none' },
          }}
        />
        <Drawer.Screen
          name="tracker"
          options={{
            drawerLabel: 'Menstrual Tracker',
          }}
        />
        <Drawer.Screen
          name="settings"
          options={{
            drawerLabel: 'Settings',
            drawerItemStyle: { display: 'none' },
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
