import { useRef } from 'react'
import { Canvas, Rect } from 'fabric'

function useCanvasDrawShape(canvas: Canvas | null) {
  /* 사각형 그리기 */

  const isDown = useRef(false)
  const originX = useRef(0)
  const originY = useRef(0)
  const rectRef = useRef<Rect | null>(null)

  const handleMouseDown = (opt) => {
    if (!canvas) return
    isDown.current = true
    const pointer = opt.viewportPoint
    originX.current = pointer.x
    originY.current = pointer.y

    const rect = new Rect({
      left: originX.current,
      top: originY.current,
      stroke: 'blue',
      strokeWidth: 2,
      selectable: false,
      evented: false
    })

    rectRef.current = rect
    canvas.add(rect)
  }

  const handleMouseMove = (opt) => {
    if (!canvas) return
    if (!isDown.current || !rectRef.current) return
    const pointer = opt.viewportPoint

    if (pointer.x < originX.current) rectRef.current.set({ left: pointer.x })
    if (pointer.y < originY.current) rectRef.current.set({ left: pointer.y })

    rectRef.current.set({
      width: Math.abs(pointer.x - originX.current),
      height: Math.abs(pointer.y - originY.current)
    })
    canvas.renderAll()
  }

  const handleMouseUp = () => {
    if (!canvas) return
    isDown.current = false
    if (rectRef.current) {
      rectRef.current.set({ selectable: true, evented: true })
      rectRef.current = null
    }
  }

  return { handleMouseDown, handleMouseMove, handleMouseUp }
}

export { useCanvasDrawShape }
