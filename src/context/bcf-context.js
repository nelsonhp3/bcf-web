import { createContext,useEffect,useReducer } from "react"

// nelsonhp3: This is an instance of @nelsonhp3/bcf-js in my pc. 
// I use it when I update bcf-js before publishing it to npm.
// import { BcfParser } from "bcf-js-dist"
import { BcfProject } from "@nelsonhp3/bcf-js"

const randomLongMessage = "https://www.googleadservices.com/pagead/aclk?sa=L&ai=DChcSEwjx88yTzJSDAxVtRUgAHXRjAOwYABAEGgJjZQ&ase=2&gclid=Cj0KCQiAsvWrBhC0ARIsAO4E6f_Ya1XcCOhJdliI_DsoQIpsAAdwCaRX2RpvLNyFhkfJqAJrUG9tdLIaAsdmEALw_wcB&ohost=www.google.com&cid=CAESVeD2EjcR3wTUJI90O8YKgUyU4epnFrHW776Lgx-jK8GZdYlRTzTBoLRKBYUgtzQfd5Scyd_CWWvjNOzRXhXMS3BC3VU_EV_jnxA5QWsnHMedaWafL8E&sig=AOD64_33-44okF3IjEfPKiAAJmG61QvTUQ&ctype=5&q=&nis=4&ved=2ahUKEwj4lMaTzJSDAxVirpUCHYkGBMIQ9aACKAB6BAgDEBU&adurl="
const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec arcu vel felis ultrices varius. Nullam scelerisque justo in nisl tristique, a aliquet nunc rhoncus. Vivamus et tortor diam. Fusce ac purus vitae tellus consectetur luctus. Morbi vel felis in ante tincidunt ultrices nec eu sem. Aenean vel ligula nec mauris viverra consequat. Nullam auctor justo non odio gravida, nec tincidunt ipsum vestibulum"

function createBlankProject(username) {
    const blankProject = new BcfProject("Blank Project")
    blankProject.newMarkup("","","",username)
    return blankProject
}

function createDummyProject() {
    const imgCoolCat = "https://i.imgur.com/wM0AUJQ.jpeg"
    const imgWallpaperCity = "https://images.unsplash.com/photo-1507090960745-b32f65d3113a"
    let time = new Date(Date.now())
    time.setHours(time.getHours() + Math.random() * 10)

    const dummyProject = new BcfProject("Random Project")
    const markup1 = dummyProject.newMarkup("clash","active","Pipe clashing with another pipe","Nelson Henrique",time)
    time.setHours(time.getHours() + Math.random() * 10)
    markup1.topic.description = "Some random description for this markup"
    markup1.topic.labels = ["ARQ","HID"]
    markup1.topic.assigned_to = "Nelson Henrique Coelho"
    time.setHours(time.getHours() + Math.random() * 10)
    markup1.topic.due_date = time
    const comment1 = dummyProject.newComment(markup1.topic.guid,"Beleza. Vou ajeitar aqui","Rafael Chaves",time)
    time.setHours(time.getHours() + Math.random() * 10)
    const comment1_2 = dummyProject.newComment(markup1.topic.guid,"Olha esse gato!!!","Israel Augusto",time) //TODO: Fix this viewpoint error in bcf-js
    time.setHours(time.getHours() + Math.random() * 10)
    const comment1_3 = dummyProject.newComment(markup1.topic.guid,randomLongMessage,"Nelson Henrique",time) //TODO: Fix this viewpoint error in bcf-js
    // const newSnp = dummyProject.newSnapshot(markup1,'')
    // comment1_2.viewpoint = newSnp.guid || 'asdasdjsakdjaslkdj'
    comment1_3.viewpoint = imgWallpaperCity
    // const { visualizationInfo } = dummyProject.editViewpointInfo(newSnp.guid)
    comment1_2.modified_author = "Rafael Chaves"
    time.setHours(time.getHours() + Math.random() * 10)
    comment1_2.modified_date = time
    comment1_2.viewpoint = imgCoolCat
    markup1.topic.modified_author = comment1_2.modified_author
    markup1.topic.modified_date = comment1_2.modified_date
    time.setHours(time.getHours() + Math.random() * 10)
    dummyProject.newComment(markup1.topic.guid,"Dummy Comment","Jhon Doe",time)
    time.setHours(time.getHours() + Math.random() * 10)
    dummyProject.newComment(markup1.topic.guid,"Dummy Comment","Jhon Doe",time)
    time.setHours(time.getHours() + Math.random() * 10)
    dummyProject.newComment(markup1.topic.guid,"Dummy Comment","Jhon Doe",time)
    time.setHours(time.getHours() + Math.random() * 10)
    dummyProject.newComment(markup1.topic.guid,"Dummy Comment","Jhon Doe",time)

    time.setHours(time.getHours() + Math.random() * 10)
    const markup2 = dummyProject.newMarkup("clash","active","Column in the middle of the room","Nelson Henrique Coelho Lorem Ipsum Dolor Sit Amet",time)
    markup2.topic.labels = ["ARQUITETURA","ESTRUTURAL","ELETRICO","HIDRAULICO","COMPATIBILIZAÇÃO","IMPLANTAÇÃO"]
    markup2.topic.assigned_to = "Rafael Chaves"
    markup2.topic.description = lorem
    time.setHours(time.getHours() + Math.random() * 10)
    const comment2 = dummyProject.newComment(markup2.topic.guid,"Moving it to the right.","Nelson Henrique",time)

    time.setHours(time.getHours() + Math.random() * 10)
    const markup3 = dummyProject.newMarkup("clash","active",lorem,"Nelson Henrique",time)
    time.setHours(time.getHours() + Math.random() * 10)
    const comment3 = dummyProject.newComment(markup3.topic.guid,"Cant be fixed.","Nelson Henrique",time)
    markup3.topic.labels = ["ARQ","EST","ELE","HID"]
    time.setHours(time.getHours() + Math.random() * 10)
    markup3.topic.due_date = time

    time.setHours(time.getHours() + Math.random() * 10)
    const markup4 = dummyProject.newMarkup("clash","active","One Word Title","Nelson Henrique",time)
    time.setHours(time.getHours() + Math.random() * 10)
    const comment4 = dummyProject.newComment(markup4.topic.guid,"Cant be fixed.","Nelson Henrique",time)
    markup4.topic.assigned_to = "Israel Augusto"

    return dummyProject
}

