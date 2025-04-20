export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section className="w-full border-t bg-background px-6 lg:px-36 pt-24 mt-4">
            <h1 className="tracking-tighter text-2xl sm:text-3xl md:text-4xl lg:text-5xl/none font-bold">Contact</h1>
            <div className="w-full flex justify-start items-center">
                {children}
            </div>
        </section>
    );
}