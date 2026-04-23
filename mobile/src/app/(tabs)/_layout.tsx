import { Tabs } from 'expo-router';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

const ACCENT = '#1A6B43';
const INK_3 = '#9CA3AF';

function TabIcon({ name, focused }: { name: string; focused: boolean }) {
  const color = focused ? ACCENT : INK_3;
  const size = 22;

  if (name === 'browse') {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path d="M4 6h16M4 12h16M4 18h10" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      </Svg>
    );
  }
  if (name === 'saved') {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path d="M5 4h14a1 1 0 011 1v16l-7-4-7 4V5a1 1 0 011-1z" stroke={color} strokeWidth={1.8} strokeLinejoin="round" />
      </Svg>
    );
  }
  if (name === 'add') {
    return (
      <View style={[styles.addBtn, focused && styles.addBtnActive]}>
        <Text style={styles.addBtnText}>+</Text>
      </View>
    );
  }
  if (name === 'verify') {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path d="M9 12l2 2 4-4M12 3l1.5 3H18l-2.8 2 1 3.2L12 9.5 7.8 11.2l1-3.2L6 6h4.5L12 3z" stroke={color} strokeWidth={1.8} strokeLinejoin="round" />
      </Svg>
    );
  }
  if (name === 'me') {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Circle cx="12" cy="8" r="3.5" stroke={color} strokeWidth={1.8} />
        <Path d="M5 20c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      </Svg>
    );
  }
  return null;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: ACCENT,
        tabBarInactiveTintColor: INK_3,
        tabBarLabelStyle: styles.label,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Browse',
          tabBarIcon: ({ focused }) => <TabIcon name="browse" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: 'Saved',
          tabBarIcon: ({ focused }) => <TabIcon name="saved" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="contribute"
        options={{
          title: 'Add',
          tabBarIcon: ({ focused }) => <TabIcon name="add" focused={focused} />,
          tabBarLabel: () => null,
        }}
      />
      <Tabs.Screen
        name="verify"
        options={{
          title: 'Verify',
          tabBarIcon: ({ focused }) => <TabIcon name="verify" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="me"
        options={{
          title: 'Me',
          tabBarIcon: ({ focused }) => <TabIcon name="me" focused={focused} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 6,
    paddingBottom: Platform.OS === 'ios' ? 20 : 8,
    height: Platform.OS === 'ios' ? 82 : 62,
    backgroundColor: '#FFFFFF',
  },
  label: {
    fontFamily: 'Inter_500Medium',
    fontSize: 10,
    marginTop: 2,
  },
  addBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: ACCENT,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  addBtnActive: {
    backgroundColor: '#145535',
  },
  addBtnText: {
    color: '#fff',
    fontSize: 24,
    lineHeight: 28,
    fontFamily: 'Inter_400Regular',
  },
});
