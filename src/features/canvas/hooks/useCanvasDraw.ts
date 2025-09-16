import { useState, useCallback, useEffect, type MouseEvent as ReactMouseEvent } from 'react'

function useCanvasDraw(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  /*default drawingState: false*/
  const [isDrawing, setIsDrawing] = useState(false)
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)

  useEffect(() => {
    const canvas = canvasRef?.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.strokeStyle = 'black'
    ctx.lineWidth = 2.5
    setCtx(ctx)
  }, [canvasRef])

  const handleDrawStart = useCallback(
    (e: ReactMouseEvent<HTMLCanvasElement>) => {
      if (!ctx) return
      ctx?.beginPath()
      ctx?.moveTo(e.clientX, e.clientY)
      setIsDrawing(true)
    },
    [ctx]
  )

  const handleDrawMove = useCallback(
    (e: ReactMouseEvent<HTMLCanvasElement>) => {
      if (!ctx || !isDrawing) return
      ctx?.lineTo(e.clientX, e.clientY)
      ctx?.stroke()
    },
    [isDrawing, ctx]
  )

  const handleDrawEnd = useCallback(() => {
    setIsDrawing(false)
  }, [])
  return { handleDrawStart, handleDrawMove, handleDrawEnd }
}

export { useCanvasDraw }
