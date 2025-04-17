import { Suspense } from "react";
import { LoaderCircle } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <section className="relative mt-24 px-6 lg:px-24">
            <Suspense fallback={
                <div className="flex justify-center w-full h-screen">
                    <LoaderCircle className="animate-spin" size={50} />
                </div>
            }>
                {children}
            </Suspense>
        </section>
    )
}