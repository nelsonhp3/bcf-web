import logo from './logo.svg'
import './App.css'
import { Textarea } from './components/ui/textarea'
import { Button } from './components/ui/button'
import { BcfContext } from './context/bcf-context'
import { useContext } from 'react'
import Topic from './components/topic'
import { MarkupsList } from 'components/markups-list'
import { ResizableHandle,ResizablePanelGroup } from 'components/ui/resizable'
import Viewport from 'components/viewport'


function App() {
  const { project,bcfDispatch } = useContext(BcfContext)
  console.log('project :>> ',project)

  return (
    <header className="flex gap-2 h-full">
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes
          )}`
        }}
        className="h-full items-stretch"
      >
        <MarkupsList items={project.markups} />
        <ResizableHandle withHandle />
        <Topic topic={project.markups[0].topic} />
        <ResizableHandle withHandle />
        <Viewport/>
      </ResizablePanelGroup>
    </header>
  )
}

export default App

/*

import { useContext,useEffect,useRef,useState } from 'react'
import Viewport from './components/viewport'
import MarkupsList from './markups-list'
import FooterSettings from './footer-settings'
import CommentsList from './comments-list'
import Topic from './topic'
import { UserContext } from '../context/user-context'
import { BcfContext } from '../context/bcf-context'
import { AppContext } from '../context/app-settings-context'

export default function App() {
  const { project,bcfDispatch } = useContext(BcfContext)
  const { user,userDispatch } = useContext(UserContext)
  const { app,appDispatch } = useContext(AppContext)
  const [loading,setLoading] = useState(false)
  const [selectedMarkup,setSelectedMarkup] = useState(null)
  const transformComponentRef = useRef(null)

  const handleMarkupSelect = (selectedItem) => {
    setSelectedMarkup(selectedItem)
  }

  const createMarkup = () => {
    const test = bcfDispatch({
      type: "NEW_MARKUP",
      payload: { title: 'New Markup',user_name: user.name },
    })

    console.log('test :>> ',test)
  }

  const newAttachment = () => {

  }

  const handleNewComment = () => {
    const newCommentTextInput = 'new-comment-text-input'
    if (!newCommentTextInput || !newCommentTextInput.value) return

    bcfDispatch({
      type: "NEW_COMMENT",
      payload: { markup,comment: { comment: newCommentTextInput.value,author: user.name } },
    })

    newCommentTextInput.value = ''
  }

  const onEnterKeyDown = (e) => {
    // if(e.key == 'Enter')
    //     handleNewComment()
  }

  return (
    <div className='mainContainer'>
      {!project ? <h1>No Project</h1> :
        <div className='projectMainContainer'>
          <div className='leftColumn'>
            <div className='projectHeader'>
              <img src='./bcf-icon.svg' alt='bcf-icon'></img>
              {!project.name ? <h1>BCF Editor</h1> : <h1>{project.name}</h1>}
            </div>
            <button className='mainActionButton' onClick={createMarkup}>➕ New Markup</button>
            <div className='linearShadow' />
            <div className='listMarkups'>
              {loading ? ("Loading") : <MarkupsList project={project} bcfDispatch={bcfDispatch} onMarkupSelect={handleMarkupSelect} />}
            </div>
            <div className='linearShadow' />
            <FooterSettings />
          </div>
          <div className='middleColumn'>
            {!selectedMarkup ? <div className='withoutMarkup'><h1>Select a Markup</h1></div> :
              <div className='withMarkup'>
                <Topic topic={selectedMarkup.topic} />
                <div className='commentsList'>
                  <CommentsList markup={selectedMarkup} bcfDispatch={bcfDispatch} bcfProject={project} contextUser={user} appDispatch={appDispatch} />
                </div>
                <div className='newCommentContainer'>
                  <button className='mainActionButton' onClick={newAttachment}>➕</button>
                  <input type="text" id='new-comment-text-input' onKeyDown={onEnterKeyDown} />
                  <button className='mainActionButton' onClick={handleNewComment}>Add Comment</button>
                </div>
              </div>
            }
          </div>
          <Viewport />
        </div>
      }
    </div>
  )
}
*/