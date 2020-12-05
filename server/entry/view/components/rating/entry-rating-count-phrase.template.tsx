import { capitalize } from "lodash";
import React, { JSX } from "preact";

export function entryRatingCountPhrase(entry, entryVotes): JSX.Element {
  return <p>
    This <strong>{capitalize(entry.get("division"))}</strong> entry has received&nbsp;
    <strong>{entryVotes}</strong> rating{entryVotes !== 1 ? "s" : ""} so far.
  </p>;
}
