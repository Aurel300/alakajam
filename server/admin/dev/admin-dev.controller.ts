import config from "server/core/config";
import db from "server/core/db";
import security from "server/core/security";
import userService from "../../user/user.service";

/**
 * Admin only: developer tools
 */
export async function adminDev(req, res) {
  if (res.app.locals.devMode && (config.DEBUG_ADMIN || security.isAdmin(res.locals.user))) {
    let infoMessage = "";
    let errorMessage = "";
    if (req.method === "POST") {
      if (req.body["db-reset"]) {
        await db.emptyDatabase();
        const newVersion = await db.initDatabase(config.DEBUG_INSERT_SAMPLES);
        infoMessage = "DB reset done (current version : " + newVersion + ").";
      } else if (req.body["replace-passwords"]) {
        const users = await userService.findUsers({ pageSize: 30 });
        await db.transaction(async (t) => {
          for (const user of users.models) {
            userService.setPassword(user, "password");
            await user.save(null, { transacting: t });
          }
        });
        infoMessage = 'The last 30 created users now have their password set to "password".';
      } else if (req.body.backup) {
        if (db.getBackupDate()) {
          await db.backup();
          infoMessage = "Backup created.";
        } else {
          // Don't override backups (ensures stability when working on Cypress tests)
          errorMessage = "A backup already exists, please delete it first";
        }
      } else if (req.body.restore) {
        await db.restore(res.app.locals.sessionStore);
        infoMessage = "Backup restored.";
      } else if (req.body["delete-backup"]) {
        await db.deleteBackup();
        infoMessage = "Backup deleted.";
      }
    }
    res.render("admin/dev/admin-dev", {
      infoMessage,
      errorMessage,
      backupDate: await db.getBackupDate()
    });
  } else {
    res.errorPage(403, "Page only available in development mode");
  }
}
