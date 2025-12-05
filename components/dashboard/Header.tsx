
import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';

export const Header = () => {
  const navigation = useNavigation();

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <View style={styles.avatar}>
          <Image
            source={require('@/assets/images/profile.jpg')}
            style={styles.profileImage}
          />
        </View>
        <View>
          <ThemedText type="poppins-regular" style={styles.greeting}>
            Assalamu Alaikum,
          </ThemedText>
          <ThemedText type="poppins-bold" style={styles.name}>
            Aisha!
          </ThemedText>
        </View>
      </View>
      <View style={styles.rightContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <IconSymbol name="bell" size={24} color="#374151" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={openDrawer}>
          <IconSymbol name="line.3.horizontal" size={24} color="#374151" />
        </TouchableOpacity>
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
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#F8F9FA',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26, 
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#62206E',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
  },
  greeting: {
    fontSize: 14,
    color: '#6B7280',
  },
  name: {
    fontSize: 20,
    color: '#111827',
  },
  rightContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  iconButton: {
    padding: 4,
  },
});

