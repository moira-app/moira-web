import { createFileRoute } from '@tanstack/react-router'
import { Editor } from '~widgets/WhiteBoard/Editor'

export const Route = createFileRoute('/board')({
  component: RouteComponent
})

function RouteComponent() {
  return <Editor />
}
