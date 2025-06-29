const CONSTANTS: Record<string, any> = {
  TITLE_MAX_LENGTH: 50,
  BODY_MAX_LENGTH: 500,
  COMMENT_MAX_LENGTH: 50,
  REPLY_MAX_LENGTH: 50,
  REACTIONS: ['👍', '❤️', '🔥', '😂', '🐐'] as const,
  TOPICS: ['AI', 'Software', 'Cloud', 'Cybersecurity', 'Other'] as const,
  FEATURED_ARTICLE_IDS: [
    '68613da526eaa646a282d481',
    '68613dbd26eaa646a282d482',
    '68613d8026eaa646a282d480',
    '68613ddc26eaa646a282d483',
    '68613df226eaa646a282d484',
  ] as const,
} as const

export default CONSTANTS
