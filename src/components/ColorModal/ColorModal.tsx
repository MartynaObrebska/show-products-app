import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IRow } from "../colorsTable/Row/Row";

interface Props {
  onClose: () => void;
  activeRow?: IRow;
}

export default function ColorModal(props: Props) {
  const { onClose, activeRow } = props;

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: activeRow?.color,
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={!!activeRow}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h4"
          component="h2"
          sx={{ textAlign: "center" }}
        >
          {activeRow?.name.toUpperCase()}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Id: {activeRow?.id}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Hex value: {activeRow?.color}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Pantone value: {activeRow?.pantone_value}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Year: {activeRow?.year}
        </Typography>
      </Box>
    </Modal>
  );
}
