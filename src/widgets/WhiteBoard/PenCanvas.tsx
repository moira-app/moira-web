import { useRef } from 'react'
import { useCanvasDraw } from '~features/canvas/hooks/useCanvasDraw'

function PenCanvas() {
  const penCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const { handleDrawStart, handleDrawMove, handleDrawEnd } = useCanvasDraw(penCanvasRef)

  return (
    <canvas
      ref={penCanvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={handleDrawStart}
      onMouseMove={handleDrawMove}
      onMouseUp={handleDrawEnd}
    />
  )
}

export { PenCanvas }
