import React, { JSX } from "preact";
import { CommonLocals } from "server/common.middleware";
import links from "server/core/links";
import security from "server/core/security";
import { ifTrue } from "server/macros/jsx-utils";

export function moderationBar(context: CommonLocals, isAdmin: boolean): JSX.Element {
  const hasManyNotifications = context.modNotifications > 0;

  return <div class="moderation-bar">
    <div class="container">
      <a href="/admin" class={"btn " + (hasManyNotifications ? "btn-danger" : "")}>
        <span class="fas fa-wrench"></span> Mod dashboard
        {ifTrue(hasManyNotifications, () => ` (${context.modNotifications})`)}
      </a>

      {moderationLink(context.event?.id && security.canUserWrite(context.user, context.event)
          && (!context.featuredEvent || context.event?.id !== context.featuredEvent?.id),
      "Edit event", "calendar", links.routeUrl(context.event, "event", "edit"))}

      {moderationLink(context.featuredEvent?.id,
        "Edit featured event", "calendar", links.routeUrl(context.featuredEvent, "event", "edit"))}
      {moderationLink(context.path === "/explore/events",
        "Create event", "calendar", links.routeUrl(null, "event", "template"))}

      {moderationLink(context.event?.id,
        "Create announcement", "pencil-alt", links.routeUrl(null, "post", "create", { eventId: context.event?.id, specialPostType: "announcement" }))}
      {moderationLink(context.post?.id,
        "Edit post", "pencil-alt", links.routeUrl(context.post, "post", "edit"))}
      {moderationLink(context.entry?.id,
        "Edit entry", "gamepad", context.entry ? links.routeUrl(context.entry, "entry", "edit") : undefined)}

      {ifTrue(isAdmin, () =>
        <span>
          {moderationLink(context.profileUser,
            "Edit user", "user", context.profileUser
              ? links.routeUrl(context.profileUser, "user", "settings", { dashboardAdminMode: true }) : undefined)}
          {moderationLink(context.dashboardUser,
            "Edit user", "user", context.dashboardUser
              ? links.routeUrl(context.dashboardUser, "user", "settings", { dashboardAdminMode: true }) : undefined)}
        </span>
      )}
    </div>
  </div>;
}

function moderationLink(condition: boolean, label: string, icon: string, url: string) {
  if (condition) {
    return <a href={url} class="btn"><span class={`fas fa-${icon}`}></span> {label}</a>;
  }
}
