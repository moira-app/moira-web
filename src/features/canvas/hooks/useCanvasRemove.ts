import { useCallback, useEffect } from 'react'
import { Canvas } from 'fabric'

function useCanvasRemove({ canvas }: { canvas: Canvas | null }) {
  const handleKeyPress = useCallback((event) => {
    console.log(event.key)
  }, [])

  useEffect(() => {
    canvas.on('', handleKeyPress)
  }, [handleKeyPress])
}

export { useCanvasRemove }
