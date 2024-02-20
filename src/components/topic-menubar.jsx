import React from "react"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"
import { Button } from "./ui/button"
import { Clock, Lock, MoreVertical, Trash2, Unlock } from "lucide-react"
import { addDays, addHours, format, nextSaturday } from "date-fns"
import { Calendar } from "./ui/calendar"
import { Separator } from "./ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog"

export default function TopicMenuBar({ isDisabled, deleteMarkup }) {
  const today = new Date()

  return (
    <header className="flex items-center p-2">
      <div className="flex items-center gap-2">
        {/* <Tooltip>
            <Popover>
              <PopoverTrigger asChild>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" disabled={isDisabled}>
                    <Clock className="h-4 w-4" />
                    <span className="sr-only">Snooze</span>
                  </Button>
                </TooltipTrigger>
              </PopoverTrigger>
              <PopoverContent className="flex w-[535px] p-0">
                <div className="flex flex-col gap-2 border-r px-2 py-4">
                  <div className="px-4 text-sm font-medium">Snooze until</div>
                  <div className="grid min-w-[250px] gap-1">
                    <Button variant="ghost" className="justify-start font-normal">
                      Later today{" "}
                      <span className="ml-auto text-muted-foreground">
                        {format(addHours(today, 4), "E, h:m b")}
                      </span>
                    </Button>
                    <Button variant="ghost" className="justify-start font-normal">
                      Tomorrow
                      <span className="ml-auto text-muted-foreground">
                        {format(addDays(today, 1), "E, h:m b")}
                      </span>
                    </Button>
                    <Button variant="ghost" className="justify-start font-normal">
                      This weekend
                      <span className="ml-auto text-muted-foreground">
                        {format(nextSaturday(today), "E, h:m b")}
                      </span>
                    </Button>
                    <Button variant="ghost" className="justify-start font-normal">
                      Next week
                      <span className="ml-auto text-muted-foreground">
                        {format(addDays(today, 7), "E, h:m b")}
                      </span>
                    </Button>
                  </div>
                </div>
                <div className="p-2">
                  <Calendar />
                </div>
              </PopoverContent>
            </Popover>
            <TooltipContent>Snooze</TooltipContent>
          </Tooltip> */}
      </div>
      <div className="ml-auto flex items-center gap-2">
        {/* <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={isDisabled}>
                <Lock className="h-4 w-4" />
                <span className="sr-only">Enable edits</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Enable edits</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={isDisabled}>
                <Unlock className="h-4 w-4" />
                <span className="sr-only">Disable edits</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Disable edits</TooltipContent>
          </Tooltip> */}
      </div>
      <Separator orientation="vertical" className="mx-2 h-6" />
      <AlertDialog>
        <Tooltip>
          <TooltipTrigger asChild>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon" disabled={isDisabled}>
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete Markup</span>
              </Button>
            </AlertDialogTrigger>
          </TooltipTrigger>
          <TooltipContent>Delete Markup</TooltipContent>
        </Tooltip>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this markup?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteMarkup()}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" disabled={isDisabled}>
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">More</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Show Code</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}
    </header>
  )
}
