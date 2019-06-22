import constants from "server/core/constants";
import forms from "server/core/forms";
import security from "server/core/security";
import settings from "server/core/settings";
import eventService from "server/event/event.service";
import postService from "server/post/post.service";
import notificationService from "server/user/notification/notification.service";
import userService from "server/user/user.service";

export async function globalMiddleware(req, res, next) {
  res.locals.path = req.originalUrl;

  // Fetch current user
  let userTask = null;
  if (req.session.userId) {
    userTask = userService.findById(req.session.userId).then((user) => {
      res.locals.user = user;

      // Fetch comment to edit
      if (req.query.editComment && forms.isId(req.query.editComment)) {
        return postService.findCommentById(req.query.editComment).then(async (comment) => {
          if (comment && (security.canUserWrite(user, comment, { allowMods: true }) ||
              await postService.isOwnAnonymousComment(comment, user))) {
            res.locals.editComment = comment;
          }
        });
      }
    });
  }

  // Fetch featured event
  const featuredEventTask = settings.find(constants.SETTING_FEATURED_EVENT_NAME)
    .then((featuredEventName) => {
      if (featuredEventName) {
        return eventService.findEventByName(featuredEventName);
      }
    }).then((featuredEvent) => {
      if (featuredEvent) {
        res.locals.featuredEvent = featuredEvent;
      }
    });

  await Promise.all([featuredEventTask, userTask]); // Parallelize fetching both

  // Update unread notifications, from cache if possible
  if (res.locals.user && res.locals.path !== "/dashboard/feed") {
    res.locals.unreadNotifications = await notificationService.countUnreadNotifications(res.locals.user);
  }

  next();
}
