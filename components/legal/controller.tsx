import { config } from "@/config";

/** controller name and postal address from config.ts, required in the privacy policy (Art. 13 GDPR) */
export function Controller({ country }: { country: string }) {
    const { name, address, email } = config.legal;

    return (
        <address className="not-italic leading-7 my-4">
            {name}<br />
            {address.map((line) => <span key={line}>{line}<br /></span>)}
            {country}<br />
            <a href={`mailto:${email}`} className="underline text-primary">{email}</a>
        </address>
    );
}
