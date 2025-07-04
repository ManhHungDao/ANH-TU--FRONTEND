import {
  Box,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import AutocompleteAddress from "../../../../components/Input/AutocompleteAddress";
import CKEditorFieldBasic from "../../../../components/Ckeditor/CKEditorFieldBasic";

export const ClinicDetail = ({
  name,
  setName,
  introduce,
  setIntroduce,
  address,
  setAddress,
  errors,
  setCoordinates,
  setProvince,
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
                <AutocompleteAddress
                  isErr={errors?.address ? true : false}
                  errName={errors?.address ? errors?.address : ""}
                  setAddress={setAddress}
                  setProvince={setProvince}
                  setCoordinates={setCoordinates}
                  address={address}
                />
              </Grid>
              <Grid className="detail__clinic--introduce">
                <CKEditorFieldBasic value={introduce} onChange={setIntroduce} 
                 isError={errors.introduce ? true : false}
                 errorText={errors.introduce}
                 title="Giới thiệu"
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};
