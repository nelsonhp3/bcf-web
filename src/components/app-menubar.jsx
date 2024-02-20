import React, { useContext } from "react"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"
import { Button } from "./ui/button"
import { Download, FilePlus, FolderSearch, MoreVertical, User } from "lucide-react"
import { Separator } from "./ui/separator"
import { Label } from "./ui/label"
import BcfIconComponent from "./bcf-icon"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Input } from "./ui/input"
import { useMarkup, useUser } from "context/app-context"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { BcfContext } from "context/bcf-context"
import { BcfParser } from "bcf-js-dist"

function UserMenu({ user, setUser }) {
  const handleUserChange = (event) => {
    const name = document.getElementById("changeUsernameInput").value

    if (!name) return
    else if (name && name.length > 0) setUser((actualValue) => ({ ...actualValue, name: name, isEmpty: false }))
    else setUser((actualValue) => ({ ...actualValue, name: "", isEmpty: true }))
  }

  return (
    <Dialog>
      <Tooltip>
        <DialogTrigger asChild>
          <TooltipTrigger asChild>
            <Button id='setUserButton' variant="ghost" size="icon">
              <User className="h-4 w-4" />
              <span className="sr-only">User details</span>
            </Button>
          </TooltipTrigger>
        </DialogTrigger>
        <TooltipContent>Set user details</TooltipContent>
      </Tooltip>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit user name</DialogTitle>
          <DialogDescription>Make changes to your user name here. Click save when you're done.</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input id="changeUsernameInput" defaultValue={user.name} className="col-span-3" />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" onClick={handleUserChange}>
              Save changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default function AppMenuBar({ topic }) {
  const [user, setUser] = useUser()
  const [markup, setMarkup] = useMarkup()
  const { project, bcfDispatch } = useContext(BcfContext)

  const newBCF = async () => {
    bcfDispatch({
      type: "NEW_PROJECT",
      payload: { user_name: user.name }
    })
    setMarkup((actualValue) => ({ ...actualValue,selected: 0 }))
  }

  const loadBCF = async () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".bcf, .bcfzip"

    input.addEventListener("change", async (event) => {
      const file = event.target.files[0]

      try {
        const buffer = await file.arrayBuffer()
        console.log("buffer :>> ", buffer)
        var projectLoad = new BcfParser()
        await projectLoad.read(buffer)
        console.log("projectLoad :>> ", projectLoad)
        bcfDispatch({
          type: "LOAD_PROJECT_SUCCESS",
          payload: { project: projectLoad.project }
        })
      } catch (error) {
        console.error("Error while uploading BCF:", error)
      }
    })

    input.click()
  }

  const downloadBCF = async () => {
    try {
      const buffer = await project.write()
      const blob = new Blob([buffer], { type: "application/octet-stream" })

      const downloadLink = document.createElement("a")
      downloadLink.href = URL.createObjectURL(blob)
      downloadLink.download = "WriterTestNewProject.bcf"
      document.body.appendChild(downloadLink)
      downloadLink.click()
      document.body.removeChild(downloadLink)
    } catch (error) {
      console.error("Error while downloading BCF:", error)
    }
  }

  return (
    <header className="flex items-center p-2 pl-4 bg-primary text-white">
      <div className="flex items-center gap-2">
        {/* <img src="bcf-icon.svg" alt="logo"/> */}
        <BcfIconComponent />
        <h3 className="text-2xl font-semibold tracking-tight">Easy Bcf</h3>
      </div>
      <div className="ml-auto flex items-center">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button disabled={user.isEmpty} onClick={newBCF} variant="ghost" size="icon">
              <FilePlus className="h-4 w-4" />
              <span className="sr-only">New BCF</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>New BCF</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={loadBCF} variant="ghost" size="icon">
              <FolderSearch className="h-4 w-4" />
              <span className="sr-only">Open BCF</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Open BCF</TooltipContent>
        </Tooltip>
        <Tooltip disabled={!topic}>
          <TooltipTrigger asChild>
            <Button onClick={downloadBCF} variant="ghost" size="icon">
              <Download className="h-4 w-4" />
              <span className="sr-only">Download BCF</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Download BCF</TooltipContent>
        </Tooltip>
      </div>
      <Separator orientation="vertical" className="mx-2 h-6" />
      <UserMenu user={user} setUser={setUser} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
            <span className="sr-only">More</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem disabled={true}>Export as tsv</DropdownMenuItem>
          <DropdownMenuItem disabled={true}>Show Code</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
