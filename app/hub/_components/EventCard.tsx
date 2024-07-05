import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { formatDateTime } from "@/lib/utils";
import { BellIcon, CalendarCheck2, ClipboardCheckIcon, Clock, UsersIcon, CheckCircle, AlertCircle, PlusCircleIcon } from "lucide-react";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import ParticipantItem from "./EventCardParticipantItem";
import { CardWrapper } from "@/components/auth/CardWrapper";
import EventForm from "./EventForm/EventForm";

export const EventCard = ({ scheduleItem }: EventCardProps) => {
  if (!scheduleItem) return null;

  const [time, setTime] = useState<string>(scheduleItem ? scheduleItem.time : "");
  const [participants, setParticipants] = useState<string[]>(scheduleItem ? scheduleItem.participants : []);
  const [description, setDescription] = useState<string>("");

  const formattedTime = typeof scheduleItem.time === 'string' ? scheduleItem.time : formatDateTime(scheduleItem.time).dateTime;

  const handleAddParticipant = () => {
    const newParticipant = prompt("Gebe Teilnehmer ID an:");
    if (newParticipant) {
      setParticipants([...participants, newParticipant]);
    }
  };

  const handleSave = () => {
    console.log({
      time,
      participants,
      description,
    });
  };

  const participantsToShow = scheduleItem.participants.slice(0, 2);
  const additionalParticipants = scheduleItem.participants.slice(2);

  return (
    <Tabs defaultValue="infos" className="max-w-[450px]">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="infos">Infos</TabsTrigger>
        <TabsTrigger value="tasks">Tasks</TabsTrigger>
        <TabsTrigger value="notifications">Benachrichtigungen</TabsTrigger>
        <TabsTrigger value="demo">Demo</TabsTrigger>
      </TabsList>
      <TabsContent value="infos">
        <Card>
          <CardContent className="space-y-2 mt-4">
            <div className="p-4">
              <div className="flex justify-between items-center space-x-2 mb-4">
                <div className="flex items-center gap-2">
                  <Clock />
                  <p className="text-sm">Datum</p>
                </div>
                <div className="text-sm">{formattedTime}</div>
                <Button variant="outline" className="bg-gray-200 h-[25px]" onClick={() => setTime(prompt("Enter new time:") || time)}>
                  <p>Zeit Hinzufügen</p>
                </Button>
              </div>
              <div className="flex items-center space-x-2 mb-2">
                <UsersIcon />
                <span className="text-sm ">Teilnehmer</span>
              </div>
              {scheduleItem.participants.length === 0 ? (
                <div className="flex items-center justify-center mt-4">
                  <Button onClick={handleAddParticipant}>Teilnehmer hinzufügen</Button>
                </div>
              ) : (
                <ScrollArea className="w-full h-[125px] pt-2 whitespace-nowrap rounded-md bg-inherit">
                  {scheduleItem.participants.map((participant, index) => (
                    <ParticipantItem
                      key={index}
                      participant={participant}
                      email="mustermail@root.de" //TODO email abfragen
                    />
                  ))}
                  <div className="flex justify-center">
                    <Button className="flex w-auto gap-2 my-2" variant="ghost">
                      <PlusCircleIcon />
                      Teilnehmer hinzufügen
                    </Button>
                  </div>
                </ScrollArea>
              )}
              <div className="flex items-center justify-between space-x-2 mt-4">
                <CalendarCheck2 />
                <a href="event/link" className="text-cyan-600" target="_blank" rel="noopener noreferrer">
                  <p className="text-sm">Event Link</p>
                </a>
                <Button className="h-[25px]" variant="outline">
                  <p className="text-sm">Link Kopieren</p>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="tasks">
        <Card>
          <CardHeader>
            <CardTitle>Aufgaben</CardTitle>
            <CardDescription>Verwalte deine Aufgaben für dieses Event.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="task-name">Aufgabe</Label>
              <Input id="task-name" type="text" placeholder="Neue Aufgabe eingeben" />
            </div>
            <Button onClick={() => console.log('Aufgabe hinzufügen')}>Aufgabe Hinzufügen</Button>
            <div className="space-y-1 mt-4">
              <CheckCircle className="inline-block" />
              <span className="text-sm ml-2">Aufgabe 1</span>
            </div>
            <div className="space-y-1 mt-4">
              <CheckCircle className="inline-block" />
              <span className="text-sm ml-2">Aufgabe 2</span>
            </div>
            {/* Weitere Aufgaben hier hinzufügen */}
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="notifications">
        <Card>
          <CardHeader>
            <CardTitle>Benachrichtigungen</CardTitle>
            <CardDescription>Verwalte deine Benachrichtigungen für dieses Event.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="notification-email">Email Benachrichtigungen</Label>
              <Input id="notification-email" type="email" placeholder="Email Adresse eingeben" />
            </div>
            <Button onClick={() => console.log('Email Benachrichtigung hinzufügen')}>Email Hinzufügen</Button>
            <div className="space-y-1 mt-4">
              <BellIcon className="inline-block" />
              <span className="text-sm ml-2">Benachrichtigung 1</span>
            </div>
            <div className="space-y-1 mt-4">
              <BellIcon className="inline-block" />
              <span className="text-sm ml-2">Benachrichtigung 2</span>
            </div>
            {/* Weitere Benachrichtigungen hier hinzufügen */}
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="demo">
        <Card>
          <CardContent>
            <EventForm users={[]}/>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
