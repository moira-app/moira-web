import { createFileRoute } from '@tanstack/react-router'
import { ChatBox } from '~widgets/ChatBox/ChatBox'
export const Route = createFileRoute('/room')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <ChatBox />
  )
}
