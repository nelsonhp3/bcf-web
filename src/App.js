import { Button } from './components/ui/button'
import Topic from './components/topic'
import { MarkupsList } from 'components/markups-list'
import { ResizableHandle,ResizablePanel,ResizablePanelGroup } from 'components/ui/resizable'
import Viewport from 'components/viewport'
import { useMarkup,useUser } from 'context/app-context'
import AppMenuBar from 'components/app-menubar'
import { Separator } from 'components/ui/separator'
import { Alert,AlertDescription,AlertTitle } from 'components/ui/alert'
import { AlertTriangle,PlusIcon } from 'lucide-react'
import { useContext,useEffect } from 'react'
import { BcfContext } from 'context/bcf-context'

function NoUserAlert({ user }) {
  if (user.isEmpty)
    return (
      <button onClick={() => document.getElementById('setUserButton').click()} className='text-left px-4 pt-2 cursor-pointer'>
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>No User</AlertTitle>
          <AlertDescription>
            To comment or create topics, set your username.
          </AlertDescription>
        </Alert>
      </button>
    )
}

function App() {
  const [user,setUser] = useUser()
  const [markup,setMarkup] = useMarkup()
  const { project,lastMarkupCreated,bcfDispatch } = useContext(BcfContext)

  const hasTopic = () => {
    return project && project.markups && project.markups.length > 0
  }

  const newMarkup = () => {
    console.log("Passing newMarkup")
    bcfDispatch({
      type: 'NEW_MARKUP',
      payload: { title: 'New Markup',user_name: user.name }
    })
  }

  useEffect(() => {
    // setUser({ name: 'dev' })
    // console.log('App rendered')
  },[])

  useEffect(() => {
    if (!lastMarkupCreated && project)
      return

    for (var i = 0; i < project.markups.length; i++)
      if (project.markups[i].topic.guid === lastMarkupCreated) {
        // eslint-disable-next-line no-loop-func
        setMarkup((actualValue) => ({ ...actualValue,selected: i }))
        break
      }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[lastMarkupCreated])

  return (
    <header className="flex gap-2 h-full">
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes
          )}`
        }}
        className="h-full items-stretch">
        <ResizablePanel className='flex flex-row min-w-[900px]'>
          <div className='basis-1/3 flex flex-col min-w-[400px]'>
            <AppMenuBar />
            <Separator />
            <NoUserAlert user={user} />
            <MarkupsList project={project} bcfDispatch={bcfDispatch} />
            <Button onClick={newMarkup} disabled={user.isEmpty} className='relative bottom-4 right-4 p-2 self-end w-fit h-fit text-white'>
              <PlusIcon className='h-8 w-8' />
            </Button>
          </div>
          <div className='basis-2/3 flex flex-row'>
            <Separator orientation="vertical" className="h-full" />
            {hasTopic() && <Topic selectedMarkupIndex={markup.selected} user={user} project={project} bcfDispatch={bcfDispatch} />}
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel className='w-full h-full'>
          <Viewport />
        </ResizablePanel>
      </ResizablePanelGroup>
    </header>
  )
}

export default App