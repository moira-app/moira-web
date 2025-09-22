import { useRef, useState, useEffect } from 'react'
import { Canvas, PencilBrush } from 'fabric'
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

    newCanvas.isDrawingMode = false
    newCanvas.freeDrawingBrush = new PencilBrush(newCanvas)
    newCanvas.freeDrawingBrush.width = 10

    setCanvas(newCanvas)
    return () => {
      newCanvas.dispose()
    }
  }, [])

  return (
    <div>
      <canvas ref={fabricCanvasRef} />
      <ActiveTool canvas={canvas} />
    </div>
  )
}

export { Editor }
