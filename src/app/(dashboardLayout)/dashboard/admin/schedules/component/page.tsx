import HDatePicker from "@/components/shared/Form/HDatePicker";
import HForm from "@/components/shared/Form/HForm";
import HInput from "@/components/shared/Form/HInput";
import HTimePicker from "@/components/shared/Form/HTimePicker";
import HModal from "@/components/shared/Modal/HModal";
import { useCreateScheduleMutation } from "@/redux/api/scheduleApi";
import { dateFormatter } from "@/utils/dateFormatter";
import { timeFormatter } from "@/utils/timeFormatter";
import { Button, Grid } from "@mui/material";
import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ShedulesModal = ({ open, setOpen }: TProps) => {
  const [createSchedule] = useCreateScheduleMutation();
  const handleSubmit = async (values: FieldValues) => {
    values.startDate = dateFormatter(values.startDate);
    values.endDate = dateFormatter(values.endDate);
    values.startTime = timeFormatter(values.startTime);
    values.endTime = timeFormatter(values.endTime);
    console.log(values.startTime);
    try {
      const res = await createSchedule(values);
      console.log(res);
      if (res?.data?.length) {
        toast.success("Schedule created successfully!!!");
        setOpen(false);
      }
    } catch (err: any) {
      console.error(err);
    }
  };
  return (
    <HModal open={open} setOpen={setOpen} title="Schedules For Doctor">
      <HForm onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid>
            <HDatePicker name="startDate" label="Start Date"></HDatePicker>
          </Grid>
          <Grid>
            <HDatePicker name="endDate" label="End Date"></HDatePicker>
          </Grid>
          <Grid>
            <HTimePicker name="startTime" label="Start Time"></HTimePicker>
          </Grid>
          <Grid>
            <HTimePicker name="endTime" label="End Time"></HTimePicker>
          </Grid>
        </Grid>
        <Button type="submit" sx={{ mt: "10px" }}>
          Create
        </Button>
      </HForm>
    </HModal>
  );
};

export default ShedulesModal;
