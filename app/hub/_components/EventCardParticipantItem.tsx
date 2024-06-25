import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ParticipantItemProps {
    participant: string;
    email: string;
}

const ParticipantItem = ({ participant, email }: ParticipantItemProps) => {
    return (
        <div className="flex items-center space-x-4 mb-4 ml-3 border-x-zinc-200 border-l pl-4">
            <Avatar className="shadow-md inline-flex h-[24px] w-[24px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
                <AvatarImage src="icons/user.svg" alt={participant}/>
                <AvatarFallback>{participant[0]}</AvatarFallback>
            </Avatar>
            <div>
                <p className="text-sm">{participant}</p>
                <p className="text-sm">{email}</p>
            </div>
        </div>
    )
};

export default ParticipantItem;