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
  const emptyRowsNumber = rowsPerPage - rows.length;
  return (
    <TableContainer component={Paper}>
      <Table aria-label="table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Id</TableCell>
            <TableCell>Color name</TableCell>
            <TableCell align="right">Year</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: IRow) => (
            <Row key={row.id} id={row.id} row={row} onClick={handleOpen} />
          ))}
          {emptyRowsNumber > 0 && (
            <TableRow style={{ height: 53 * emptyRowsNumber }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePaginationActions
              page={page}
              onPageChange={handleChangePage}
              totalPages={totalPages}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
