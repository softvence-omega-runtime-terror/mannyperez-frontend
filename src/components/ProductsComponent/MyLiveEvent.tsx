import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import PrimaryButton from "@/reuseableComponents/PrimaryButton";

interface LiveEventCardProps {
  event?: {
    id: string;
    title: string;
    subtitle: string;
    imageUrl: string;
    promoTitle: string;
    promoSubtitle: string;
    startsIn: string;
    expectedViewers: string;
    duration: string;
    interestedCount: number;
    hostAvatar?: string;
    hostName?: string;
  };
  onManageSlot?: () => void;
  onGoLive?: () => void;
}

const defaultEvent = {
  id: "1",
  title: "My Live Event",
  subtitle: "Scheduled for today",
  imageUrl:
    "https://images.pexels.com/photos/1191710/pexels-photo-1191710.jpeg?auto=compress&cs=tinysrgb&w=600",
  promoTitle: "DTF Vinyl Mega Sale",
  promoSubtitle: "Up to 50% off selected items",
  startsIn: "Starts in 2h 16m",
  expectedViewers: "150+",
  duration: "2 hours",
  interestedCount: 47,
  hostAvatar:
    "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100",
  hostName: "Event Host",
};

export function MyLiveEvent({
  event = defaultEvent,
}: // onManageSlot,
// onGoLive
LiveEventCardProps) {
  return (
    <Card className="w-full shadow-md overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="sm:flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={event.hostAvatar} alt={event.hostName} />
              <AvatarFallback>
                {event.hostName?.charAt(0) || "H"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-base">{event.title}</h3>
              <p className="text-sm text-muted-foreground">{event.subtitle}</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-sm bg-accent/10 px-5 py-2 rounded-xl font-medium text-pink-600">
              {event.startsIn}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-8">
        <div className="relative rounded-lg overflow-hidden aspect-[2/1]">
          <img
            src={event.imageUrl}
            alt={event.promoTitle}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-10 left-10 text-white space-y-2">
            <h5 className="">{event.promoTitle}</h5>
            <p className="text-sm">{event.promoSubtitle}</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 py-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-between w-full border border-border px-4 py-2 rounded-xl">
              <p className="text-lg">Expected Viewers</p>
              <p className="font-semibold">{event.expectedViewers}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-between w-full border border-border px-4 py-2 rounded-xl">
              <p className="text-lg">Duration</p>
              <p className="font-semibold">{event.duration}</p>
            </div>
          </div>
        </div>
        <hr className="border-border" />
        <div className="sm:flex items-center justify-between pt-2 space-y-4 sm:space-y-0">
          <p className="text-sm">{event.interestedCount} people interested</p>
          <div className="flex gap-2 items-center">
            <PrimaryButton
              type="Outline"
              title="Manage Slot"
              className="border-none font-semibold text-sm lg:text-lg"
            />
            <PrimaryButton
              type="Primary"
              title="Go Live Now"
              className="px-7 text-sm lg:text-lg"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
