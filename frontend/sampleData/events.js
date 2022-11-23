module.exports = {
  events:
    [
      {
        eventId: 23,
        hostUsername: 'CarlTheCorgi',
        eventDate: new Date(),
        eventTitle: 'Corgi Day',
        eventDescription: 'Annual meeting for Corgis to meet and hang out!',
        eventLocation: [ 37.797256944027055, -122.2601061225914 ],
        attendeeIds: [ 2, 5, 6, 7, 123, 8 ]
      },
      {
        eventId: 30,
        hostUsername: 'HelmetTheHusky',
        eventDate: new Date(),
        eventTitle: 'Dogs & Daiquiris',
        eventDescription: 'Drinks at the local dog-friendly brewery',
        eventLocation: [ 37.81279201150522, -122.26681332716669 ],

        attendeeIds: [ 123, 8, 9, 10, 11, 13 ]
      }
    ],

  userData: [
    {
      id: 1,
      dog_name: 'Luffy',
      breed: 'Corgi',
      size: 'small',
      energy: 'high',
      people_friendly: true,
      dog_friendly: true,
      bio: 'Sploot',
      photos: [
        'https://images.unsplash.com/photo-1546975490-a79abdd54533?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Y29yZ2l8ZW58MHx8MHx8&auto=format&fit=crop&w=700&q=60',
        'https://images.unsplash.com/photo-1519098901909-b1553a1190af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80',
        'https://images.unsplash.com/photo-1612536057832-2ff7ead58194?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80',
        'https://images.unsplash.com/photo-1597633611385-17238892d086?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      ],
    }
  ],
}