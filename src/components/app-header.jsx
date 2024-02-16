import React from "react"
import { convertDate } from "../helpers/helper"
import { Badge } from "./ui/badge"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"
import { cn } from "../lib/utils/cn"
import { Button } from "./ui/button"
import { Archive, ArchiveX, Clock, Download, FilePenLine, FilePlus, FolderSearch, Forward, Lock, MoreVertical, Pencil, Reply, ReplyAll, SendHorizonal, Trash2, Unlock, User } from "lucide-react"
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
import BcfIconComponent from "./bcf-icon"

export default function AppHeader({topic, user}) {
  const today = new Date()

  const setTopic = () => {  
      console.log("setTopic", topic)
  }

  const deleteMarkup = (e) => {
      console.log("deleteMarkup", topic)
  }

  return (
    <header className="flex items-center p-2 bg-primary text-white">
        <div className="flex items-center gap-2">
          {/* <img src="bcf-icon.svg" alt="logo"/> */}
          <BcfIconComponent/>
          <h3 className="text-2xl font-semibold tracking-tight">Bcf On</h3>
        </div>
        <div className="ml-auto flex items-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <FilePlus className="h-4 w-4" />
                <span className="sr-only">New BCF</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>New BCF</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <FolderSearch className="h-4 w-4" />
                <span className="sr-only">Open BCF</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Open BCF</TooltipContent>
          </Tooltip>
          <Tooltip disabled={!topic}>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Download className="h-4 w-4" />
                <span className="sr-only">Download BCF</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Download BCF</TooltipContent>
          </Tooltip>
        </div>
        <Separator orientation="vertical" className="mx-2 h-6" />
        <AlertDialog>
          <AlertDialogTrigger>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-4 w-4" />
                  <span className="sr-only">User details</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Set user details</TooltipContent>
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
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
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