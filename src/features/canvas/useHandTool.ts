import { useRef } from 'react'
import { Canvas, Point } from 'fabric'

function useHandTool(canvas: Canvas | null) {
  const isPanning = useRef(false)
  const lastPos = useRef<Point | null>(null)
  const handlePanStart = (opt) => {
    if (!canvas) return
    isPanning.current = true
    const e = opt.e
    lastPos.current = canvas.getScenePoint(e)
  }
  const handlePanMove = (opt) => {
    if (!isPanning.current || !lastPos.current || !canvas) return
    const e = opt.e
    const cur = canvas.getScenePoint(e)
    const vpt = canvas.viewportTransform
    const zoom = canvas.getZoom()
    if (!vpt) return
    vpt[4] += (cur.x - lastPos.current.x) / zoom
    vpt[5] += (cur.y - lastPos.current.y) / zoom
    canvas.requestRenderAll()
    lastPos.current.setXY(cur.x, cur.y)
  }

  const handlePanEnd = () => {
    isPanning.current = false
    lastPos.current = null
  }
  return { handlePanStart, handlePanMove, handlePanEnd }
}

export { useHandTool }
