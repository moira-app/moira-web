import { useRef } from 'react'
import { useCanvasDraw } from '~features/canvas/hooks/useCanvasDraw'

function Editor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const { handleDrawStart, handleDrawMove, handleDrawEnd } = useCanvasDraw(canvasRef)

  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={handleDrawStart}
      onMouseMove={handleDrawMove}
      onMouseUp={handleDrawEnd}
    />
  )
}

export { Editor }
