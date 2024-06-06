const dummyScheduleItems: ScheduleItemsProps[] = [
  {
      date: new Date().toISOString().split('T')[0], // Heute
      events: [
          {
              time: "10:00",
              title: "Team Meeting",
              participants: ["John", "Alice", "Bob"],
              category: "Meeting",
              type: "Monthly Meeting"
          },
          {
              time: "01:00",
              title: "Client Interview",
              participants: ["Emily", "David"],
              category: "Interview",
              type: "Mid-year discussion"
          }
      ]
  },
  {
      date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Morgen
      events: [
          {
              time: "09:00",
              title: "Project Discussion",
              participants: ["Sophia", "William"],
              category: "Discussion",
              type: "Monthly Meeting"
          },
          {
              time: "11:00",
              title: "Budget Review",
              participants: ["Jane", "Michael"],
              category: "Meeting",
              type: "Mid-year discussion"
          }
      ]
  },
  {
      date: new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0], // Übermorgen
      events: [
          {
              time: "08:00",
              title: "HR Meeting",
              participants: ["Lucas", "Olivia"],
              category: "Meeting",
              type: "Other"
          },
          {
              time: "03:00",
              title: "Strategy Session",
              participants: ["Liam", "Emma"],
              category: "Discussion",
              type: "Other"
          }
      ]
  }
];

export default dummyScheduleItems;
