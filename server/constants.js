const CONSTANTS = {
  TITLE_MAX_LENGTH: 50,
  BODY_MAX_LENGTH: 500,
  COMMENT_MAX_LENGTH: 50,
  REPLY_MAX_LENGTH: 50,
  REACTIONS: ['👍', '❤️', '🔥', '😂', '🐐'],
  TOPICS: ['AI', 'Software', 'Cloud', 'Cybersecurity', 'Other'],
}

Object.freeze(CONSTANTS.REACTIONS)
Object.freeze(CONSTANTS.TOPICS)
Object.freeze(CONSTANTS)

module.exports = CONSTANTS
