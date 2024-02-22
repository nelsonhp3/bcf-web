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
const EditableField = React.forwardRef(({ ComponentEditable, ComponentReadOnly, ...props }, ref) => {
  const [edit] = useEdit()
  if (edit) return React.createElement(ComponentEditable, { ...props, ref })
  return React.createElement(ComponentReadOnly, { ...props, ref })
})

const EditableText = React.forwardRef((props, ref) => {
  const [edit] = useEdit()
  return <EditableField ComponentEditable={Textarea} ComponentReadOnly={"div"} {...props} ref={ref} />
})

const EditableDate = React.forwardRef(({ icon, stayButton, keepIcon, iconPos, date, placeholderText, onChange, ...props }, ref) => {
  const [edit] = useEdit()
  var iconCol
  if (iconPos === "left") iconCol = "col-start-1 mr-2"
  else iconCol = "col-start-3 ml-2"

  if (edit || stayButton)
    return (
      <Popover {...props} ref={ref}>
        <PopoverTrigger asChild>
          {/* <Button disabled={!edit} variant={"outline"} className={cn("w-fit pl-3 text-left font-normal gap-4", !date && "text-muted-foreground")}>
            {date ? format(date, "MMMM do, yyyy - hh:mm a") : <span>Pick a date</span>}
            {icon ? React.createElement(icon, { className: "ml-auto h-4 w-4 opacity-50" }) : <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />}
          </Button> */}
          <Button disabled={!edit} variant={"outline"} className={cn("w-fit pl-3 text-left font-normal", !date && "text-muted-foreground")}>
            <div className="grid grid-cols-[auto,1fr,auto] items-center">
              <div className='row-start-1 col-start-2'>{date ? format(date, "MMMM do, yyyy - hh:mm a") : "Pick a date"}</div>
              {icon ? React.createElement(icon, { className: cn("h-4 w-4 opacity-50", iconCol) }) : <CalendarIcon className={cn("h-4 w-4 opacity-50", iconCol)} />}
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          {date ? <Calendar mode="single" selected={date} onSelect={onchange} disabled={(date) => date > new Date() || date < new Date("1900-01-01")} initialFocus /> : ""}
        </PopoverContent>
      </Popover>
    )

  return (
    <>
      {date ? (
        <div {...props} className={cn(props.className, "grid grid-rows-1 grid-cols-[auto,1fr,auto] items-center")} ref={ref}>
          <div className={iconCol}>{keepIcon && React.createElement(icon || CalendarIcon, { className: "h-4 w-4 opacity-50" })}</div>
          <div className="row-start-1 col-start-2">{format(date, "MMMM do, yyyy - hh:mm a")}</div>
        </div>
      ) : (
        <div>{placeholderText}</div>
      )}
    </>
  )
})

// const EditableDate = React.forwardRef(({ icon, date, onChange, ...props }, ref) => {
//   const [edit] = useEdit()

//   if (edit)
//     return (
//       <Popover {...props} ref={ref}>
//         <PopoverTrigger asChild>
//           <Button variant={"outline"} className={cn("w-fit pl-3 text-left font-normal gap-4", !date && "text-muted-foreground")}>
//             {date ? format(date, "PPP") : <span>Pick a date</span>}
//             {icon ? React.createElement(icon, { className: "ml-auto h-4 w-4 opacity-50" }) :
//             <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
//             }
//           </Button>
//         </PopoverTrigger>
//         <PopoverContent className="w-auto p-0" align="start">
//           <Calendar mode="single" selected={date} onSelect={onchange} disabled={(date) => date > new Date() || date < new Date("1900-01-01")} initialFocus />
//         </PopoverContent>
//       </Popover>
//     )

//   return <div {...props} ref={ref}>{format(new Date(date), "MMMM do, yyyy - hh:mm a")}</div>
// })

export { EditableText, EditableDate }
