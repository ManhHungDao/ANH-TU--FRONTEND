import React, { useEffect, useState } from "react";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { getRelatedHandbook } from "../../../services/handbookService";
import { useNavigate } from "react-router-dom";
import "./style.scss";
const RelatedHandbook = ({ specialtyId, handbookId }) => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    const data = {
      page: 1,
      size: 5,
      specialtyId,
    };
    const res = await getRelatedHandbook(data);
    if (res && res.success) {
      setData(
        res?.handbooks
          .map((e) => ({
            id: e._id,
            image: e.image.url,
            name: e.name,
          }))
          .filter((e) => e.id !== handbookId)
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, [specialtyId, handbookId]);

  const handleClickItem = (id) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(`/handbook/${id}`);
  };
  return (
    <>
      {/* sx={{padding:"5px 20px"}} */}
      <Box p={3} sx={{ bgcolor: "#FCFAF6" }}>
        <Typography
          variant="h4"
          color="#5D5D5D"
          sx={{
            fontSize: { xs: "18px", lg: "24px" },
            fontWeight: "bold",
            padding: { lg: 2 },
            paddingBottom: 2,
          }}
        >
          Bài viết liên quan
        </Typography>
        <Stack className="realted--container__body">
          {data &&
            data.length > 0 &&
            data.map((e, index) => (
              <div key={index} className="d-flex justify-content-center">
                <div
                  className="container__body--item"
                  onClick={() => handleClickItem(e.id)}
                >
                  <img src={e.image} alt={e.name} />
                  <div className="container__body--item--title">{e.name}</div>
                </div>
              </div>
            ))}
        </Stack>
      </Box>
    </>
  );
};

export default RelatedHandbook;
