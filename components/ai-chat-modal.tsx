import { IconSymbol } from '@/components/ui/icon-symbol';
import { aiService } from '@/services/ai-service';
import { useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    Share,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface AIChatModalProps {
  visible: boolean;
  onClose: () => void;
  onTasksReceived: (tasks: any[]) => void;
}

export function AIChatModal({ visible, onClose, onTasksReceived }: AIChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Assalamu alaikum! I'm here to help you plan your day with peace and purpose. Tell me about your tasks, priorities, and any time constraints you have today.",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (visible) {
      // Reset to initial state when modal opens
      setMessages([
        {
          id: '1',
          text: "Assalamu alaikum! I'm here to help you plan your day with peace and purpose. Tell me about your tasks, priorities, and any time constraints you have today.",
          isUser: false,
          timestamp: new Date(),
        },
      ]);
      setInputText('');
    }
  }, [visible]);

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const messageText = inputText;
    setInputText('');
    setIsLoading(true);

    try {
      // Call actual AI service
      const aiResponse = await aiService.sendMessage(messageText);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error: any) {
      Alert.alert(
        'AI Error',
        error.message || 'Failed to get AI response. Please check your API key and try again.'
      );
      console.error('AI Error:', error);
    } finally {
      setIsLoading(false);
    }

    // Scroll to bottom
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleGeneratePlan = async () => {
    setIsLoading(true);
    
    // Add a message to show we're generating
    const generatingMessage: Message = {
      id: Date.now().toString(),
      text: "Perfect! Let me create your personalized day plan...",
      isUser: false,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, generatingMessage]);

    try {
      // Get tasks from AI based on conversation (doesn't add to chat)
      const aiGeneratedTasks = await aiService.generateTasks();
      
      // Success message
      const successMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `Great! I've created ${aiGeneratedTasks.length} tasks for your day. You can review and edit them in the planner.`,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, successMessage]);

      // Wait a moment so user can see the success message
      setTimeout(() => {
        onTasksReceived(aiGeneratedTasks);
        aiService.resetConversation(); // Reset for next time
        onClose();
      }, 1000);
    } catch (error: any) {
      Alert.alert(
        'Generation Error',
        error.message || 'Failed to generate plan. Please try again.'
      );
      console.error('Generate Plan Error:', error);
      setIsLoading(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.aiIcon}>
              <IconSymbol name="sparkles" size={20} color="#fff" />
            </View>
            <Text style={styles.headerTitle}>AI Planner Assistant</Text>
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <IconSymbol name="xmark" size={22} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Messages */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((message) => (
            <View
              key={message.id}
              style={[
                styles.messageBubble,
                message.isUser ? styles.userMessage : styles.aiMessage,
              ]}
            >
              {!message.isUser && (
                <View style={styles.aiAvatar}>
                  <IconSymbol name="brain" size={16} color="#62206E" />
                </View>
              )}
              <View style={styles.messageWrapper}>
                <View
                  style={[
                    styles.messageContent,
                    message.isUser ? styles.userMessageContent : styles.aiMessageContent,
                  ]}
                >
                  <Text
                    style={[
                      styles.messageText,
                      message.isUser ? styles.userMessageText : styles.aiMessageText,
                    ]}
                  >
                    {message.text}
                  </Text>
                </View>
                {!message.isUser && (
                  <TouchableOpacity
                    style={styles.copyButton}
                    onPress={async () => {
                      try {
                        await Share.share({
                          message: message.text,
                        });
                      } catch (error) {
                        console.error('Share failed:', error);
                      }
                    }}
                  >
                    <IconSymbol name="square.and.arrow.up" size={14} color="#6B7280" />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color="#62206E" />
              <Text style={styles.loadingText}>AI is thinking...</Text>
            </View>
          )}

          {/* Quick Action Button */}
          {messages.length > 2 && !isLoading && (
            <TouchableOpacity style={styles.generateButton} onPress={handleGeneratePlan}>
              <IconSymbol name="sparkles" size={18} color="#fff" />
              <Text style={styles.generateButtonText}>Yes, Generate My Plan</Text>
            </TouchableOpacity>
          )}
        </ScrollView>

        {/* Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type your message..."
            placeholderTextColor="#999"
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              (!inputText.trim() || isLoading) && styles.sendButtonDisabled,
            ]}
            onPress={handleSend}
            disabled={!inputText.trim() || isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#62206E" />
            ) : (
              <IconSymbol name="arrow.up.circle.fill" size={32} color="#62206E" />
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aiIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#62206E',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1F2937',
  },
  closeButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 20,
    paddingBottom: 100,
  },
  messageBubble: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  userMessage: {
    justifyContent: 'flex-end',
  },
  aiMessage: {
    justifyContent: 'flex-start',
  },
  aiAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EDE9FE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  messageWrapper: {
    flex: 1,
  },
  messageContent: {
    maxWidth: '75%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },
  userMessageContent: {
    backgroundColor: '#62206E',
    borderBottomRightRadius: 4,
  },
  aiMessageContent: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
  userMessageText: {
    color: '#fff',
  },
  aiMessageText: {
    color: '#1F2937',
  },
  copyButton: {
    marginTop: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: 'flex-start',
  },
  generateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#62206E',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 16,
    gap: 8,
  },
  generateButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: 32,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    gap: 12,
  },
  input: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    maxHeight: 100,
    color: '#1F2937',
  },
  sendButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.4,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 8,
  },
  loadingText: {
    fontSize: 14,
    color: '#6B7280',
  },
});
