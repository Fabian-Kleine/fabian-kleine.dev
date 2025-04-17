import { Suspense } from "react";
import { LoaderCircle } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <section className="relative flex justify-center mt-24 px-6">
            <div className="w-full max-w-4xl">
                <Suspense fallback={
                    <div className="flex justify-center w-full h-screen">
                        <LoaderCircle className="animate-spin" size={50} />
                    </div>
                }>
                    {children}
                </Suspense>
            </div>
        </section>
    )
}