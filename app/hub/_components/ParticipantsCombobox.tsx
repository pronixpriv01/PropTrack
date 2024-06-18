"use client"

import DynamicCombobox from './DynamicCombox';

const ParticipantsCombobox = ({ participants, selectedUser, onChange }:  ScheduleComboboxProps) => {
    const options: DynamicComboboxOption<string>[] = participants.map((participant) => ({
        value: participant,
        label: participant,
    }))

    return (
        <DynamicCombobox
            options={options}
            value={selectedUser}
            onChange={onChange}
            placeholder="Teilnehmer auswählen..."
        />
    )
}

export default ParticipantsCombobox;