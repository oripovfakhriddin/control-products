const formatDate = (timestamp) => {
  if (timestamp && timestamp.seconds) {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleString();
  }
  return "No data";
};

export const productColumns = [
  {
    field: "tr",
    headerName: "T/R",
    width: 50,
    sortable: false,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "name",
    headerName: "Nomi",
    width: 300,
    minWidth: 300,
  },

  {
    field: "count",
    headerName: "Miqdori",
    width: 180,
    headerAlign: "center",
    renderCell: (params) =>
      `${params.row.count.count} ${params.row.count.unity}`,
  },
  {
    field: "price",
    headerName: "Narxi",
    width: 180,
    headerAlign: "center",
    renderCell: (params) =>
      `${params.row.price.price} ${params.row.price.unity}`,
  },
  {
    field: "createdAt",
    headerName: "Qo'shilgan vaqti",
    width: 190,
    headerAlign: "center",
    align: "center",
    renderCell: (params) => formatDate(params.row.createdAt),
  },
  {
    field: "updatedAt",
    headerName: "Tahrirlangan vaqti",
    width: 190,
    headerAlign: "center",
    align: "center",
    renderCell: (params) => formatDate(params.row.updatedAt),
  },
];
