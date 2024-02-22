import { CalendarPlus, PanelLeftOpen, Trash2 } from "lucide-react"
import { ScrollArea } from "./ui/scroll-area"
import { useEdit, useSnapshot } from "context/app-context"
import { EditableDate, EditableText } from "./ui/editable-fields"

export function CommentsList({ items }) {
  const [snapshot, setSnapshot] = useSnapshot()
  const [edit] = useEdit()

  const handleSnapshotClick = (e) => {
    if (edit) {
      console.log("Passing delete snapshot click")
      return
    }

    const snapshotSrc = e.currentTarget.querySelector("img").src
    setSnapshot((actualValue) => ({ ...actualValue, src: snapshotSrc }))
  }

  // useEffect(()=>{console.info("CommentsList rendered")},[])

  return (
    <ScrollArea className="whitespace-pre-wrap px-4 text-sm h-full">
      <div className="flex flex-col gap-2 p-4 h-40">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col items-start gap-2 w-full rounded-lg border p-3 text-left text-sm">
            <div className="flex w-full flex-row justify-between gap-4">
              <EditableText className="min-h-fit text-xs font-medium truncate resize-none" rows={1}>
                {item.author}
              </EditableText>
              {/* <div className={`w-fit overflow-hidden truncate ml-auto text-xs text-muted-foreground`}>
                  {format(item.date, 'MMMM do, yyyy - hh:mm a')}
                </div> */}
              <EditableDate icon={CalendarPlus} className="w-fit overflow-hidden truncate ml-auto text-xs text-muted-foreground" date={item.date} onChange={(e) => item.date} />
            </div>
            <EditableText className="text-xs text-muted-foreground break-all">{item.comment}</EditableText>
            {item.viewpoint && (
              <div className="relative rounded-lg flex items-center justify-items-stretch w-full h-fit max-h-80 overflow-hidden cursor-pointer" onClick={handleSnapshotClick}>
                {!edit ? (
                  <div className="absolute flex items-center justify-center z-10 w-full h-full bg-black/50 opacity-0 transition-all hover:opacity-100">
                    <PanelLeftOpen className="h-1/5 w-1/5 text-white" />
                  </div>
                ) : (
                  <div className="absolute flex items-center justify-center z-10 w-full h-full bg-red-600 opacity-0 transition-all hover:opacity-100">
                    <Trash2 className="h-1/5 w-1/5 text-white" />
                  </div>
                )}
                <img src={item.viewpoint} alt="viewpoint snapshot" />
              </div>
            )}
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
