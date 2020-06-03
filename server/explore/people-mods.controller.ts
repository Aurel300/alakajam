
import { CommonLocals } from "server/common.middleware";
import { CustomRequest, CustomResponse } from "server/types";
import userService from "server/user/user.service";
import peopleModsTemplate from "server/explore/people-mods.template";

export async function peopleMods(req: CustomRequest, res: CustomResponse<CommonLocals>) {
  res.locals.pageTitle = "Admins & mods";

  const admins = await userService.findUsers({ isAdmin: true, orderBy: "title" });
  const modsAndAdmins = await userService.findUsers({ isMod: true, orderBy: "title" });
  const mods = modsAndAdmins.filter(user => !admins.find(admin => admin.id === user.id));

  res.renderJSX(peopleModsTemplate, {
    ...res.locals,
    mods,
    admins
  });
}
