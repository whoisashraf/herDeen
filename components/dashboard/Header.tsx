import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

export const Header = ({ showGreeting = true, showNotifications = true }: { showGreeting?: boolean, showNotifications?: boolean }) => {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const insets = useSafeAreaInsets();
  const headerBackground = colors.background;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: headerBackground,
          paddingTop: insets.top + 12,
        },
      ]}>
      <View style={styles.leftContainer}>
        <View style={[styles.avatar, colorScheme === 'dark' && styles.avatarDark]}>
          <Image
            source={require('@/assets/images/profile.jpg')}
            style={styles.profileImage}
          />
        </View>
        <View>
          <View style={styles.locationContainer}>
            <IconSymbol name="mappin.and.ellipse" size={12} color={colors.textMuted} />
            <ThemedText type="poppins-regular" style={[styles.locationText, { color: colors.textMuted }]}>
              Ilroin East
            </ThemedText>
          </View>
          {showGreeting && (
            <ThemedText type="poppins-bold" style={[styles.greeting, { color: colors.text }]}>
              Sobahul-khayr, Aishah!
            </ThemedText>
          )}
        </View>
      </View>
      <View style={styles.rightContainer}>
        {showNotifications && (
          <TouchableOpacity style={[styles.iconButton, { backgroundColor: colors.surface }]}>
            <View style={styles.bellContainer}>
              <IconSymbol name="bell" size={22} color={colors.text} />
              <View style={[styles.notificationDot, { borderColor: headerBackground }]} />
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  avatarDark: {
    borderColor: '#374151',
    borderWidth: 1.5,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 10,
    marginBottom: 2,
  },
  locationText: {
    fontSize: 12,
  },
  greeting: {
    fontSize: 16,
  },
  rightContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bellContainer: {
    position: 'relative',
    padding: 2,
  },
  notificationDot: {
    position: 'absolute',
    top: 0,
    right: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF4D4F',
    borderWidth: 1.5,
  },
});
