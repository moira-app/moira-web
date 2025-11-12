import { useRef } from 'react'
import { Canvas, Point, type TPointerEventInfo, type TPointerEvent } from 'fabric'

function useHandTool(canvas: Canvas | null) {
  const isPanning = useRef<boolean>(false)
  const lastPos = useRef<Point | null>(null)
  const handlePanStart = (opt: TPointerEventInfo<TPointerEvent>) => {
    if (!canvas) return
    isPanning.current = true
    const e = opt.e as PointerEvent
    lastPos.current = new Point(e.clientX, e.clientY)
  }
  const handlePanMove = (opt: TPointerEventInfo<TPointerEvent>) => {
    if (!isPanning.current || !lastPos.current || !canvas) return
    const e = opt.e as PointerEvent
    const vpt = canvas.viewportTransform
    if (!vpt) return
    vpt[4] += e.clientX - lastPos.current.x
    vpt[5] += e.clientY - lastPos.current.y
    canvas.requestRenderAll()
    lastPos.current.setXY(e.clientX, e.clientY)
  }

  const handlePanEnd = () => {
    isPanning.current = false
  }
  return { handlePanStart, handlePanMove, handlePanEnd }
}

export { useHandTool }
