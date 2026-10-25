"use client"

import * as React from "react"
import { Progress as ProgressPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Progress({
  className,
  value,
  segmented = false,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root> & {
  segmented?: boolean
}) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      data-segmented={segmented || undefined}
      className={cn(
        "relative flex h-1.5 w-full items-center overflow-x-hidden bg-muted",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="size-full flex-1 bg-primary transition-transform duration-1000 ease-[cubic-bezier(.2,.8,.2,1)]"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
