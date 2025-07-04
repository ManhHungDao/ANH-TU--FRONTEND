import {
  Box,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import InputSelect from "../../../../components/Input/InputSelect";
import CKEditorFieldBasic from "../../../../components/Ckeditor/CKEditorFieldBasic";

export const HandbookDetail = ({
  name,
  setName,
  note,
  setNote,
  errors,
  dataSpecialty,
  specialty,
  setSpecialty,
}) => {
  return (
    <>
      <Card>
        <CardHeader title="Thông tin chung" />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Tên"
                  onChange={(e) => setName(e.target.value)}
                  required
                  value={name}
                  error={errors?.name ? true : false}
                  helperText={errors.name}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <InputSelect
                  value={specialty}
                  onChange={setSpecialty}
                  data={dataSpecialty}
                  isError={errors.selectSpecialty ? true : false}
                  errorText={
                    errors.selectSpecialty ? errors.selectSpecialty : ""
                  }
                  name="Chọn chuyên khoa"
                />
              </Grid>
              <Grid className="detail__clinic--introduce">
                <CKEditorFieldBasic
                  value={note}
                  onChange={setNote}
                  isError={errors.note ? true : false}
                  errorText={errors.note}
                  title="Ghi chú"
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};
