import { DateTime } from "luxon";

/**
 * Convertit les timestamps en heure locale
 */
export const formatDateTime = (timestamp = 0, offset = 0, format = "cccc, dd LLL yyyy | HH:mm") => {
  return DateTime.fromSeconds(timestamp)
    .plus({ seconds: offset })
    .toFormat(format);
};
