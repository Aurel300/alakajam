import * as React from "preact";
import { nunjuckMacro } from "server/macros/nunjucks-macros";

const SIDEBAR_MACROS_PATH = "macros/sidebar.macros.html";

export function sidebar(sidebar, path, options = {}) {
  return <div dangerouslySetInnerHTML={nunjuckMacro(SIDEBAR_MACROS_PATH, "sidebar", [sidebar, path, options])} />;
}
