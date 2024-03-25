"use client";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import Textarea from "react-textarea-autosize";
import { CornerDownRight } from "lucide-react";
import { FormEvent, useRef, useState } from "react";
import { useEnterSubmit } from "@/lib/hooks/use-enter-submit";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const { formRef, onKeyDown } = useEnterSubmit();
  const inputRef = useRef<HTMLTextAreaElement>(null);


  const handleSubmit = async (message: string) => {
    if (!message) return;
    await handleUserMessageSubmission(message);
  };

  const handleUserMessageSubmission = async (userMessage: string): Promise<void> => {
    console.log('handleUserMessageSubmission', userMessage);
  }

  const handleFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const messageToSend = inputValue.trim();
    if (!messageToSend) return;
    setInputValue("");
    await handleSubmit(messageToSend);
  };

  return (
    <div className="fixed inset-x-0 bottom-0 w-full bg-gradient-to-b duration-300 ease-in-out animate-in dark:from-background/10 dark:from-10% peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px]] mb-4">
      <div className="mx-auto sm:max-w-2xl sm:px-4">
        <div className="px-4 py-2 space-y-4 border-t shadow-lg bg-background rounded-full sm:border md:py-4">
          <form
            ref={formRef}
            onSubmit={async (e: FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              handleFormSubmit(e);
              // setCurrentLlmResponse('');
              if (window.innerWidth < 600) {
                (e.target as HTMLFormElement)['message']?.blur();
              }
              const value = inputValue.trim();
              setInputValue("");
              if (!value) return;
            }}
          >
            <div className="relative flex flex-col w-full overflow-hidden max-h-60 grow bg-background rounded-full sm:border sm:px-2">
              <Textarea
                ref={inputRef}
                tabIndex={0}
                onKeyDown={onKeyDown}
                placeholder="Send a message."
                className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
                autoFocus
                spellCheck={false}
                autoComplete="off"
                autoCorrect="off"
                name="message"
                rows={1}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <div className="absolute right-0 top-4 sm:right-4">
                {/* Tool Tip Comes Here */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="submit"
                      size="icon"
                      disabled={inputValue === ""}
                    >
                      <CornerDownRight />
                      <span className="sr-only">Send message</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Send message</TooltipContent>
                </Tooltip>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
