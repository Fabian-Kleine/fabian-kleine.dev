export default function LegalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section className="relative flex justify-center mt-24 px-6">
            <div className="w-full max-w-4xl">
                {children}
                <div className="my-24" />
            </div>
        </section>
    );
}