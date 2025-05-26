const CONSTANTS: Record<string, any> = {
  TITLE_MAX_LENGTH: 50,
  BODY_MAX_LENGTH: 500,
  COMMENT_MAX_LENGTH: 50,
  REPLY_MAX_LENGTH: 50,
  REACTIONS: ['👍', '❤️', '🔥', '😂', '🐐'] as const,
  TOPICS: ['AI', 'Software', 'Cloud', 'Cybersecurity', 'Other'] as const,
} as const

export default CONSTANTS
