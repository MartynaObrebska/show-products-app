import * as React from "react";
import { TableCell, TableRow } from "@mui/material";

export interface IRow {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value: string;
}

interface Props {
  row: IRow;
  onClick: (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => void;
  id: number;
}

export default function Row(props: Props) {
  const { row, onClick } = props;

  return (
    <TableRow
      onClick={onClick}
      sx={{
        "& > *": {
          borderBottom: 0,
          backgroundColor: row.color,
          cursor: "pointer",
        },
      }}
    >
      <TableCell component="th" scope="row">
        {row.id}
      </TableCell>
      <TableCell>{row.name.toUpperCase()}</TableCell>
      <TableCell align="right">{row.year}</TableCell>
    </TableRow>
  );
}
