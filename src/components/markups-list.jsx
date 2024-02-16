import { cn } from "../lib/utils"
import { Badge } from "./ui/badge"
import { ResizablePanel } from "./ui/resizable"
import { ScrollArea } from "./ui/scroll-area"
import { useMarkup } from "context/app-context"
import formatDistanceToNow from "date-fns/formatDistanceToNow"

export function MarkupsList({ items }) {
  const [markup, setMarkup] = useMarkup()

  return (
    <ResizablePanel>
      <ScrollArea className="h-screen">
        <div className="flex flex-col gap-2 p-4 pt-0">
          {items.map((item, index) => (
            <button
              key={index}
              className={cn("flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
                markup.selected === index && "bg-muted")}
              onClick={() => setMarkup((actualValue) => ({...actualValue,selected: index}))}
            >
              <div className="flex w-full flex-col gap-1">
                <div className="flex items-center gap-8">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <div className="font-semibold truncate max-w-1em">{item.topic.creation_author}</div>
                  </div>
                  <div className={`w-fit overflow-hidden truncate ${cn("ml-auto text-xs",markup.selected === index ? "text-foreground" : "text-muted-foreground")}`}>
                    {formatDistanceToNow(new Date(item.topic.creation_date), {addSuffix: true})}
                  </div>
                </div>
                <div className="text-xs font-medium truncate">{item.topic.title}</div>
              </div>
              <div className="line-clamp-2 text-xs text-muted-foreground">
                {item.topic.description && item.topic.description.substring(0, 300)}
              </div>
              {item.topic.labels && item.topic.labels.length ? (
                <div className="flex items-center gap-2">
                  <>
                    <Badge variant={getBadgeVariantFromLabelType("topic_type")}>
                      {item.topic.topic_type}
                    </Badge>
                    <Badge variant={getBadgeVariantFromLabelType("topic_status")}>
                      {item.topic.topic_status}
                    </Badge>
                  {item.topic.labels.map((label) => (
                    <Badge key={label} variant={getBadgeVariantFromLabelType("label")}>
                      {label}
                    </Badge>
                  ))}
                  </>
                </div>
              ) : null}
            </button>
          ))}
        </div>
      </ScrollArea>
    </ResizablePanel>
  )
}

function getBadgeVariantFromLabelType(type) {
  if (["topic_type"].includes(type.toLowerCase())) 
    return "default"
  
  if (["topic_status"].includes(type.toLowerCase()))
    return "outline"

    if (["label"].includes(type.toLowerCase()))
    return "secondary"
  
  return "secondary"
}

function getBadgeVariantFromLabel(label) {
  if (["work"].includes(label.toLowerCase())) 
    return "default"
  
  if (["personal"].includes(label.toLowerCase()))
    return "outline"
  
  return "secondary"
}