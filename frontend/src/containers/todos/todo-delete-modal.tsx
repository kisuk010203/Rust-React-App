import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Modal,
    Typography,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import { style } from "@material-ui/system";

type TodoDeleteModalProps = {
    deleteModal: boolean;
    setDeleteModal: (value: boolean) => void;
    deleteTodo: () => void;
};

export const TodoDeleteModal: React.FC<TodoDeleteModalProps> = ({
    deleteModal,
    setDeleteModal,
    deleteTodo,
}) => {
    return (
        <Dialog
            open={deleteModal}
            onClose={(_e, r) => {
                if (r != "backdropClick") setDeleteModal(false);
            }}
        >
            <DialogTitle>
                <div style={{ flex: 1 }}>
                    {"Todo Delete"}
                    <IconButton onClick={() => setDeleteModal(false)}>
                        <ClearIcon />
                    </IconButton>
                </div>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete this Todo?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    color="secondary"
                    variant="outlined"
                    onClick={deleteTodo}
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};
