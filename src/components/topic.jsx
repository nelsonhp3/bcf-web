import React from "react"
import { convertDate } from "../helpers/helper"
import { Badge } from "./ui/badge"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"
import { cn } from "../lib/utils/cn"
import { Button } from "./ui/button"
import { Archive, ArchiveX, Clock, Forward, Lock, MoreVertical, Paperclip, Pencil, Reply, ReplyAll, SendHorizonal, Trash2, Unlock } from "lucide-react"
import { addDays, addHours, format, nextSaturday } from "date-fns"
import { Calendar } from "./ui/calendar"
import { Separator } from "./ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Textarea } from "./ui/textarea"
import { Label } from "./ui/label"
import { Switch } from "./ui/switch"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { ResizablePanel } from "./ui/resizable"
import { CommentsList } from "./comments-list"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog"

// interface ITopic {
//  ✅ guid: string,
//     server_assigned_id?: string,
//  ✅ topic_type: string,
//  ✅ topic_status: string,
//     reference_links?: string[] | undefined,
//  ✅ title: string,
//     priority?: string,
//     index?: number
//  ✅ labels?: string[] | undefined,
//  ✅ creation_date: Date,
//     creation_author: string,
//  ✅ modified_date?: Date,
//     modified_author?: string,
//  ✅ due_date?: Date
//  ✅ assigned_to?: string,
//     stage?: string,
//  ✅ description?: string,
//     bim_snippets?: IBimSnippet[] | undefined,
//     document_references?: IDocumentReference[] | undefined,
//     related_topics?: string[] | undefined,
//  ✅ comments?: IComment[] | undefined,
//     viewpoints?: IViewPoint[] | undefined ,
// }

function ChipButton({ value, handleOnClick }) {
    return <Badge onClick={handleOnClick}>{value}</Badge>
}

function ChipProperty({ property }) {
    let value = property.value

    if (property.isMultiValues && value && !Array.isArray(value))
        //Transform to array if it's just one value
        value = [value]

    //TODO: Predict if the value is array but must be single?

    if (property.valueSeparator) value = value.split(property.valueSeparator)

    if (property)
        return (
            <div className="chipsListContainer">
                <span>{property.name}</span>
                <div className="labelsList">
                    {!value ? (
                        <ChipButton value="+" />
                    ) : property.isMultiValues ? (
                        <>
                            {value.map((label, i) => (
                                <ChipButton key={i} value={label} />
                            ))}
                            <ChipButton value="+" />
                        </>
                    ) : (
                        <ChipButton value={value} />
                    )}
                </div>
            </div>
        )
}

export default function Topic({ topic, mapKey, selected, user }) {
    const today = new Date()

    const setTopic = () => {  
        console.log("setTopic", topic)
    }

    const deleteMarkup = (e) => {
        console.log("deleteMarkup", topic)
    }

  return (
    <ResizablePanel>
      <div className="flex h-full flex-col">
      <header className="flex items-center p-2">
        <div className="flex items-center gap-2">
          <Tooltip>
            <Popover>
              <PopoverTrigger asChild>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" disabled={!topic}>
                    <Clock className="h-4 w-4" />
                    <span className="sr-only">Snooze</span>
                  </Button>
                </TooltipTrigger>
              </PopoverTrigger>
              <PopoverContent className="flex w-[535px] p-0">
                <div className="flex flex-col gap-2 border-r px-2 py-4">
                  <div className="px-4 text-sm font-medium">Snooze until</div>
                  <div className="grid min-w-[250px] gap-1">
                    <Button
                      variant="ghost"
                      className="justify-start font-normal"
                    >
                      Later today{" "}
                      <span className="ml-auto text-muted-foreground">
                        {format(addHours(today, 4), "E, h:m b")}
                      </span>
                    </Button>
                    <Button
                      variant="ghost"
                      className="justify-start font-normal"
                    >
                      Tomorrow
                      <span className="ml-auto text-muted-foreground">
                        {format(addDays(today, 1), "E, h:m b")}
                      </span>
                    </Button>
                    <Button
                      variant="ghost"
                      className="justify-start font-normal"
                    >
                      This weekend
                      <span className="ml-auto text-muted-foreground">
                        {format(nextSaturday(today), "E, h:m b")}
                      </span>
                    </Button>
                    <Button
                      variant="ghost"
                      className="justify-start font-normal"
                    >
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
          </Tooltip>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!topic}>
                <Lock className="h-4 w-4" />
                <span className="sr-only">Enable edits</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Enable edits</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!topic}>
                <Unlock className="h-4 w-4" />
                <span className="sr-only">Disable edits</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Disable edits</TooltipContent>
          </Tooltip>
        </div>
        <Separator orientation="vertical" className="mx-2 h-6" />
        <AlertDialog>
          <AlertDialogTrigger>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" disabled={!topic}>
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete Markup</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Delete Markup</TooltipContent>
            </Tooltip>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to delete this markup?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => deleteMarkup()}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" disabled={!topic}>
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">More</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Show Code</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <Separator />
      {topic ? (
        <div className="flex flex-1 flex-col">
          <div className="flex items-start p-4">
            <div className="flex items-start gap-4 text-sm">
              <Avatar>
                <AvatarImage alt={topic.creation_author} />
                <AvatarFallback>
                  {topic.creation_author
                    .split(" ")
                    .map((chunk) => chunk[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <div className="font-semibold truncate">{topic.creation_author}</div>
                <div className="line-clamp-1 text-xs">{topic.description}</div>
                <div className="line-clamp-1 text-xs">
                  <span className="font-medium">Reply-To:</span> {topic.creation_author}
                </div>
              </div>
            </div>
            {topic.creation_date && (
              <div className="ml-auto pl-8 text-xs text-muted-foreground">
                {format(new Date(topic.creation_date), 'MMMM do, yyyy - hh:mm a')}
              </div>
            )}
          </div>
          <Separator />
          {/* region Description */}
          <div className="flex-none whitespace-pre-wrap p-4 text-sm min-h-[5rem] max-h-[15rem]">
            {topic.description}
          </div>
          <Separator className="mt-auto" />
          {/* region Replies */}
          {/* <section className="flex-1 whitespace-pre-wrap p-4 text-sm"> */}
          <>
            {!topic.comments || topic.comments.length < 1 ? 'No comments' : <CommentsList items={topic.comments}/>}
          </>
          {/* </section> */}
          <Separator className="mt-auto" />
          {/* region New Comment */}
            <form className="flex items-stretch">
                <Button
                  onClick={(e) => e.preventDefault()}
                  size="sm"
                  variant="ghost"
                  className="ml-auto flex h-full rounded-none">
                  <Paperclip className="h-4 w-4" size="0.875rem"/>
                </Button>
                <Textarea
                  className="p-2 m-[8px] min-h-[0px] h-2.25rem"
                  placeholder={`Add a comment as ${user.name}...`}/>
                <Button
                  onClick={(e) => e.preventDefault()}
                  size="sm"
                  variant="ghost"
                  className="ml-auto flex h-full rounded-none">
                  <SendHorizonal className="h-4 w-4" size="0.875rem"/>
                </Button>
            </form>
        </div>
      ) : (
        <div className="p-8 text-center text-muted-foreground">
          No message selected
        </div>
      )}
      </div>
    </ResizablePanel>
  )
}