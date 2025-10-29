import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
});

export type ColumnFormValues = z.infer<typeof taskSchema>;

interface AddColumnModalProps {
  open: boolean;
  boardId: string;
  onClose: () => void;
  onSubmit: (data: ColumnFormValues) => void;
}

export const AddColumnModal = ({
  open,
  boardId,
  onClose,
  onSubmit,
}: AddColumnModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ColumnFormValues>({
    resolver: zodResolver(taskSchema),
  });

  const handleFormSubmit = (data: ColumnFormValues) => {
    onSubmit(data);
    reset();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      slotProps={{
        paper: {
          sx: {
            backgroundColor: "#2c2c37",
            color: "#fff",
            border: "1px solid #6360c7",
          },
        },
      }}
    >
      <DialogTitle>Create New Column</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          onSubmit={handleSubmit(handleFormSubmit)}
          sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            {...register("title")}
            error={!!errors.title}
            helperText={errors.title?.message}
            sx={{
              input: { color: "#fff" },
              label: { color: "#ccc" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#555" },
                "&:hover fieldset": { borderColor: "#888" },
                "&.Mui-focused fieldset": { borderColor: "#fff" },
              },
            }}
          />

          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            minRows={3}
            {...register("description")}
            error={!!errors.description}
            helperText={errors.description?.message}
            sx={{
              input: { color: "#fff" },
              label: { color: "#ccc" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#555" },
                "&:hover fieldset": { borderColor: "#888" },
                "&.Mui-focused fieldset": { borderColor: "#fff" },
              },
            }}
          />

          <DialogActions sx={{ px: 0 }}>
            <Button onClick={onClose} color="inherit">
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Add Column
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
