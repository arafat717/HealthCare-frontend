import HFileUploader from "@/components/shared/Form/HFileUploader";
import HForm from "@/components/shared/Form/HForm";
import HInput from "@/components/shared/Form/HInput";
import HModal from "@/components/shared/Modal/HModal";
import { useCreateSpecialtiesMutation } from "@/redux/api/specialtiesApi";
import { modifyPayload } from "@/utils/modifyPayload";
import { Button, Grid } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type SpecialitesProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const SpecialitesPage = ({ open, setOpen }: SpecialitesProps) => {
  const [createSpecialties] = useCreateSpecialtiesMutation();
  const handleSpecialites = async (values: FieldValues) => {
    const data = modifyPayload(values);
    try {
      const res = await createSpecialties(data);
      if (res.data?.id) {
        toast.success("Speciality Created Successfully");
      }
      setOpen(false);
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <div>
      <HModal open={open} setOpen={setOpen} title="Create a Specialty">
        <HForm onSubmit={handleSpecialites}>
          <Grid container spacing={2}>
            <Grid>
              <HInput name="title" label="Title"></HInput>
            </Grid>
            <Grid>
              <HFileUploader
                name="file"
                label="Image"
                title="Select image"
              ></HFileUploader>
            </Grid>
          </Grid>
          <Button sx={{ mt: "10px" }} type="submit">
            Create
          </Button>
        </HForm>
      </HModal>
    </div>
  );
};

export default SpecialitesPage;
