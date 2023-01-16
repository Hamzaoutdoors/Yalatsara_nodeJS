const yourDate = new Date();
const today = yourDate.toISOString().split('T')[0];

export const userInputs = [
    {
      id: "username",
      label: "Username",
      type: "text",
      placeholder: "Hamza",
    },
    {
      id: "email",
      label: "Email",
      type: "mail",
      placeholder: "hamza@gmail.com",
    },
    {
      id: "phone",
      label: "Phone",
      type: "text",
      placeholder: "+212 691475161",
    },
    {
      id: "city",
      label: "city",
      type: "text",
      placeholder: "Tangier",
    },
    {
      id: "country",
      label: "Country",
      type: "text",
      placeholder: "MAR",
    },
    {
      id: "password",
      label: "Password",
      type: "password",
      placeholder: "password...",
    },
  ];
  
  export const AgencyInputs = [
    {
      id: 1,
      label: "Name",
      type: "text",
      placeholder: "Ahfad Ibn Batouta",
    },
    {
      id: 2,
      label: "About",
      type: "text",
      placeholder: "Agency's Bio",
    },
    {
      id: 3,
      label: "Category",
      type: "text",
      placeholder: "Mountains",
    },
    {
      id: 4,
      label: "City",
      type: "text",
      placeholder: "Tangier",
    },
    {
      id: 5,
      label: "Whatsapp",
      type: "text",
      placeholder: "+212 691827182",
    },
    {
      id: 5,
      label: "Instagram",
      type: "text",
      placeholder: "@ahfadibnbatouta",
    },
  ];

  export const TripInputs = [
    {
      id: "title",
      label: "Title",
      type: "text",
      placeholder: "Luxury trip",
    },
    {
      id: "destination",
      label: "Destination",
      type: "text",
      placeholder: "Beautiful destination",
    },
    {
      id: "price",
      label: "Price",
      type: "number",
      placeholder: "170",
    },
    {
      id: "maxMembers",
      label: "Max Members",
      type: "number",
      placeholder: "20",
    },
    {
      id: "dateStart",
      label: "Date Start",
      type: "date",
      placeholder: today,
    },
    {
      id: "dateEnd",
      label: "Date End",
      type: "date",
      placeholder: `${today}`,
    },
  
  ];

  