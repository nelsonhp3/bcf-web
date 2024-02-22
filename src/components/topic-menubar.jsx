import React from "react"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"
import { Button } from "./ui/button"
import { CalendarClock, CalendarPlus, Clock, Lock, MoreVertical, MoveRight, Trash2, Unlock } from "lucide-react"
import { addDays, addHours, format, nextSaturday } from "date-fns"
import { Calendar } from "./ui/calendar"
import { Separator } from "./ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog"
import { useEdit } from "context/app-context"
import { EditableDate } from "./ui/editable-fields"

export default function TopicMenuBar({ isDisabled, deleteMarkup, topic, setDate }) {
  const today = new Date()
  const [edit, setEdit] = useEdit()

  const toggleEdits = () => {
    // console.log("enableDisableEdits")
    // const component = document.getElementById('topicDescription')
    // const value = component.value
    // console.log("component", component)

    if (edit) setEdit(false)
    else setEdit(true)
  }

  return (
    <header className="flex items-center p-2 pl-4">
      <div className="flex-1 flex items-center gap-2 text-xs text-muted-foreground">
        <div className="min-w-fit">
          <EditableDate icon={CalendarPlus} keepIcon={true} iconPos='left' date={topic.creation_date} placeholderText='No creation date' onChange={setDate} />
        </div>
        <MoveRight className="w-4 h-4 stroke-[0.1em]"/>
        <div className="min-w-fit">
          <EditableDate icon={CalendarClock} keepIcon={true} date={topic.due_date} placeholderText='No due date' onChange={setDate} />
        </div>
      </div>
      <Separator orientation="vertical" className="mx-2 h-6" />
      <div className="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={toggleEdits} variant="ghost" size="icon" disabled={isDisabled}>
              {edit ? <Unlock className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
              <span className="sr-only">{edit ? "Disable edits" : "Enable edits"}</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>{edit ? "Disable edits" : "Enable edits"}</TooltipContent>
        </Tooltip>
      </div>
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
