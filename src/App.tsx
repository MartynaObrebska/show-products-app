import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import ColorsTable from "./components/colorsTable/ColorsTable";
import fetchProducts from "./utility/fetchProducts";
import ColorModal from "./components/modal/Modal";
import { IRow } from "./components/colorsTable/row/Row";
import Loading from "./components/Loading/Loading";
import ErrorDisplay from "./components/ErrorDisplay/ErrorDisplay";

export default function App() {
  const [rows, setRows] = useState<
    "loading" | "server-error" | "bad-request" | IRow[]
  >("loading");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [activeRow, setActiveRow] = React.useState<IRow | undefined>();

  const rowsPerPage = 5;

  const getProducts = async () => {
    const response = await fetchProducts(page + 1);

    setRows(response.data ?? response);
    setTotalPages(response.total_pages);
  };

  const handleOpen = (
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>
  ) => {
    if (rows !== "loading" && rows !== "server-error" && rows !== "bad-request")
      setActiveRow(
        rows?.find(
          (row) =>
            row.id === Number(event.currentTarget.firstChild?.textContent)
        )
      );
  };

  const handleClose = () => {
    setActiveRow(undefined);
  };

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  if (rows === "loading") return <Loading />;
  if (rows === "server-error" || rows === "bad-request")
    return <ErrorDisplay errorMessage={rows} />;

  return (
    <div className="app">
      <CssBaseline />
      <TextField
        id="outlined-basic"
        label="Id"
        variant="outlined"
        type="number"
      />
      <ColorsTable
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        rowsPerPage={rowsPerPage}
        rows={rows}
        handleOpen={handleOpen}
      />
      {activeRow && (
        <ColorModal
          activeRow={activeRow}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        />
      )}
    </div>
  );
}
