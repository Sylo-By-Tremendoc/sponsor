export type Message = {
  id: string;
  fromMe: boolean;
  text?: string;
  createdAt: string;
  attachment?: { name: string; size: number; type: string; url?: string };
};

export type Conversation = {
  id: string;
  name: string;
  email?: string;
  avatarColor?: string;
  lastMessage?: string;
  unread?: number;
  messages: Message[];
  isTyping?: boolean;
};
