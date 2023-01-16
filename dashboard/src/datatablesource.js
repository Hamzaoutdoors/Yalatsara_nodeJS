import * as React from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {
  useGridApiContext,
} from '@mui/x-data-grid';

export const userColumns = [
  {
    field: "_id",
    headerName: "Id",
    width: 180,
    renderCell: (params) => {
      return (
        <div>
          <span style={{ fontSize: '0.7rem' }}>{params.row._id}</span>
        </div>
      );
    },
  },
  {
    field: "user",
    headerName: "User",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "createdAt",
    headerName: "dateCreated",
    type: "date",
    valueFormatter: params => new Date(params?.value).toLocaleString(),
    width: 180,
  },
  {
    field: "email",
    headerName: "Email",
    width: 150,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 100,
  },
  {
    field: "country",
    headerName: "Country",
    width: 80,
  },
  {
    field: "city",
    headerName: "City",
    width: 80,
  },
  /*  {
     field: "status",
     headerName: "Status",
     width: 160,
     renderCell: (params) => {
       return (
         <div className={`cellWithStatus ${params.row.status}`}>
           {params.row.status}
         </div>
       );
     },
   }, */
];

export const agencyColumn = [
  {
    field: "_id",
    headerName: "Id",
    width: 180,
    renderCell: (params) => {
      return (
        <div>
          <span style={{ fontSize: '0.7rem' }}>{params.row._id}</span>
        </div>
      );
    },
  },
  {
    field: "agency",
    headerName: "Agency",
    width: 180,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.logo || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar" />
          {params.row.name}
        </div>
      );
    },
  },
  {
    field: "contacts",
    headerName: "Contacts",
    width: 180,
    renderCell: (params) => {
      return (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: '0.6rem' }}>Whatsapp: {params.row.contacts.whatsapp}</span>
          <span style={{ fontSize: '0.6rem' }}>Instagram: {params.row.contacts.instagram}</span>
        </div>
      );
    },
  },
  {
    field: "city",
    headerName: "City",
    width: 80,
  },
  {
    field: "cheapest",
    headerName: "Cheapest trip",
    width: 80,
  },
  {
    field: "cat",
    headerName: "Category",
    width: 150,
  },
  /*  {
     field: "status",
     headerName: "Status",
     width: 160,
     renderCell: (params) => {
       return (
         <div className={`cellWithStatus ${params.row.status}`}>
           {params.row.status}
         </div>
       );
     },
   }, */
];

export const tripColumn = [
  {
    field: "_id",
    headerName: "Id",
    width: 180,
    renderCell: (params) => {
      return (
        <div>
          <span style={{ fontSize: '0.7rem' }}>{params.row._id}</span>
        </div>
      );
    },
  },
  {
    field: "trip",
    headerName: "Trip",
    width: 300,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.images[0] || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar" />
          {params.row.title}
        </div>
      );
    },
  },
  {
    field: "destination",
    headerName: "Destination",
    width: 180,
  },
  {
    field: "price",
    headerName: "Price",
    width: 100,
  },
  {
    field: "availableSeats",
    headerName: "Available Places",
    width: 100,
  },
  {
    field: "dateStart",
    headerName: "Date Start",
    valueFormatter: params => new Date(params?.value).toLocaleString().slice(0, 10),
    width: 100,
  },
  {
    field: "dateEnd",
    headerName: "Date End",
    valueFormatter: params => new Date(params?.value).toLocaleString().slice(0, 10),
    width: 100,
  },
  {
    field: "featured",
    headerName: "Type",
    width: 100,
    renderCell: (params) => {
      return (
        <div className={params.row.featured ? "cellWithStatus featured" : `cellWithStatus ${params.row.status}`}>
          featured
        </div>
      );
    },
  },
];

function SelectEditInputCell(props) {
  const { id, value, field } = props;
  const apiRef = useGridApiContext();

  const handleChange = async (event) => {
    await apiRef.current.setEditCellValue({ id, field, value: event.target.value });
    apiRef.current.stopCellEditMode({ id, field });
  };

  return (
    <Select
      value={value}
      onChange={handleChange}
      size="small"
      sx={{ height: 1 }}
      native
      autoFocus
      style={{width: '100%'}}
    >
      {
        status.map(item =>
          <option key={item.id} value={item.status}>{item.status}</option>
        )}
    </Select>
  );
}

const renderSelectEditInputCell = (params) => {
  return <SelectEditInputCell {...params} />;
};

const status = [
  {
    id: 1,
    status: 'pending',
  },
  {
    id: 2,
    status: 'failed',
  },
  {
    id: 3,
    status: 'paid',
  },
  {
    id: 4,
    status: 'accepted',
  },
  {
    id: 5,
    status: 'canceled',
  },
];


export const ReservationColumn = [
  {
    field: "_id",
    headerName: "Id",
    width: 180,
    renderCell: (params) => {
      return (
        <div>
          <span style={{ fontSize: '0.7rem' }}>{params.row._id}</span>
        </div>
      );
    },
  },
  {
    field: "numOfPlaces",
    headerName: "Nb. places",
    width: 100,
  },
  {
    field: "total",
    headerName: "Total Reservation (DH)",
    width: 200,
  },
  {
    field: "paymentIntentId",
    headerName: "Payment Intent",
    width: 200,
  },
  {
    field: "status",
    headerName: "Status",
    renderEditCell: renderSelectEditInputCell,
    editable: true,
    width: 150,
    type: "singleSelect",
    valueOptions: ['pending', 'failed', 'paid', 'accepted', 'canceled'],
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];