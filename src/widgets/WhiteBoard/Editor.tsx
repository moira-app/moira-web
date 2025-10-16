import { useRef, useState, useEffect, useCallback } from 'react'
import { Canvas, PencilBrush, Point } from 'fabric'
import { ActiveTool } from '~widgets/WhiteBoard/ActiveTool'

function Editor() {
  const [canvas, setCanvas] = useState<Canvas | null>(null)
  const fabricCanvasRef = useRef<HTMLCanvasElement | null>(null)

  // 캔버스 생성
  useEffect(() => {
    if (!fabricCanvasRef.current) return

    const newCanvas = new Canvas(fabricCanvasRef.current, {
      width: window.innerWidth,
      height: window.innerHeight
    })

    setCanvas(newCanvas)

    return () => {
      newCanvas.dispose()
    }
  }, [])

  // 브러시 세팅
  useEffect(() => {
    if (!canvas) return

    canvas.isDrawingMode = false
    canvas.freeDrawingBrush = new PencilBrush(canvas)
    canvas.freeDrawingBrush.width = 10
  }, [canvas])

  // 줌 이벤트 연결
  const handleZoom = useCallback(
    (opt) => {
      console.log('djkfa')
      const delta = opt.e.deltaY
      let scale = canvas?.getZoom() ?? 1
      scale *= 0.999 ** delta
      if (scale > 20) scale = 20
      if (scale < 0.01) scale = 0.01
      canvas?.zoomToPoint(new Point({ x: opt.e.offsetX, y: opt.e.offsetY }), scale)
      opt.e.preventDefault()
      opt.e.stopPropagation()
    },
    [canvas]
  )

  useEffect(() => {
    if (!canvas) return
    canvas.on('mouse:wheel', handleZoom)

    return () => canvas.off('mouse:wheel', handleZoom)
  }, [canvas, handleZoom])

  return (
    <div>
      <canvas ref={fabricCanvasRef} />
      <ActiveTool canvas={canvas} />
    </div>
  )
}

export { Editor }
