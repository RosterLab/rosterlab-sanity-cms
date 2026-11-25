import { localizeUSText } from "@/lib/localization/us-text";

const usTerminology = {
  "weighs up": "weighs",
  "overnight cover": "overnight coverage",
  "annual leave": "paid time off",
  "check leave": "check time off",
  "fatigue or eba rules": "fatigue rules or union agreements",
  "roster writer": "scheduler",
  authorised: "authorized",
  "new starters": "new hires",
};

export function ottoText(text: string, isUS = false) {
  return isUS ? localizeUSText(text, [], usTerminology) : text;
}
