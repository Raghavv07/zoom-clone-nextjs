"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { avatarImages } from "@/constants";
import { useToast } from "./ui/use-toast";

interface MeetingCardProps {
  title: string;
  date: string;
  icon: string;
  isPreviousMeeting?: boolean;
  buttonIcon1?: string;
  buttonText?: string;
  handleClick: () => void;
  link: string;
}

const MeetingCard = ({
  icon,
  title,
  date,
  isPreviousMeeting,
  buttonIcon1,
  handleClick,
  link,
  buttonText,
}: MeetingCardProps) => {
  const { toast } = useToast();

  return (
    <section className="flex min-h-[220px] sm:min-h-[258px] w-full flex-col justify-between rounded-[16px] bg-dark-1 p-5 sm:py-8 sm:px-6 xl:max-w-[568px] shadow-lg">
      <article className="flex flex-col gap-4 sm:gap-5">
        <Image src={icon} alt="upcoming" width={28} height={28} className="size-7" />
        <div className="flex justify-between">
          <div className="flex flex-col gap-1.5 sm:gap-2">
            <h1 className="text-xl sm:text-2xl font-bold truncate max-w-[280px] sm:max-w-none">{title}</h1>
            <p className="text-sm sm:text-base font-normal text-sky-2">{date}</p>
          </div>
        </div>
      </article>
      <article className={cn("flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative pt-4", {})}>
        <div className="relative flex w-full max-sm:hidden">
          {avatarImages.map((img, index) => (
            <Image
              key={index}
              src={img}
              alt="attendees"
              width={40}
              height={40}
              className={cn("rounded-full", { absolute: index > 0 })}
              style={{ top: 0, left: index * 28 }}
            />
          ))}
          <div className="flex-center absolute left-[136px] size-10 rounded-full border-[5px] border-dark-3 bg-dark-4 text-xs font-semibold">
            +5
          </div>
        </div>
        {!isPreviousMeeting && (
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button onClick={handleClick} className="rounded-lg bg-blue-1 px-5 h-10 w-full sm:w-auto text-sm sm:text-base font-semibold">
              {buttonIcon1 && (
                <Image src={buttonIcon1} alt="feature" width={18} height={18} className="size-4 mr-1" />
              )}
              {buttonText}
            </Button>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(link);
                toast({
                  title: "Link Copied",
                });
              }}
              className="bg-dark-4 px-5 h-10 w-full sm:w-auto text-sm sm:text-base font-semibold hover:bg-dark-3"
            >
              <Image
                src="/icons/copy.svg"
                alt="feature"
                width={18}
                height={18}
                className="size-4 mr-1"
              />
              Copy Link
            </Button>
          </div>
        )}
      </article>
    </section>
  );
};

export default MeetingCard;
