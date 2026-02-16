import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useAppColors } from '@/hooks/use-app-colors';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import React, { useMemo, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type ChatMessage = {
  id: string;
  prompt: string;
  response: string;
};

const SUGGESTIONS = [
  { label: 'Plan My Day', kind: 'sparkle' as const },
  {
    label: 'Learn About My Deen',
    kind: 'image' as const,
    image: require('@/assets/icons/Kaaba - 3D Ramadhan Illustration Pack ( Perspective).png'),
  },
  { label: 'Islamic Jurisprudence', kind: 'emoji' as const, emoji: '⚖️' },
  {
    label: 'Stories of the past',
    kind: 'image' as const,
    image: require('@/assets/icons/Sahoor - 3D Ramadhan Illustration Pack (Front).png'),
  },
];

const HISTORY_ITEMS = [
  'My day plan',
  'My day plan',
  'My day plan',
  'My day plan',
  'My day plan',
  'My day plan',
  'My day plan',
];

const AI_RESPONSE =
  'Here are personal, warm name options, mostly in the “My ___” style, with meanings and the vibe they give. I’ll group them so you can feel what fits best.';

const SCREEN_WIDTH = Dimensions.get('window').width;
const PANEL_WIDTH = Math.min(SCREEN_WIDTH * 0.8, 340);

export default function SukuniScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { isDark } = useAppColors();

  const [composerText, setComposerText] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [historyOpen, setHistoryOpen] = useState(false);
  const panelProgress = useRef(new Animated.Value(0)).current;

  const isChatMode = messages.length > 0;

  const panelTranslateX = panelProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [PANEL_WIDTH, 0],
  });

  const panelOverlayOpacity = panelProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const canSend = composerText.trim().length > 0;

  const ui = isDark
    ? {
        screenBg: '#0E1118',
        roundButtonBg: '#1C222E',
        headerIcon: '#F2F5FA',
        headerTitle: '#F2F5FA',
        welcomeGreeting: '#AAB0BC',
        welcomeQuestion: '#F4F5F7',
        suggestionBg: '#2A313E',
        suggestionText: '#AEB5C2',
        suggestionIcon: '#99A1AF',
        sparkle: '#D58AF5',
        userBubbleBg: '#313946',
        userBubbleText: '#C7CCD6',
        aiText: '#FFFFFF',
        actionIcon: '#C3CAD5',
        composerBg: '#2A313E',
        composerBorder: '#4A5568',
        composerText: '#E2E6ED',
        composerPlaceholder: '#717987',
        plus: '#BFC4CE',
        voiceBg: '#F6F7FA',
        voiceIcon: '#575D66',
        sceneTower: '#1B212D',
        sceneHill: '#1A202B',
        panelOverlay: 'rgba(0, 0, 0, 0.52)',
        panelBg: '#1D232E',
        panelBorder: '#343D4A',
        panelSearchBg: '#10151F',
        panelSearchIcon: '#59616F',
        panelSearchText: '#E6EBF3',
        panelSearchPlaceholder: '#59616F',
        panelClose: '#ECEFF6',
        panelNewChat: '#F4F6FA',
        panelNewChatIcon: '#ECEFF6',
        panelHistoryTitle: '#A5ACB8',
        panelHistoryItem: '#F1F4F9',
        panelBrandText: '#F4F6FA',
      }
    : {
        screenBg: '#F5F5F5',
        roundButtonBg: '#E9EBEF',
        headerIcon: '#2E3642',
        headerTitle: '#1A222F',
        welcomeGreeting: '#636E7F',
        welcomeQuestion: '#1B232F',
        suggestionBg: '#E9EBEF',
        suggestionText: '#B7BDC8',
        suggestionIcon: '#A4ACB9',
        sparkle: '#C27CEB',
        userBubbleBg: '#E5E7EB',
        userBubbleText: '#606A79',
        aiText: '#171E29',
        actionIcon: '#697381',
        composerBg: '#ECEFF3',
        composerBorder: '#D0D6DE',
        composerText: '#303A49',
        composerPlaceholder: '#7B8594',
        plus: '#666F7E',
        voiceBg: '#FFFFFF',
        voiceIcon: '#667286',
        sceneTower: '#CFD6DF',
        sceneHill: '#DFE4EB',
        panelOverlay: 'rgba(0, 0, 0, 0.62)',
        panelBg: '#FFFFFF',
        panelBorder: 'transparent',
        panelSearchBg: '#F5F5F5',
        panelSearchIcon: '#B3B3B3',
        panelSearchText: '#222A35',
        panelSearchPlaceholder: '#B3B3B3',
        panelClose: '#2A313E',
        panelNewChat: '#1F2530',
        panelNewChatIcon: '#1F2530',
        panelHistoryTitle: '#666F7A',
        panelHistoryItem: '#1F2530',
        panelBrandText: '#1A2230',
      };

  const lightSendBg = !isDark && canSend ? '#0F1824' : ui.voiceBg;
  const lightSendIcon = !isDark && canSend ? '#F4F7FB' : ui.voiceIcon;

  const sendPrompt = (prompt: string) => {
    const cleanPrompt = prompt.trim();
    if (!cleanPrompt) return;

    const next: ChatMessage = {
      id: `${Date.now()}-${Math.random()}`,
      prompt: cleanPrompt,
      response: AI_RESPONSE,
    };

    setMessages((prev) => [...prev, next]);
    setComposerText('');
  };

  const startWithSuggestion = (suggestion: string) => {
    sendPrompt(suggestion);
  };

  const openHistory = () => {
    setHistoryOpen(true);
    requestAnimationFrame(() => {
      Animated.timing(panelProgress, {
        toValue: 1,
        duration: 230,
        useNativeDriver: true,
      }).start();
    });
  };

  const closeHistory = () => {
    Animated.timing(panelProgress, {
      toValue: 0,
      duration: 210,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        setHistoryOpen(false);
      }
    });
  };

  const resetChat = () => {
    setMessages([]);
    setComposerText('');
    closeHistory();
  };

  const promptPlaceHolder = useMemo(
    () => (isChatMode ? 'I want to make it in life' : 'Ask Sukūni...'),
    [isChatMode],
  );

  return (
    <View style={[styles.screen, { paddingTop: insets.top + 12, backgroundColor: ui.screenBg }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 8 : 0}
        style={styles.flex}
      >
        <View style={styles.headerRow}>
          <TouchableOpacity style={[styles.roundButton, { backgroundColor: ui.roundButtonBg }]} onPress={() => router.back()}>
            <IconSymbol name="arrow.left" size={27} color={ui.headerIcon} />
          </TouchableOpacity>

          <View style={styles.headerTitleWrap}>
            <Image source={require('@/assets/images/sukuni.png')} style={styles.headerLogo} contentFit="contain" />
            <ThemedText type="poppins-semibold" style={[styles.headerTitle, { color: ui.headerTitle }]}>Sukūni</ThemedText>
          </View>

          <TouchableOpacity style={[styles.roundButton, { backgroundColor: ui.roundButtonBg }]} onPress={openHistory}>
            <IconSymbol name="line.3.horizontal" size={24} color={ui.headerIcon} />
          </TouchableOpacity>
        </View>

        {!isChatMode && (
          <View style={styles.welcomeBody}>
            <Image source={require('@/assets/images/sukuni.png')} style={styles.heroLogo} contentFit="contain" />

            <ThemedText type="poppins-regular" style={[styles.welcomeGreeting, { color: ui.welcomeGreeting }]}>
              Kayf, Aishah!
            </ThemedText>
            <ThemedText type="poppins-semibold" style={[styles.welcomeQuestion, { color: ui.welcomeQuestion }]}>
              What can I help with?
            </ThemedText>

            <View style={styles.suggestionStack}>
              {SUGGESTIONS.map((item, idx) => (
                <TouchableOpacity
                  key={item.label}
                  style={[styles.suggestionChip, idx === 0 && styles.firstSuggestion, { backgroundColor: ui.suggestionBg }]}
                  onPress={() => startWithSuggestion(item.label)}
                >
                  {item.kind === 'sparkle' && (
                    <IconSymbol name="sparkles" size={16} color={ui.sparkle} />
                  )}
                  {item.kind === 'icon' && (
                    <IconSymbol name={item.icon as any} size={16} color={ui.suggestionIcon} />
                  )}
                  {item.kind === 'emoji' && (
                    <ThemedText type="poppins-regular" style={styles.suggestionEmojiIcon}>{item.emoji}</ThemedText>
                  )}
                  {item.kind === 'image' && (
                    <Image source={item.image} style={styles.suggestionImageIcon} contentFit="contain" />
                  )}
                  <ThemedText type="poppins-medium" style={[styles.suggestionText, { color: ui.suggestionText }]}>{item.label}</ThemedText>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {isChatMode && (
          <FlatList
            data={messages}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.chatListContent}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.messageGroup}>
                <View style={styles.userBubbleRow}>
                  <View style={[styles.userBubble, { backgroundColor: ui.userBubbleBg }]}>
                    <ThemedText type="poppins-regular" style={[styles.userBubbleText, { color: ui.userBubbleText }]}>
                      {item.prompt}
                    </ThemedText>
                  </View>
                </View>

                <View style={styles.aiBrandRow}>
                  <Image source={require('@/assets/images/sukuni.png')} style={styles.aiBrandIcon} contentFit="contain" />
                </View>

                <ThemedText type="poppins-regular" style={[styles.aiTextBlock, { color: ui.aiText }]}>
                  {item.response}
                </ThemedText>

                <View style={styles.aiActionsRow}>
                  <TouchableOpacity style={styles.aiActionButton}>
                    <MaterialIcons name="content-copy" size={22} color={ui.actionIcon} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.aiActionButton}>
                    <MaterialIcons name="share" size={22} color={ui.actionIcon} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.aiActionButton}>
                    <MaterialIcons name="autorenew" size={22} color={ui.actionIcon} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        )}

        <View style={[styles.bottomComposerWrap, { paddingBottom: insets.bottom + 8 }]}> 
          <View style={[styles.composerInputWrap, { backgroundColor: ui.composerBg, borderColor: ui.composerBorder }]}>
            <TextInput
              value={composerText}
              onChangeText={setComposerText}
              placeholder={promptPlaceHolder}
              placeholderTextColor={ui.composerPlaceholder}
              style={[styles.composerInput, { color: ui.composerText }]}
              multiline={false}
            />
            <TouchableOpacity style={styles.composerPlusBtn}>
              <IconSymbol name="plus" size={20} color={ui.plus} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.voiceOrSendBtn, { backgroundColor: lightSendBg }]}
            onPress={() => {
              if (canSend) {
                sendPrompt(composerText);
              }
            }}
          >
            <IconSymbol name={canSend ? 'paperplane' : 'mic'} size={30} color={lightSendIcon} />
          </TouchableOpacity>
        </View>

        <View pointerEvents="none" style={styles.backgroundScene}>
          <View style={[styles.tower, styles.towerLarge, { backgroundColor: ui.sceneTower, opacity: isDark ? 0.62 : 0.4 }]}>
            <View style={[styles.towerCap, { backgroundColor: ui.sceneTower }]} />
          </View>
          <View style={[styles.tower, styles.towerMedium, { backgroundColor: ui.sceneTower, opacity: isDark ? 0.62 : 0.4 }]}>
            <View style={[styles.towerCap, { backgroundColor: ui.sceneTower }]} />
          </View>
          <View style={[styles.tower, styles.towerSmall, { backgroundColor: ui.sceneTower, opacity: isDark ? 0.62 : 0.4 }]}>
            <View style={[styles.towerCap, { backgroundColor: ui.sceneTower }]} />
          </View>
          <View style={[styles.tower, styles.towerTiny, { backgroundColor: ui.sceneTower, opacity: isDark ? 0.62 : 0.4 }]}>
            <View style={[styles.towerCap, { backgroundColor: ui.sceneTower }]} />
          </View>
          <View style={[styles.hill, { backgroundColor: ui.sceneHill, opacity: isDark ? 0.6 : 0.35 }]} />
        </View>

        {historyOpen && (
          <Modal visible transparent animationType="none" onRequestClose={closeHistory}>
            <View style={styles.panelModalRoot}>
              <Animated.View
                style={[styles.panelOverlay, { opacity: panelOverlayOpacity, backgroundColor: ui.panelOverlay }]}
              >
                <Pressable style={styles.panelOverlayPressable} onPress={closeHistory} />
              </Animated.View>

              <Animated.View
                style={[
                  styles.historyPanel,
                  {
                    backgroundColor: ui.panelBg,
                    borderLeftColor: ui.panelBorder,
                    width: PANEL_WIDTH,
                    transform: [{ translateX: panelTranslateX }],
                    paddingTop: insets.top + 12,
                    paddingBottom: insets.bottom + 8,
                  },
                ]}
              >
                <View style={styles.panelBrandRow}>
                  <View style={styles.panelBrandLeft}>
                    <Image source={require('@/assets/images/sukuni.png')} style={styles.panelBrandLogo} contentFit="contain" />
                    <ThemedText type="poppins-semibold" style={[styles.panelBrandText, { color: ui.panelBrandText ?? ui.panelNewChat }]}>
                      Sukūni
                    </ThemedText>
                  </View>
                  <TouchableOpacity onPress={closeHistory} style={styles.historyCloseBtn}>
                    <IconSymbol name="xmark" size={24} color={ui.panelClose} />
                  </TouchableOpacity>
                </View>

                <View style={styles.historySearchRow}>
                  <View style={[styles.historySearchWrap, { backgroundColor: ui.panelSearchBg }]}>
                    <IconSymbol name="magnifyingglass" size={18} color={ui.panelSearchIcon} />
                    <TextInput
                      placeholder="Search for chats"
                      placeholderTextColor={ui.panelSearchPlaceholder}
                      style={[styles.historySearchInput, { color: ui.panelSearchText }]}
                    />
                  </View>
                </View>

                <View style={styles.historySection}>
                  <TouchableOpacity style={[styles.newChatRow, isDark ? styles.newChatRowDark : styles.newChatRowLight]} onPress={resetChat}>
                    {!isDark && (
                      <IconSymbol name="mode-edit-outline" size={22} color={ui.panelNewChatIcon ?? ui.panelClose} />
                    )}
                    <ThemedText type="poppins-medium" style={[styles.newChatText, { color: ui.panelNewChat }]}>New Chat</ThemedText>
                    {isDark && (
                      <IconSymbol name="mode-edit-outline" size={22} color={ui.panelNewChatIcon ?? ui.panelClose} />
                    )}
                  </TouchableOpacity>

                  <ThemedText type="poppins-medium" style={[styles.historyTitle, { color: ui.panelHistoryTitle }]}>Chat History</ThemedText>

                  <FlatList
                    data={HISTORY_ITEMS}
                    keyExtractor={(item, index) => `${item}-${index}`}
                    renderItem={({ item }) => (
                      <TouchableOpacity style={styles.historyItem} onPress={closeHistory}>
                        <ThemedText type="poppins-medium" style={[styles.historyItemText, { color: ui.panelHistoryItem }]}>{item}</ThemedText>
                      </TouchableOpacity>
                    )}
                    showsVerticalScrollIndicator={false}
                  />
                </View>
              </Animated.View>
            </View>
          </Modal>
        )}
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  headerRow: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 26,
    zIndex: 2,
  },
  roundButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
  },
  headerLogo: {
    width: 30,
    height: 34,
  },
  headerTitle: {
    fontSize: 20,
    lineHeight: 24,
    includeFontPadding: false,
  },
  welcomeBody: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 54,
    zIndex: 2,
  },
  heroLogo: {
    width: 68,
    height: 76,
    marginBottom: 18,
  },
  welcomeGreeting: {
    fontSize: 22,
    lineHeight: 28,
    marginBottom: 8,
  },
  welcomeQuestion: {
    fontSize: 24,
    lineHeight: 31,
    marginBottom: 24,
    fontFamily: Platform.select({ ios: 'Georgia', default: 'serif' }),
  },
  suggestionStack: {
    gap: 12,
  },
  suggestionChip: {
    alignSelf: 'flex-start',
    height: 52,
    borderRadius: 28,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  firstSuggestion: {
    paddingLeft: 18,
  },
  suggestionText: {
    fontSize: 14,
  },
  suggestionImageIcon: {
    width: 18,
    height: 18,
  },
  suggestionEmojiIcon: {
    fontSize: 16,
    lineHeight: 18,
  },
  chatListContent: {
    paddingHorizontal: 24,
    paddingTop: 14,
    paddingBottom: 190,
    gap: 20,
    zIndex: 2,
  },
  messageGroup: {
    marginBottom: 22,
  },
  userBubbleRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 16,
  },
  userBubble: {
    maxWidth: '84%',
    borderRadius: 22,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  userBubbleText: {
    fontSize: 14,
    lineHeight: 21,
  },
  aiTextBlock: {
    fontSize: 14,
    lineHeight: 22,
    paddingRight: 8,
  },
  aiBrandRow: {
    marginBottom: 10,
  },
  aiBrandIcon: {
    width: 24,
    height: 28,
  },
  aiActionsRow: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 12,
    marginBottom: 2,
  },
  aiActionButton: {
    width: 34,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomComposerWrap: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    zIndex: 3,
  },
  composerInputWrap: {
    flex: 1,
    height: 56,
    borderRadius: 28,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 10,
    gap: 8,
  },
  composerInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: Platform.select({ ios: 'Avenir Next', default: 'sans-serif' }),
  },
  composerPlusBtn: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  voiceOrSendBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundScene: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 320,
    zIndex: 0,
  },
  tower: {
    position: 'absolute',
    bottom: 0,
    width: 64,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    alignItems: 'center',
  },
  towerCap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    position: 'absolute',
    top: -16,
  },
  towerLarge: {
    right: 26,
    height: 248,
  },
  towerMedium: {
    left: 52,
    height: 170,
    width: 52,
  },
  towerSmall: {
    left: 222,
    height: 108,
    width: 40,
  },
  towerTiny: {
    left: 300,
    height: 82,
    width: 28,
  },
  hill: {
    position: 'absolute',
    right: -46,
    bottom: -60,
    width: 260,
    height: 190,
    borderRadius: 130,
  },
  panelModalRoot: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  panelOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  panelOverlayPressable: {
    flex: 1,
  },
  historyPanel: {
    paddingHorizontal: 24,
    borderLeftWidth: 0,
  },
  panelBrandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 20,
  },
  panelBrandLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  panelBrandLogo: {
    width: 24,
    height: 28,
  },
  panelBrandText: {
    fontSize: 16,
    lineHeight: 20,
    includeFontPadding: false,
  },
  historySearchRow: {
    marginBottom: 22,
  },
  historySearchWrap: {
    height: 42,
    borderRadius: 21,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    gap: 8,
  },
  historySearchInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: Platform.select({ ios: 'Avenir Next', default: 'sans-serif' }),
  },
  historyCloseBtn: {
    width: 34,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
  },
  historySection: {
    flex: 1,
  },
  newChatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  newChatRowLight: {
    gap: 12,
  },
  newChatRowDark: {
    justifyContent: 'space-between',
  },
  newChatText: {
    fontSize: 16,
  },
  historyTitle: {
    fontSize: 13,
    marginBottom: 10,
  },
  historyItem: {
    height: 50,
    justifyContent: 'center',
  },
  historyItemText: {
    fontSize: 16,
  },
});
