import { useRef, useState, useCallback, useEffect, type MouseEvent as ReactMouseEvent } from 'react'

function useCanvasDraw(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  /*default drawingState: false*/
  const isDrawingRef = useRef(false)
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

  const handleDrawStart = (e: ReactMouseEvent<HTMLCanvasElement>) => {
    if (!ctx) return
    isDrawingRef.current = true
    ctx.beginPath()
    ctx.moveTo(e.clientX, e.clientY)
  }

  const handleDrawMove = (e: ReactMouseEvent<HTMLCanvasElement>) => {
    if (!ctx || !isDrawingRef.current) return
    ctx?.lineTo(e.clientX, e.clientY)
    ctx?.stroke()
  }

  const handleDrawEnd = useCallback(() => {
    isDrawingRef.current = false
  }, [])
  return { handleDrawStart, handleDrawMove, handleDrawEnd }
}

export { useCanvasDraw }
