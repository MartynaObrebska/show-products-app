import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import ColorsTable from "./components/colorsTable/ColorsTable";
import fetchProducts from "./utility/fetchProducts";
import fetchProduct from "./utility/fetchProduct";
import ColorModal from "./components/modal/Modal";
import { IRow } from "./components/colorsTable/row/Row";
import Loading from "./components/Loading/Loading";

export default function App() {
  const [rows, setRows] = useState<
    "loading" | "server-error" | "bad-request" | IRow[]
  >("loading");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [activeRow, setActiveRow] = React.useState<IRow | undefined>();
  const [chosenId, setChosenId] = React.useState(0);

  const rowsPerPage = 5;

  const handleChooseId = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (Number(event.target.value) >= 0)
      setChosenId(Number(event.target.value));
  };

  const getProducts = async () => {
    const response = chosenId
      ? await fetchProduct(chosenId)
      : await fetchProducts(page + 1);

    setRows(response?.data ?? response);
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
  }, [page, chosenId]);
  console.log(rows);
  if (rows === "loading") return <Loading />;

  return (
    <div className="app">
      <CssBaseline />
      <TextField
        id="outlined-basic"
        label="Id"
        variant="outlined"
        type="number"
        value={chosenId}
        onChange={handleChooseId}
        sx={{ mb: 3 }}
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
