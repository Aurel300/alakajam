'use strict'

/**
 * Database storage configuration.
 * Requiring the module returns a [Bookshelf](http://bookshelfjs.org/) instance.
 *
 * @module core/db
 */

const moment = require('moment')
const promisify = require('promisify-node')
const fs = promisify('fs')
const path = require('path')
const config = require('../config')
const knexfile = require('../knexfile')
const constants = require('../core/constants')
const log = require('../core/log')

module.exports = initBookshelf()

function initBookshelf () {
  let knex = createKnexInstance()
  let bookshelf = createBookshelfInstance(knex)

  /**
   * Updates the database to the latest version
   * @param  {boolean} withSamples
   * @return {string} the DB version after upgrading
   */
  bookshelf.initDatabase = async function (withSamples) {
    log.info('Upgrading database...')
    let previousVersion = await knex.migrate.currentVersion()
    await knex.migrate.latest(knexfile)
    let newVersion = await knex.migrate.currentVersion()

    if (previousVersion !== newVersion) {
      log.info('Upgraded database from version ' + previousVersion + ' to ' + newVersion)
    } else {
      log.info('Database is already at version ' + newVersion)
    }
    if (previousVersion === 'none') {
      await insertInitialData(knex, withSamples)
    }
    return newVersion
  }

  /**
   * Downgrades the database until it is emptied.
   * @return {void}
   */
  bookshelf.emptyDatabase = async function () {
    let rollbackResult
    do {
      rollbackResult = await knex.migrate.rollback()
    } while (rollbackResult[0] !== 0)
  }

  return bookshelf
}

/*
 * Knex (SQL builder) init
 * @return {Knex}
 */
function createKnexInstance () {
  let knexOptions = {
    client: config.DB_TYPE,
    useNullAsDefault: true,
    debug: config.DEBUG_SQL
  }

  if (config.DB_TYPE === 'sqlite3') {
    knexOptions.connection = {
      filename: path.join(__dirname, '..', config.DB_SQLITE_FILENAME)
    }
  } else {
    knexOptions.connection = {
      host: config.DB_HOST,
      user: config.DB_USER,
      password: config.DB_PASSWORD,
      database: config.DB_NAME,
      charset: 'utf8'
    }
  }
  return require('knex')(knexOptions)
}

/*
 * Bookshelf (ORM) init with custom methods.
 * @param  {Knex} knex
 * @return {void}
 */
function createBookshelfInstance (knex) {
  let bookshelf = require('bookshelf')(knex)
  bookshelf.plugin('registry')
  bookshelf.plugin('pagination')
  bookshelf.plugin(require('bookshelf-cascade-delete'))
  return bookshelf
}

/**
 * Inserts sample data in the database.
 * @param {knex} knex
 * @param {bool|string} samples true to add samples, 'nightly' to add the special nighly post
 * @returns {void}
 */
