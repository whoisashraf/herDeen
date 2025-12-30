import { IconSymbol } from '@/components/ui/icon-symbol';
import { Image } from 'expo-image';
import { usePathname, useRouter } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  route: string;
}

const menuItems: MenuItem[] = [
  { id: 'home', label: 'Home', icon: 'house', route: '/(drawer)' },
  { id: 'planner', label: 'AI Day Planner', icon: 'calendar', route: '/(drawer)/planner' },
  { id: 'ibadah-goals', label: 'Ibadah Goals', icon: 'flag', route: '/(drawer)/ibadah-goals' },
  { id: 'quran', label: 'Her Quran', icon: 'book', route: '/(drawer)/quran' },
  { id: 'journal', label: 'Her Journal', icon: 'book.closed', route: '/(drawer)/journal' },
  { id: 'tracker', label: 'Menstrual Tracker', icon: 'drop', route: '/(drawer)/tracker' },
];

export function SideDrawer() {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigate = (route: string) => {
    router.push(route as any);
  };

  const isActive = (route: string, itemId: string) => {
    // Special handling for home - only active on exact match
    if (itemId === 'home') {
      return pathname === '/' || pathname === '/(drawer)' || pathname === '/(drawer)/';
    }
    // For planner, check if we're in any planner route
    if (itemId === 'planner') {
      return pathname.includes('/planner');
    }
    // For other routes, check if pathname starts with the route
    return pathname.startsWith(route);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Logo */}
        
        <View style={styles.header}>
          <Image
            source={require('@/assets/icons/menu_logo.svg')}
            style={styles.logo}
            contentFit="contain"
          />
        </View>

        {/* Menu Items */}
        <View style={styles.menu}>
          {menuItems.map((item) => {
            const active = isActive(item.route, item.id);
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.menuItem, active && styles.menuItemActive]}
                onPress={() => handleNavigate(item.route)}
              >
                <IconSymbol
                  name={item.icon as any}
                  size={22}
                  color={active ? '#fff' : '#4A4A4A'}
                />
                <Text style={[styles.menuText, active && styles.menuTextActive]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerItem}>
          <IconSymbol name="gearshape" size={22} color="#4A4A4A" />
          <Text style={styles.footerText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem}>
          <IconSymbol name="arrow.right.square" size={22} color="#EF4444" />
          <Text style={[styles.footerText, styles.logoutText]}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    paddingBottom: 30,
  },
  logo: {
    width: 130,
    height: 32,
    marginRight: 8,
  },
  logoText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4A4A4A',
  },
  logoAccent: {
    color: '#F3AFAF',
  },
  menu: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: 'transparent',
  },
  menuItemActive: {
    backgroundColor: '#62206E',
  },
  menuText: {
    fontSize: 16,
    marginLeft: 14,
    color: '#4A4A4A',
    fontWeight: '400',
  },
  menuTextActive: {
    color: '#fff',
    fontWeight: '500',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#FAFAFA',
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 0,
  },
  footerText: {
    fontSize: 16,
    marginLeft: 14,
    color: '#4A4A4A',
    fontWeight: '400',
  },
  logoutText: {
    color: '#EF4444',
  },
});
