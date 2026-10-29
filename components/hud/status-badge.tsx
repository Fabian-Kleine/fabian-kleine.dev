import { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { LiveDot } from "@/components/hud/live-dot";
import { ProjectMetaData } from "@/types";

export type ProjectStatus = "live" | "source" | "offline";

/** live demo first, then public source, otherwise the project can't be visited at all */
export function projectStatus({ demo, github }: Pick<ProjectMetaData, "demo" | "github">): ProjectStatus {
    if (demo) return "live";
    if (github) return "source";
    return "offline";
}

export function StatusBadge({ status, children }: { status: ProjectStatus; children: ReactNode }) {
    if (status === "live") return <Badge><LiveDot />{children}</Badge>;
    if (status === "offline") return <Badge variant="outline" className="border-dashed text-muted-foreground">{children}</Badge>;
    return <Badge variant="outline">{children}</Badge>;
}
