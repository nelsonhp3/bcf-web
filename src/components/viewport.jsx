import React, { useEffect, useRef } from "react"
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch"
import { useSnapshot } from "context/app-context"

export default function Viewport({ src }) {
  // It will trigger every time you interact with transform-component
  // At the same time it will not cause rerendering so you can control it on your own
  // useTransformEffect(({ state,instance }) => {
  //     console.log(state); // { previousScale: 1, scale: 1, positionX: 0, positionY: 0 }
  //     return () => {
  //         // unmount
  //     }
  // })

  const [snapshot] = useSnapshot()

  const transformComponentRef = useRef(null)
  useEffect(() => {
    if (transformComponentRef.current) {
      const { resetTransform } = transformComponentRef.current
      resetTransform(0)
    }
  }, [snapshot])

  return (
    <TransformWrapper id="transformWrapper" ref={transformComponentRef} initialPositionX={0} initialPositionY={0} initialScale={1} smooth={false} minScale={0.2} maxScale={1000} zoomAnimation={{ disabled: true }} alignmentAnimation={{ disabled: true }} velocityAnimation={{ disabled: true }} limitToBounds={false}>
      <TransformComponent>{snapshot.src && <img id="viewpointViewer" src={snapshot.src} alt="" />}</TransformComponent>
    </TransformWrapper>
  )
}
