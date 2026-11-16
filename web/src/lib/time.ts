import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import duration from "dayjs/plugin/duration";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(relativeTime);
dayjs.extend(duration);
dayjs.extend(customParseFormat);

export { dayjs };

export function fromNow(time: string | undefined): string {
  if (!time) return "";
  const d = dayjs(time);
  return d.isValid() ? d.fromNow() : "";
}
