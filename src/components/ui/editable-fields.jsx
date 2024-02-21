import { useEdit } from "context/app-context"
import { Textarea } from "./textarea"
import React from "react"
import { Calendar } from "./calendar"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { Button } from "./button"
import { cn } from "lib/utils/cn"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

// If you add any prop that div doesn't support, consider destructuring this prop and passing it only to the Textarea
const EditableField = React.forwardRef(({ ComponentTypeOne, ComponentTypeTwo, ...props }, ref) => {
  const [edit] = useEdit()

  if (edit) return React.createElement(ComponentTypeOne, { ...props, ref })
  return React.createElement(ComponentTypeTwo, { ...props, ref })
})

const EditableText = React.forwardRef((props, ref) => {
  const [edit] = useEdit()
  return <EditableField ComponentTypeOne={Textarea} ComponentTypeTwo={"div"} {...props} ref={ref} />
})

const EditableDate = React.forwardRef(({ date, onChange, ...props }, ref) => {
  const [edit] = useEdit()

  if (edit)
    return (
      <Popover {...props} ref={ref}>
        <PopoverTrigger asChild>
          <Button variant={"outline"} className={cn("w-fit pl-3 text-left font-normal gap-4", !date && "text-muted-foreground")}>
            {date ? format(date, "PPP") : <span>Pick a date</span>}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar mode="single" selected={date} onSelect={onchange} disabled={(date) => date > new Date() || date < new Date("1900-01-01")} initialFocus />
        </PopoverContent>
      </Popover>
    )

  return <div {...props} ref={ref}>{format(new Date(date), "MMMM do, yyyy - hh:mm a")}</div>
})

export { EditableText, EditableDate }
