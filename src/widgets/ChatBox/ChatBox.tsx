import { Input } from "~shared/ui/Input"
import { MessageBox } from "./MessageBox"
import { ScrollArea } from "~shared/ui/ScrollBar"

function ChatBox() {
    return (
    <div
        className="flex flex-col h-full md:w-[254px] md:px-[12px] lg:w-[445px] lg:px-[23px] bg-gray-500 justify-end"
    >
        <ScrollArea className="flex-1 overflow-y-auto"> 
            <MessageBox />
            <MessageBox />
            <MessageBox />
        </ScrollArea>

        <Input 
            name="sendMsg"
            type="text"
            placeholder="메세지를 입력하세요"
            className="bg-gray-300 h-[45px] my-[15px] flex-shrink-0"
        />
    </div>
    )
}

export {ChatBox}