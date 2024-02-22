import React, { useEffect, useRef } from "react"
import { cn } from "../lib/utils/cn"
import { Badge } from "./ui/badge"
import { ScrollArea } from "./ui/scroll-area"
import { useMarkup, useSnapshot } from "context/app-context"
import formatDistanceToNow from "date-fns/formatDistanceToNow"

export function MarkupsList({ items, project }) {
  // const { project } = useContext(BcfContext)

  const [markup, setMarkup] = useMarkup()
  const [snapshot, setSnapshot] = useSnapshot()
  const labelsList = useRef(null)

  const handleMarkupClick = (index) =>{
    setSnapshot((actualValue) => ({ ...actualValue, src: null }))
    setMarkup((actualValue) => ({ ...actualValue, selected: index }))
  }

  useEffect(() => {
    // console.log("MarkupsList rendered")
    // console.log("labelsList :>> ", labelsList)
  }, [])

  return (
    <>
      {!project.markups || project.markups.length < 1 ? (
        <h4 className="flex-1 flex scroll-m-20 text-xl font-semibold tracking-tight text-gray-300 text-center self-center items-center">No topics yet</h4>
      ) : (
        <ScrollArea className="h-screen">
          <div className="flex flex-col gap-2 p-4 pt-2">
            {project.markups.map((item, index) => (
              <button key={index} onClick={() => handleMarkupClick(index)} className={cn("flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent", markup.selected === index && "bg-muted")}>
                <div className="flex w-full flex-col gap-1">
                  <div className="flex items-center gap-8">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <div className="font-semibold truncate max-w-1em">{item.topic.creation_author}</div>
                    </div>
                    <div className={`w-fit overflow-hidden truncate ${cn("ml-auto text-xs", markup.selected === index ? "text-foreground" : "text-muted-foreground")}`}>{formatDistanceToNow(new Date(item.topic.creation_date), { addSuffix: true })}</div>
                  </div>
                  <div className="text-xs font-medium truncate">{item.topic.title}</div>
                </div>
                <div className="line-clamp-2 text-xs text-muted-foreground">{item.topic.description && item.topic.description.substring(0, 300)}</div>
                <div ref={labelsList}>
                  {item.topic.labels && item.topic.labels.length ? (
                    <div className="flex flex-wrap gap-2 max-h-[52px] overflow-hidden">
                      <Badge variant={getBadgeVariantFromLabelType("topic_status")}>{item.topic.topic_status}</Badge>
                      <Badge variant={getBadgeVariantFromLabelType("topic_type")}>{item.topic.topic_type}</Badge>
                      {item.topic.labels.map((label) => (
                        <Badge key={label} variant={getBadgeVariantFromLabelType("label")}>
                          {label}
                        </Badge>
                      ))}
                      {/* <Badge variant={getBadgeVariantFromLabelType("topic_status")}>+3</Badge> */}
                    </div>
                  ) : null}
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      )}
    </>
  )
}

function getBadgeVariantFromLabelType(type) {
  if (["topic_status"].includes(type.toLowerCase())) return "default"

  if (["topic_type"].includes(type.toLowerCase())) return "outline"

  if (["label"].includes(type.toLowerCase())) return "secondary"

  return "secondary"
}
