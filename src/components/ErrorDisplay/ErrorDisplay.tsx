import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

interface Props {
  errorMessage: "server-error" | "bad-request";
}
export default function ErrorDisplay(props: Props) {
  const { errorMessage } = props;

  return (
    <TableRow className="app">
      <TableCell></TableCell>
      <TableCell align="center">
        {errorMessage}! code {errorMessage === "server-error" ? "5" : "4"}XX
      </TableCell>
      <TableCell></TableCell>
    </TableRow>
  );
}
