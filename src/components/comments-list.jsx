import { ZoomIn } from "lucide-react"
import { cn } from "../lib/utils"
import { Badge } from "./ui/badge"
import { ResizablePanel } from "./ui/resizable"
import { ScrollArea } from "./ui/scroll-area"
import { useComment, useSnapshot } from "context/app-context"
import { format } from "date-fns"

export function CommentsList({ items }) {
  const [snapshot, setSnapshot] = useSnapshot()

  const handleSnapshotClick = (e) => {
    // e.stopPropagation()
    console.log("handleSnapshotClick")
    const snapshotSrc = e.currentTarget.querySelector('img').src
    setSnapshot((actualValue) => ({...actualValue,src: snapshotSrc}))
  }

  return (
      <ScrollArea className="whitespace-pre-wrap p-4 text-sm h-full">
        <div className="flex flex-col gap-2 p-4 pt-0 h-40">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-start gap-2 w-full rounded-lg border p-3 text-left text-sm">
              <div className="flex w-full flex-row justify-between gap-4">
                <div className="text-xs font-medium truncate">{item.author}</div>
                <div className={`w-fit overflow-hidden truncate ml-auto text-xs text-muted-foreground`}>
                  {format(new Date(item.date), 'MMMM do, yyyy - hh:mm a')}
                </div>
              </div>
              <div className="text-xs text-muted-foreground break-all">
                {item.comment && item.comment.substring(0, 300)}
              </div>
              {item.viewpoint && 
              <div className="relative rounded-lg flex items-center justify-items-stretch w-full h-fit max-h-40 overflow-hidden cursor-pointer" onClick={handleSnapshotClick}>
                <div className="absolute flex items-center justify-center z-10 w-full h-full bg-black/50 opacity-0 transition-all hover:opacity-100">
                  <ZoomIn className="h-1/5 w-1/5 text-white"/>
                </div>
                <img className="" src={item.viewpoint} alt="viewpoint snapshot"/>
              </div>}
            </div>
          ))}
        </div>
      </ScrollArea>
  )
}