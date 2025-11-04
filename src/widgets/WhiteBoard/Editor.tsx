import { useRef, useState, useEffect, useCallback } from 'react'
import { ActiveSelection, Canvas, FabricObject, PencilBrush, type TPointerEventInfo } from 'fabric'
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
      ;(async () => {
        await newCanvas.dispose()
      })()
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
    (opt: TPointerEventInfo<WheelEvent>) => {
      if (!canvas) return
      const e = opt.e
      const delta = e.deltaY
      const cur = canvas.getScenePoint(e)
      let scale = canvas.getZoom()
      scale *= 0.999 ** delta
      if (scale > 10) scale = 10
      if (scale < 0.1) scale = 0.1
      canvas.zoomToPoint(cur, scale)
      opt.e.preventDefault()
      opt.e.stopPropagation()
    },
    [canvas]
  )

  useEffect(() => {
    if (!canvas) return
    canvas.on('mouse:wheel', handleZoom)

    return () => canvas.off('mouse:wheel', handleZoom)
  }, [canvas])

  // 삭제 이벤트 연결
  const handleRemove = useCallback(
    (e: KeyboardEvent) => {
      if (!canvas) return
      if (e.key === 'Delete' || e.key === 'Backspace') {
        const active = canvas.getActiveObject() as FabricObject | ActiveSelection | null
        if (!active) return
        if (active && active.type === 'activeselection') {
          // 여러개 선택 시
          const selection = active as ActiveSelection
          selection.forEachObject((obj: FabricObject) => canvas.remove(obj))
          canvas.discardActiveObject()
        } else {
          canvas.remove(active)
        }
        canvas.requestRenderAll()
      }
    },
    [canvas]
  )

  useEffect(() => {
    // 전역 키 이벤트 등록
    document.addEventListener('keydown', handleRemove)
    return () => {
      document.removeEventListener('keydown', handleRemove)
    }
  }, [canvas])

  return (
    <div>
      <canvas ref={fabricCanvasRef} />
      <ActiveTool canvas={canvas} />
    </div>
  )
}

export { Editor }
