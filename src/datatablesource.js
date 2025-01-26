const formatDate = (timestamp) => {
  if (timestamp && timestamp.seconds) {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleString();
  }
  return "No data";
};

export const productColumns = [
  { field: "id", headerName: "ID", width: 80, sortable: false },
  {
    field: "name",
    headerName: "Nomi",
    width: 300,
    minWidth: 300,
  },

  {
    field: "count",
    headerName: "Miqdori",
    width: 140,
  },
  {
    field: "price",
    headerName: "Narxi",
    width: 140,
  },
  {
    field: "createdAt",
    headerName: "Qo'shilgan vaqti",
    width: 190,
    renderCell: (params) => formatDate(params.row.createdAt),
  },
  {
    field: "updatedAt",
    headerName: "Tahrirlangan vaqti",
    width: 190,
    renderCell: (params) => formatDate(params.row.updatedAt),
  },
];
