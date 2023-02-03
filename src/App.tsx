import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import ColorsTable from "./components/colorsTable/ColorsTable";
import fetchProducts from "./utility/fetchProducts";
import fetchProduct from "./utility/fetchProduct";
import ColorModal from "./components/ColorModal/ColorModal";
import { IRow } from "./components/colorsTable/Row/Row";
import Loading from "./components/Loading/Loading";

export default function App() {
  const queryParameters = new URLSearchParams(window.location.search);
  const idQueryString = queryParameters.get("id");
  const idQueryNumber = Number.isNaN(Number(idQueryString))
    ? 0
    : Number(idQueryString);
  const pageQueryString = queryParameters.get("page");
  const pageQueryNumber = Number.isNaN(Number(pageQueryString))
    ? 0
    : Number(pageQueryString);
  const defaultPage = idQueryNumber ? 0 : pageQueryNumber;

  const [rows, setRows] = useState<
    "loading" | "server-error" | "bad-request" | IRow[]
  >("loading");
  const [page, setPage] = useState<number>(defaultPage);
  const [totalPages, setTotalPages] = useState(0);
  const [activeRow, setActiveRow] = React.useState<IRow | undefined>();
  const [chosenId, setChosenId] = React.useState<number | "">(
    Number(idQueryNumber)
  );

  const rowsPerPage = 5;

  const handleChooseId = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const newId = event.target.value;

    if (Number(newId) >= 0) {
      queryParameters.set("id", newId);
      queryParameters.delete("page");
      const newRelativePathQuery = `${
        window.location.pathname
      }?${queryParameters.toString()}`;

      window.history.pushState(null, "", newRelativePathQuery);
      setChosenId(Number(newId));
      setPage(0);
      setTotalPages(1);
    }

    if (!newId || newId === "0") {
      queryParameters.delete("id");
      queryParameters.set("page", String(page + 1));
      const newRelativePathQuery = `${
        window.location.pathname
      }?${queryParameters.toString()}`;
      window.history.pushState(null, "", newRelativePathQuery);
      setChosenId("");
    }
  };

  const getProducts = async () => {
    const response = chosenId
      ? await fetchProduct(chosenId)
      : await fetchProducts(page + 1);

    setRows(response?.data ?? response);
    setTotalPages(response.total_pages ?? 1);
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
    if (
      idQueryString ||
      Number.isNaN(Number(pageQueryString)) ||
      totalPages < pageQueryNumber
    ) {
      queryParameters.delete("page");
      const newRelativePathQuery = `${
        window.location.pathname
      }?${queryParameters.toString()}`;
      window.history.pushState(null, "", newRelativePathQuery);
      setPage(0);
    }
    if (Number.isNaN(Number(idQueryString))) {
      queryParameters.delete("id");
      const newRelativePathQuery = `${
        window.location.pathname
      }?${queryParameters.toString()}`;
      window.history.pushState(null, "", newRelativePathQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, chosenId]);

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
        queryParameters={queryParameters}
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
