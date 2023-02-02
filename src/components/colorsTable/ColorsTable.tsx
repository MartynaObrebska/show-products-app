import Row, { IRow } from "./row/Row";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  Paper,
} from "@mui/material";
import { TablePaginationActions } from "./TablePaginationActions/TablePaginationAction";
import ErrorDisplay from "../ErrorDisplay/ErrorDisplay";

interface Props {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  rowsPerPage: number;
  rows: any;
  totalPages: number;
  handleOpen: (
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>
  ) => void;
}
export default function ColorsTable(props: Props) {
  const { page, setPage, rowsPerPage, totalPages, rows, handleOpen } = props;
  if (rows === "loading") return <></>;
  // Avoid a layout jump when reaching the last page with empty rows.

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };
  const emptyRowsNumber =
    rows === "server-error" || rows === "bad-request"
      ? rowsPerPage - 1
      : rowsPerPage - rows.length;
  return (
    <TableContainer component={Paper}>
      <Table aria-label="table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Color name</TableCell>
            <TableCell align="right">Year</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows === "server-error" || rows === "bad-request" ? (
            <ErrorDisplay errorMessage={rows} />
          ) : (
            rows.map((row: IRow) => (
              <Row key={row.id} id={row.id} row={row} onClick={handleOpen} />
            ))
          )}
          {emptyRowsNumber > 0 && (
            <TableRow style={{ height: 52 * emptyRowsNumber }}>
              <TableCell colSpan={3} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePaginationActions
              page={page}
              onPageChange={handleChangePage}
              totalPages={totalPages}
              colSpan={3}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
