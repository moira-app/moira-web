import { useState, useEffect } from 'react'
import { Canvas } from 'fabric'
import { Button } from '~shared/ui/Button'
import { useCanvasDrawShape } from '~features/canvas/hooks/useCanvasDrawShape'
import { useHandTool } from '~features/canvas/useHandTool'

function ActiveTool({ canvas }: { canvas: Canvas | null }) {
  const [activeTool, setActiveTool] = useState<string>('select')
  const { handleDrawStart, handleDrawMove, handleDrawEnd } = useCanvasDrawShape(canvas)
  const { handlePanStart, handlePanMove, handlePanEnd } = useHandTool(canvas)

  // activeTool 변경
  useEffect(() => {
    if (!canvas) return
    switch (activeTool) {
      case 'select':
        canvas.isDrawingMode = false
        canvas.selection = true
        break

      case 'hand':
        canvas.isDrawingMode = false
        canvas.selection = false
        canvas.on('mouse:down', handlePanStart)
        canvas.on('mouse:move', handlePanMove)
        canvas.on('mouse:up', handlePanEnd)
        break

      case 'pen':
        if (canvas.freeDrawingBrush) {
          canvas.freeDrawingBrush.width = 10
          canvas.isDrawingMode = true
        }
        break

      case 'rect':
        canvas.isDrawingMode = false
        canvas.selection = false
        canvas.on('mouse:down', handleDrawStart)
        canvas.on('mouse:move', handleDrawMove)
        canvas.on('mouse:up', handleDrawEnd)
        break
    }
    return () => {
      canvas.off('mouse:down', handleDrawStart)
      canvas.off('mouse:move', handleDrawMove)
      canvas.off('mouse:up', handleDrawEnd)
      canvas.off('mouse:down', handlePanStart)
      canvas.off('mouse:move', handlePanMove)
      canvas.off('mouse:up', handlePanEnd)
    }
  }, [activeTool, canvas])

  return (
    <div className="absolute top-0 left-0">
      <Button onClick={() => setActiveTool('select')} disabled={activeTool === 'select'}>
        select
      </Button>
      <Button onClick={() => setActiveTool('hand')} disabled={activeTool === 'hand'}>
        hand
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