var INITIAL_STATE = {
    project: createDummyProject(),
    lastMarkupCreated: null,
}

export async function loadProject(file,dispatcher) {
    const buffer = await file.arrayBuffer()
    var projectLoad = new BcfProject("")
    await projectLoad.read(buffer)
    dispatcher({
        type: "LOAD_PROJECT",
        payload: { project: projectLoad }
    })
}

export const BcfContext = createContext(INITIAL_STATE)

export const BcfReducer = (state,action) => {
    const project = state.project
    const payload = action.payload

    switch (action.type) {
        case "NEW_PROJECT":
            return { ...state,project: createBlankProject(payload.user_name) }

        case "LOAD_PROJECT":
            if (!payload) throw new Error("No Payload")
            return { ...state,pendingLoad: payload.projectBuffer }

        case "LOAD_PROJECT_SUCCESS":
            return { ...state,project: payload.project }

        case "LOAD_PROJECT_FAILURE":
            console.error("Error loading project:",action.error)
            return { ...state,pendingLoad: null }

        case "NEW_MARKUP":
            const markupCreated = project.newMarkup("clash","active",payload.title,payload.user_name || "")
            return { ...state,lastMarkupCreated: markupCreated.topic.guid }

        case "NEW_COMMENT":
            const newComment = payload.comment
            console.log('payload :>> ',payload)
            const commentCreated = project.newComment(payload.topicGuid,newComment.comment,newComment.author,newComment.viewpointId)
            commentCreated.viewpoint = newComment.snapshot
            console.log('commentCreated :>> ',commentCreated)
            console.log('project :>> ',project)
            return { ...state }

        case "REMOVE_MARKUP":
            project.removeMarkup(payload.guid)
            return { ...state }

        case "REMOVE_COMMENT":
            project.removeComment(payload.guid)
            return { ...state }

        case "PROJECT_UPDATED":
            return { ...state }

        case "UNLOAD_PROJECT":
            return INITIAL_STATE

        default:
            return state
    }
}

export function BcfContextProvider({ children }) {
    const [state,dispatch] = useReducer(BcfReducer,INITIAL_STATE)

    // useEffect(() => {
    //     console.log("Passing BcfContextProviderUseEffect")
    // },[])

    // console.log("Passing BcfContextProvider")
    const value = {
        project: state.project,
        lastMarkupCreated: state.lastMarkupCreated,
        bcfDispatch: dispatch
    }

    return <BcfContext.Provider value={value}>{children}</BcfContext.Provider>
}
