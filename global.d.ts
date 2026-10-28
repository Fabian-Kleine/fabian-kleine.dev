import type { Locale } from "@/i18n/config";
import type messages from "@/i18n/messages/en.json";

declare module "next-intl" {
    interface AppConfig {
        Locale: Locale;
        Messages: typeof messages;
    }
}
