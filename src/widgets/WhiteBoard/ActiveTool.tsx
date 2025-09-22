import { useState, useEffect } from 'react'
import { Canvas } from 'fabric'
import { Button } from '~shared/ui/Button'
import { useCanvasDrawShape } from '~features/canvas/hooks/useCanvasDrawShape'

function ActiveTool({ canvas }: { canvas: Canvas | null }) {
  const [activeTool, setActiveTool] = useState<string>('select')
  const { handleMouseDown, handleMouseMove, handleMouseUp } = useCanvasDrawShape(canvas)

  // activeTool 변경
  useEffect(() => {
    if (!canvas) return
    switch (activeTool) {
      case 'select':
        handleSelectTool()
        break

      case 'pen':
        handlePenTool()
        break

      case 'rect':
        handleRectTool()
    }
    return () => {
      canvas.off('mouse:down', handleMouseDown)
      canvas.off('mouse:move', handleMouseMove)
      canvas.off('mouse:up', handleMouseUp)
    }
  }, [activeTool])

  const handleSelectTool = () => {
    if (!canvas) return
    canvas.isDrawingMode = false
    canvas.selection = true
  }

  const handlePenTool = () => {
    if (!canvas) return
    if (canvas.freeDrawingBrush) {
      canvas.freeDrawingBrush.width = 10
      canvas.isDrawingMode = true
    }
  }

  const handleRectTool = () => {
    if (!canvas) return
    canvas.isDrawingMode = false
    canvas.selection = false
    canvas.on('mouse:down', handleMouseDown)
    canvas.on('mouse:move', handleMouseMove)
    canvas.on('mouse:up', handleMouseUp)
  }
  return (
    <div className="absolute top-0 left-0">
      <Button onClick={() => setActiveTool('select')} disabled={activeTool === 'select'}>
        select
      </Button>
      <Button onClick={() => setActiveTool('pen')} disabled={activeTool === 'pen'}>
        pen
      </Button>
      <Button onClick={() => setActiveTool('rect')} disabled={activeTool === 'rect'}>
        rect
      </Button>
    </div>
  )
}

export { ActiveTool }
