// Fallback for using MaterialIcons on Android and web.

import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
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
  'chevron.up': 'expand-less',
  'chevron.down': 'expand-more',
  'qibla_icon': 'explore',
  'bell': 'notifications-none',
  'bell.fill': 'notifications',
  'bell.slash.fill': 'notifications-off',
  'line.3.horizontal': 'menu',
  'target': 'track-changes',
  'plus': 'add',
  'trash': 'delete-outline',
  'figure.stand': 'accessibility',
  'book': 'book',
  'heart': 'favorite_border',
  'heart.fill': 'favorite',
  'hands.sparkles': 'auto_awesome',
  'moon.stars': 'dark-mode',
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
  'refresh': 'refresh',
  'xmark': 'close',
  'content-copy': 'content-copy',
  'square.on.square': 'content-copy',
  'share': 'share',
  'square.and.arrow.up': 'share',
  'mode-edit-outline': 'mode-edit-outline',
  'person': 'person-outline',
  'lock': 'lock-outline',
  'translate': 'translate',
  'moon': 'nights-stay',
  'clock': 'access-time',
  'alarm': 'access-alarm',
  'compass': 'explore',
  'circle.grid.2x2': 'apps',
  'square.grid.3x3': 'grid-view',
  'grain': 'grain',
  'gesture': 'gesture',
  'location': 'location-on',
  'location.fill': 'near-me',
  'place': 'location-on',
  'mappin.and.ellipse': 'location-pin',
  'phone': 'phone-in-talk',
  'questionmark.circle': 'help',
  'info.circle': 'info-outline',
  'camera': 'camera-alt',
  'eye': 'visibility',
  'eye.slash': 'visibility-off',
  'mail': 'email',
  'question_answer': 'question_answer',
  'volunteer_activism': 'volunteer_activism',
  'volunteer-activism': 'volunteer_activism',
  'wb-sunny': 'wb-sunny',
  'sun': 'wb-sunny',
  'sunny': 'wb-sunny',
  'sun.max': 'wb-sunny',
  'sun.min': 'wb-sunny',
  'sun.sunset': 'wb-sunny',
  'sunrise': 'wb-twilight',
  'near-me': 'near-me',
  'cloud': 'cloud-outline',
  'nights-stay': 'nights-stay',
  'hexagon': 'hexagon',
  'speaker.wave.2.fill': 'volume-up',
  'speaker.slash.fill': 'volume-off',
  'paperplane': 'near-me',
  'mosque': 'mosque',
  'calculate': 'calculate',
  'vibration': 'vibration',
  'bed': 'bed',
  'leaf': 'eco',
  'magnifyingglass': 'search',
  'textformat.size': 'format-size',
  'bold': 'format-bold',
  'italic': 'format-italic',
  'underline': 'format-underlined',
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

  const iconName = MAPPING[name] || name;

  return <MaterialIcons color={color} size={size} name={iconName as any} style={style} />;
}
