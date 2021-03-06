'use strict'

/**
 * Constants
 *
 * @module core/constants
 */
const config = require('../config')

const PERMISSION_READ = 'read'
const PERMISSION_WRITE = 'write'
const PERMISSION_MANAGE = 'manage'
const ORDERED_PERMISSIONS = [PERMISSION_READ, PERMISSION_WRITE, PERMISSION_MANAGE]

const SPECIAL_POST_TYPE_ANNOUNCEMENT = 'announcement'
const SPECIAL_POST_TYPE_HIDDEN = 'hidden'
const SPECIAL_POST_TYPES = [SPECIAL_POST_TYPE_ANNOUNCEMENT, SPECIAL_POST_TYPE_HIDDEN]

const SETTING_FEATURED_EVENT_NAME = 'featured_event_name'
const SETTING_FEATURED_POST_ID = 'featured_post_id'
const SETTING_FEATURED_LINKS = 'featured_links'
const SETTING_ARTICLE_SIDEBAR = 'article_sidebar'
const SETTING_SESSION_KEY = 'session_key'
const SETTING_INVITE_PASSWORD = 'invite_password'
const SETTING_INVITE_PEPPER = 'invite_pepper'
const SETTING_EVENT_REQUIRED_ENTRY_VOTES = 'event_required_entry_votes'
const SETTING_EVENT_THEME_IDEAS_REQUIRED = 'event_theme_ideas_required'
const SETTING_EVENT_THEME_ELIMINATION_MODULO = 'event_theme_elimination_modulo'
const SETTING_EVENT_THEME_ELIMINATION_MIN_NOTES = 'event_theme_elimination_min_notes'
const SETTING_EVENT_THEME_SUGGESTIONS = 'event_theme_suggestions'

const THEME_STATUS_OUT = 'out'
const THEME_STATUS_ACTIVE = 'active'
const THEME_STATUS_BANNED = 'banned'
const THEME_STATUS_SHORTLIST = 'shortlist'
const THEME_STATUS_DUPLICATE = 'duplicate'

module.exports = {
  // Settings
  SETTING_FEATURED_EVENT_NAME,
  SETTING_FEATURED_POST_ID,
  SETTING_FEATURED_LINKS,
  SETTING_ARTICLE_SIDEBAR,
  SETTING_SESSION_KEY,
  SETTING_INVITE_PASSWORD,
  SETTING_INVITE_PEPPER,
  SETTING_EVENT_REQUIRED_ENTRY_VOTES,
  SETTING_EVENT_THEME_IDEAS_REQUIRED,
  SETTING_EVENT_THEME_ELIMINATION_MODULO,
  SETTING_EVENT_THEME_ELIMINATION_MIN_NOTES,
  SETTING_EVENT_THEME_SUGGESTIONS,
  EDITABLE_SETTINGS: [SETTING_FEATURED_EVENT_NAME, SETTING_FEATURED_POST_ID, SETTING_ARTICLE_SIDEBAR, SETTING_EVENT_REQUIRED_ENTRY_VOTES,
    SETTING_EVENT_THEME_IDEAS_REQUIRED, SETTING_EVENT_THEME_ELIMINATION_MODULO, SETTING_EVENT_THEME_ELIMINATION_MIN_NOTES, SETTING_EVENT_THEME_SUGGESTIONS,
    SETTING_FEATURED_LINKS],
  JSON_EDIT_SETTINGS: [SETTING_ARTICLE_SIDEBAR, SETTING_FEATURED_LINKS],

  // Security
  PERMISSION_READ,
  PERMISSION_WRITE,
  PERMISSION_MANAGE,
  ORDERED_PERMISSIONS,
  CONFIDENTIAL_CACHE_KEYS: [SETTING_SESSION_KEY],

  // Database
  DB_ILIKE: config.DB_TYPE.startsWith('sqlite') ? 'LIKE' : 'ILIKE',

  // Themes
  THEME_STATUS_OUT,
  THEME_STATUS_ACTIVE,
  THEME_STATUS_BANNED,
  THEME_STATUS_SHORTLIST,
  THEME_STATUS_DUPLICATE,
  THEME_STATUS_LIST: [THEME_STATUS_OUT, THEME_STATUS_ACTIVE, THEME_STATUS_BANNED,
    THEME_STATUS_SHORTLIST, THEME_STATUS_DUPLICATE],

  // Posts
  SPECIAL_POST_TYPE_ANNOUNCEMENT,
  SPECIAL_POST_TYPE_HIDDEN,
  SPECIAL_POST_TYPES,
  REQUIRED_ARTICLES: ['docs', 'faq'],
  ALLOWED_POST_TAGS: ['b', 'i', 'em', 'strong', 'a', 'u', 'br', 'iframe', 'img', 'p'],
  ALLOWED_POST_ATTRIBUTES: {
    'p': ['class'],
    'a': ['href', 'class', 'name'],
    'iframe': ['src', 'width', 'height', 'class', 'frameborder', 'webkitallowfullscreen', 'mozallowfullscreen', 'allowfullscreen'],
    'img': ['src', 'width', 'height', 'class']
  },
  ALLOWED_POST_CLASSES: ['pull-left', 'pull-right', 'text-left', 'text-center', 'text-right', 'spoiler', 'indent'],
  ALLOWED_IFRAME_HOSTS: ['player.vimeo.com', 'www.youtube.com', 'gfycat.com'],
  ANONYMOUS_USER_ID: -1,

  // Dates
  DATE_FORMAT: 'MMMM Do YYYY',
  DATE_TIME_FORMAT: 'MMMM Do YYYY, h:mma',
  PICKER_DATE_TIME_FORMAT: 'YYYY-MM-DD HH:mm',
  FEATURED_EVENT_DATE_FORMAT: 'MMM. Do, ha',

  // Entries
  ENTRY_PLATFORM_DEFAULT_ICON: 'fa-file-o',
  ENTRY_PLATFORM_ICONS: {
    'Windows': 'fa-windows',
    'Linux': 'fa-linux',
    'Mac': 'fa-apple',
    'Web': 'fa-globe',
    'Mobile': 'fa-mobile',
    'Retro': 'fa-gamepad'
  },

  // Events
  MAX_CATEGORY_COUNT: 6,
  MINIMUM_REQUIRED_RATINGS: 1, // TODO Set reasonable value

  // Misc
  ARTICLES_ROOT_URL: 'https://raw.githubusercontent.com/alakajam-team/alakajam/master/articles/',
  ALLOWED_PICTURE_MIMETYPES: [
    'image/png',
    'image/jpeg',
    'image/gif'
  ]

}
