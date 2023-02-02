import { KeyboardArrowRight, KeyboardArrowLeft } from "@mui/icons-material";
import { IconButton, TableCell, useTheme } from "@mui/material";

interface TablePaginationActionsProps {
  page: number;
  totalPages: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
  colSpan: number;
}

export function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { page, totalPages, onPageChange } = props;

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  return (
    <TableCell colSpan={3} align="center">
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page + 1 === totalPages}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
    </TableCell>
  );
}
