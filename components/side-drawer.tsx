import { IconSymbol } from '@/components/ui/icon-symbol';
import { Image } from 'expo-image';
import { usePathname, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  route: string;
}

const menuItems: MenuItem[] = [
  { id: 'home', label: 'Home', icon: 'house', route: '/(drawer)' },
  { id: 'planner', label: 'AI Day Planner', icon: 'calendar', route: '/(drawer)/planner' },
  { id: 'goals', label: 'Ibadah Goals', icon: 'flag', route: '/(drawer)' },
  { id: 'quran', label: 'Her Quran', icon: 'book', route: '/(drawer)' },
  { id: 'journal', label: 'Her Journal', icon: 'book.closed', route: '/(drawer)' },
  { id: 'tracker', label: 'Menstrual Tracker', icon: 'drop', route: '/(drawer)' },
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
      <ScrollView style={styles.scrollView}>
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
                  size={20}
                  color={active ? '#fff' : '#333'}
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
          <IconSymbol name="gearshape" size={20} color="#333" />
          <Text style={styles.footerText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem}>
          <IconSymbol name="arrow.right.square" size={20} color="#E53E3E" />
          <Text style={[styles.footerText, styles.logoutText]}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
  },
  logo: {
    width: 130,
    height: 32,
    marginRight: 8,
  },
  logoText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  logoAccent: {
    color: '#D946EF',
  },
  menu: {
    paddingHorizontal: 12,
    paddingTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 4,
  },
  menuItemActive: {
    backgroundColor: '#62206E',
  },
  menuText: {
    fontSize: 15,
    marginLeft: 12,
    color: '#333',
  },
  menuTextActive: {
    color: '#fff',
    fontWeight: '500',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  footerText: {
    fontSize: 15,
    marginLeft: 12,
    color: '#333',
  },
  logoutText: {
    color: '#E53E3E',
  },
});
