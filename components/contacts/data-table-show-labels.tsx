"use client"

import { Minus, MoreHorizontal } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export const ShowLabels = ({ labels }: any) => {
  if (labels.length === 0) {
    return (
      <Badge variant="outline" className="h-7 rounded-md">
        <Minus className="w-3 h-3" />
      </Badge>
    )
  }

  if (labels.length < 2 || labels.length === 2) {
    return (
      <div className="flex flex-row items-center space-x-2">
        {labels.map((label: string) => (
          <Badge key={label} variant="outline" className="h-7 rounded-md">
            <span className="text-[11px] font-medium">{label}</span>
          </Badge>
        ))}
      </div>
    )
  }

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger>
          <div className="flex flex-row items-center space-x-2">
            {labels.slice(0, 2).map((label: string) => (
              <Badge key={label} variant="outline" className="h-7 rounded-md">
                <span className="text-[11px] font-medium">{label}</span>
              </Badge>
            ))}
            <Badge variant="outline" className="h-7 rounded-md">
              <MoreHorizontal className="w-3 h-3" />
              <span className="ml-1 text-[10px]">{`(${
                labels.length - 2
              })`}</span>
            </Badge>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="flex flex-row items-center space-x-2">
            {labels.map((label: string) => (
              <Badge key={label} variant="outline" className="h-7 rounded-md">
                <span className="text-[11px] font-medium">{label}</span>
              </Badge>
            ))}
          </div>
          <TooltipArrow className="fill-background" />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