async function insertInitialData (knex, samples) {
  const userService = require('../services/user-service')
  const eventService = require('../services/event-service')
  const eventThemeService = require('../services/event-theme-service')
  const postService = require('../services/post-service')
  const settingService = require('../services/setting-service')

  // Mandatory admin account & important settings

  await userService.register('administrator@example.com', 'administrator', 'administrator')
  let adminUser = await userService.findByName('administrator')
  adminUser.set({
    'title': 'Administrator',
    is_admin: true
  })
  await adminUser.save()

  await settingService.save(constants.SETTING_EVENT_REQUIRED_ENTRY_VOTES, 1)
  await settingService.save(constants.SETTING_EVENT_THEME_ELIMINATION_MODULO, 5)
  await settingService.save(constants.SETTING_EVENT_THEME_ELIMINATION_MIN_NOTES, 1)
  await settingService.save(constants.SETTING_EVENT_THEME_IDEAS_REQUIRED, 5)
  await settingService.save(constants.SETTING_ARTICLE_SIDEBAR, `{
    "sidebar": [
        {
            "title": "General",
            "links": [
                {
                    "title": "Welcome",
                    "url": "/article/docs"
                },
                {
                    "title": "Resources",
                    "url": "/article/resources"
                },
                {
                    "title": "F.A.Q.",
                    "url": "/article/faq"
                }
            ]
        },
        {
            "title": "Events rules",
            "links": [
                {
                    "title": "Alakajam!",
                    "url": "/article/alakajam-competition-rules"
                },
                {
                    "title": "Kajam",
                    "url": "/article/kajam-rules"
                },
                {
                    "title": "Feedback Fortnight",
                    "url": "/article/feedback-fortnight-rules"
                }
            ]
        },
        {
            "title": "Game jam tips",
            "links": [
                {
                    "title": "Managing scope",
                    "url": "/article/gjt-scope"
                },
                {
                    "title": "Skills",
                    "url": "/article/gjt-skills"
                },
                {
                    "title": "Social media",
                    "url": "/article/gjt-social"
                },
                {
                    "title": "Timelapses",
                    "url": "/article/gjt-timelapses"
                }
            ]
        },
        {
            "title": "Behind the scenes",
            "links": [
                {
                    "title": "Site changelog",
                    "url": "/changes"
                },
                {
                    "title": "JSON API",
                    "url": "/api"
                }
            ]
        }
    ]
}`)

  // Samples

  if (samples) {
    log.info('Inserting samples...')

    // Users

    await userService.register('entrant@example.com', 'entrant', 'entrant')
    let entrantUser = await userService.findByName('entrant')
    entrantUser.set({
      'title': 'Entrant'
    })
    await entrantUser.related('details').set({
      'body': 'I am definitely **not** a robot.'
    }).save()

    // 1st event

    let event1 = eventService.createEvent()
    event1.set({
      title: '1st Alakajam',
      name: '1st-alakajam',
      status: 'closed',
      display_dates: 'Novembary 17 - 20, 2016',
      display_theme: 'Make a website',
      status_theme: 'disabled',
      status_entry: 'on',
      status_results: 'disabled'
    })
    await event1.save()
    let userEntry = await eventService.createEntry(entrantUser, event1)
    userEntry.set('title', 'Old Game')
    await userEntry.save()

    // 2nd event

    let event2 = eventService.createEvent()
    event2.set({
      title: '2nd Alakajam',
      name: '2nd-alakajam',
      status: 'open',
      display_dates: 'Januember 29 - 31, 2017',
      display_theme: 'You are not alone',
      status_theme: 'voting',
      status_entry: 'open',
      status_results: 'voting',
      countdown_config: {
        phrase: 'starts',
        date: moment().add(1, 'days').toDate(),
        enabled: false
      }
    })
    await event2.save()
    let event2Details = event2.related('details')
    event2Details.set({
      category_titles: ['Overall', 'Graphics', 'Audio', 'Gameplay', 'Originality', 'Theme']
    })
    await event2Details.save()

    await settingService.save(constants.SETTING_FEATURED_EVENT_NAME, '2nd-alakajam')

    eventThemeService.saveThemeIdeas(entrantUser, event2, [
      {title: 'Alone'},
      {title: 'Evolution'},
      {title: 'Two buttons'}
    ])

    let adminEntry = await eventService.createEntry(adminUser, event2)
    adminEntry.set('title', 'Super Game')
    await adminEntry.save()

    userEntry = await eventService.createEntry(entrantUser, event2)
    userEntry.set('title', 'Game 1')
    await userEntry.save()

    for (let i = 2; i <= 50; i++) {
      await userService.register('entrant@example.com', 'entrant' + i, 'entrant' + i)
      let otherUser = await userService.findByName('entrant' + i)
      let otherEntry = await eventService.createEntry(otherUser, event2)
      otherEntry.set('title', 'Game ' + i)
      await otherEntry.save()
    }

    let post = await postService.createPost(entrantUser, event2.get('id'))
    post.set({
      title: "I'm in!",
      body: "This is my second game and I'm really excited.",
      event_id: event2.get('id'),
      entry_id: userEntry.get('id'),
      published_at: new Date()
    })
    await post.save()

    post = await postService.createPost(adminUser, event2.get('id'))
    post.set({
      title: 'Event started!',
      body: 'The theme is `You are not alone`. Have fun!',
      event_id: event2.get('id'),
      special_post_type: constants.SPECIAL_POST_TYPE_ANNOUNCEMENT,
      published_at: new Date()
    })
    if (samples === 'nightly') {
      let nightlyPostBuffer = await fs.readFile(path.join(__dirname, '../tests/nightly/POST.md'))
      let changesBuffer = await fs.readFile(path.join(__dirname, '../CHANGES.md'))
      post.set({
        title: 'Nightly: ' + moment().format('MMMM Do YYYY'),
        body: nightlyPostBuffer.toString() + changesBuffer.toString()
      })
    }
    await post.save()
    event2.set('status_rules', post.get('id'))
    await event2.save()

    await postService.createComment(entrantUser, post, "I'm in!")
    await postService.refreshCommentCount(post)

    // Planned 3rd event

    let event3 = eventService.createEvent()
    event3.set({
      title: '3rd Alakajam',
      name: '3rd-alakajam',
      status: 'pending',
      display_dates: 'Marchpril 5 - 8, 2017',
      status_theme: 'off',
      status_entry: 'off',
      status_results: 'off'
    })
    await event3.save()

    // Platforms
    const platformNames = [
      'Linux',
      'Mac',
      'Windows',
      'Web',
      'Mobile',
      'Retro'
    ]
    const now = knex.fn.now()
    await knex('platform').insert(platformNames.map(name => ({
      name,
      created_at: now,
      updated_at: now
    })))

    log.info('Samples inserted')
  }
}
