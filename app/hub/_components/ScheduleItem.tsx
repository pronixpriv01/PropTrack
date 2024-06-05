const ScheudleItem = ({ time, title, participants }: ScheduleEventProps) => {
    return (
        <div className="schedule-item">
            <div className="schedule-time">{time}</div>
            <div className="schedule-details">
                <div className="schedule-title">{title}</div>
                {participants && participants.length > 0 && (
                    <div className="schedule-participants">{participants.join(", ")}</div>
                )}
            </div>
        </div>
    );
};

export default ScheudleItem;