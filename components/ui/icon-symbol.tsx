// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SymbolWeight } from 'expo-symbols';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

type IconMapping = Record<string, any>;
type IconSymbolName = string;

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING: IconMapping = {
  'house.fill': 'home',
  'house': 'home',
  'arrow.left': 'arrow-back',
  'chevron.left': 'arrow-back',
  'chevron.right': 'chevron-right',
  'chevron.up': 'expand_less',
  'chevron.down': 'expand_more',
  'qibla_icon': 'explore',
  'bell': 'notifications_none',
  'bell.fill': 'notifications',
  'line.3.horizontal': 'menu',
  'target': 'track-changes',
  'plus': 'add',
  'trash': 'delete-outline',
  'figure.stand': 'accessibility',
  'book': 'book',
  'heart': 'favorite_border',
  'heart.fill': 'favorite',
  'hands.sparkles': 'auto_awesome',
  'moon.stars': 'dark_mode',
  'calendar': 'calendar-today',
  'flag': 'flag',
  'book.closed': 'menu-book',
  'drop': 'opacity',
  'gearshape': 'tune',
  'arrow.right.square': 'logout',
  'sparkles': 'auto_awesome',
  'checkmark': 'check',
  'checkmark.done': 'done-all',
  'pencil': 'edit',
  'arrow.counterclockwise': 'refresh',
  'checkmark.circle.fill': 'check-circle',
  'circle': 'radio-button-unchecked',
  'drop.fill': 'water-drop',
  'exclamationmark.circle.fill': 'error-outline',
  'arrow.triangle.2.circlepath': 'sync',
  'xmark': 'close',
  'person': 'person_outline',
  'lock': 'lock_outline',
  'translate': 'translate',
  'moon': 'nights_stay',
  'clock': 'access_time',
  'alarm': 'access-alarm',
  'compass': 'explore',
  'circle.grid.2x2': 'apps',
  'square.grid.3x3': 'grid-view',
  'grain': 'grain',
  'gesture': 'gesture',
  'location': 'location_on',
  'place': 'location_on',
  'mappin.and.ellipse': 'location-pin',
  'phone': 'phone_in_talk',
  'questionmark.circle': 'help',
  'info.circle': 'info-outline',
  'camera': 'camera-alt',
  'eye': 'visibility',
  'eye.slash': 'visibility-off',
  'mail': 'email',
  'question_answer': 'question_answer',
  'volunteer_activism': 'volunteer_activism',
  'volunteer-activism': 'volunteer_activism',
  'logout': 'logout',
  'mosque': 'mosque',
  'bathtub': 'bathtub',
  'wb_sunny': 'wb_sunny',
  'wb-sunny': 'wb_sunny',
  'wb_twilight': 'wb_twilight',
  'wb-twilight': 'wb_twilight',
  'cloud': 'cloud_queue',
  'cloud-queue': 'cloud_queue',
  'nights_stay': 'nights_stay',
  'nights-stay': 'nights_stay',
  'hexagon': 'hexagon',
  'prayer_mat': 'curtains',
  'prayer-mat': 'curtains',
  'leaf': 'eco',
} as IconMapping;


export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  if (name === 'apple') {
    return <Ionicons color={color} size={size} name="logo-apple" style={style} />;
  }
  if (name === 'google') {
    return <Ionicons color={color} size={size} name="logo-google" style={style} />;
  }
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}
