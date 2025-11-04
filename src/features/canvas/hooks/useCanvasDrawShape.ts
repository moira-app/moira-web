import { useRef } from 'react'
import { Canvas, Point, Rect, type TPointerEventInfo, type TPointerEvent } from 'fabric'

function useCanvasDrawShape(canvas: Canvas | null) {
  /* 사각형 그리기 */

  const isDown = useRef(false)
  const lastPos = useRef<Point | null>(null)
  const rectRef = useRef<Rect | null>(null)

  const handleDrawStart = (opt: TPointerEventInfo<TPointerEvent>) => {
    if (!canvas) return
    isDown.current = true
    const e = opt.e as PointerEvent
    lastPos.current = canvas.getScenePoint(e)

    const rect = new Rect({
      left: lastPos.current.x,
      top: lastPos.current.y,
      stroke: 'black',
      fill: 'white',
      strokeWidth: 2,
      selectable: false,
      evented: false
    })

    rectRef.current = rect
    canvas.add(rect)
  }

  const handleDrawMove = (opt: TPointerEventInfo<TPointerEvent>) => {
    if (!canvas) return
    if (!canvas || !isDown.current || !rectRef.current || !lastPos.current) return
    const e = opt.e
    const cur = canvas.getScenePoint(e)

    if (cur.x < lastPos.current.x) rectRef.current.set({ left: cur.x })
    if (cur.y < lastPos.current.y) rectRef.current.set({ top: cur.y })

    rectRef.current.set({
      width: Math.abs(cur.x - lastPos.current.x),
      height: Math.abs(cur.y - lastPos.current.y)
    })
    canvas.requestRenderAll()
  }

  const handleDrawEnd = () => {
    if (!canvas) return
    isDown.current = false
    lastPos.current = null
    if (rectRef.current) {
      rectRef.current.set({ selectable: true, evented: true })
      rectRef.current = null
    }
  }

  return { handleDrawStart, handleDrawMove, handleDrawEnd }
}

export { useCanvasDrawShape }
