import React, { useContext, useEffect, useState } from "react"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Paperclip, SendHorizonal, Trash2, ZoomIn } from "lucide-react"
import { format } from "date-fns"
import { Separator } from "./ui/separator"
import { Textarea } from "./ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { CommentsList } from "./comments-list"
import TopicMenuBar from "./topic-menubar"
import { Input } from "./ui/input"
import { DropdownMultiSelect } from "./ui/dropdown-multi-select"
import { useMarkup } from "context/app-context"

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

function NewCommentBar({ user, bcfDispatch, topicGuid }) {
  const imgWallpaperCity = "https://images.unsplash.com/photo-1507090960745-b32f65d3113a"
  const [attachment, setAttachment] = useState(imgWallpaperCity)

  const createComment = () => {
    const commentTextInput = document.getElementById("newCommentInput")
    const commentText = commentTextInput.value
    if (!commentText) return

    commentTextInput.value = ""
    removeAttachment()

    console.log("commentText :>> ", commentText)
    bcfDispatch({
      type: "NEW_COMMENT",
      payload: { topicGuid: topicGuid, comment: { comment: commentText, author: user.name, snapshot: attachment } }
    })
  }

  const newAttachment = () => {
    setAttachment(imgWallpaperCity)
  }
  const removeAttachment = () => {
    setAttachment(null)
  }

  // const onEnterKeyDown = (e) => {
  //   if (e.key == "Enter") handleNewComment()
  // }

  return (
    <form className="flex items-stretch">
      {!attachment ? (
        <Button onClick={newAttachment} size="sm" variant="ghost" className="ml-auto flex h-full rounded-none">
          <Paperclip className="h-4 w-4" size="0.875rem" />
        </Button>
      ) : (
        <button className="relative rounded-lg flex items-center justify-items-stretch w-full max-w-40 h-fit max-h-80 m-2 mr-0 overflow-hidden cursor-pointer" onClick={removeAttachment}>
          <div className="absolute flex items-center justify-center z-10 w-full h-full bg-black/50 opacity-0 transition-all hover:opacity-100 text-white">
            <Trash2 className="h-1/5 w-1/5" />
            <span className="">Remove</span>
          </div>
          <img className="" src={attachment} alt="viewpoint snapshot" />
        </button>
      )}
      <Textarea id="newCommentInput" className="p-2 m-[8px] min-h-[0px] h-2.25rem" placeholder={`Add a comment as ${user.name}...`} />
      <Button type="button" onClick={createComment} size="sm" variant="ghost" className="ml-auto flex h-full rounded-none">
        <SendHorizonal className="h-4 w-4" size="0.875rem" />
      </Button>
    </form>
  )
}

export default function Topic({ selectedMarkupIndex, user, project, bcfDispatch }) {
  const [markup, setMarkup] = useMarkup()
  const topic = project.markups[selectedMarkupIndex].topic
  const [topicDescription, setTopicDescription] = useState(topic.description)

  const deleteMarkup = () => {
    bcfDispatch({
      type: "REMOVE_MARKUP",
      payload: { guid: topic.guid }
    })
    setMarkup((actualValue) => ({ ...actualValue, selected: 0 }))
  }

  useEffect(() => {
    // console.info("Topic rendered")
  }, [])

  return (
    <div className="flex h-full flex-col w-full">
      <TopicMenuBar isDisabled={!topic} deleteMarkup={deleteMarkup} />
      <Separator />
      <div className="flex flex-1 flex-col">
        <div className="flex items-start p-4 min-h-[5rem] max-h-[7em]">
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
              <Badge>Topic Type</Badge>
            </div>
          </div>
          {topic.creation_date && <div className="ml-auto pl-4 min-w-fit text-xs text-muted-foreground text-right">{format(new Date(topic.creation_date), "MMMM do, yyyy - hh:mm a")}</div>}
        </div>
        {/* <Separator /> */}
        {/* <div className="flex-none whitespace-pre-wrap p-4 text-sm min-h-[5rem] max-h-[15rem]">{topic.description}</div> */}
        <div className="flex-none whitespace-pre-wrap p-4 text-sm min-h-[5rem] max-h-[15rem]">
          <Textarea value={topicDescription} />
          {/* <DropdownMultiSelect/> */}
        </div>
        <Separator className="mt-auto" />
        <>{!topic.comments || topic.comments.length < 1 ? <h4 className="flex-1 flex scroll-m-20 text-xl font-semibold tracking-tight text-gray-300 text-center self-center items-center">No comments yet</h4> : <CommentsList items={topic.comments} />}</>
        <Separator className="mt-auto" />
        <NewCommentBar user={user} topicGuid={topic.guid} bcfDispatch={bcfDispatch} />
      </div>
    </div>
  )
}
