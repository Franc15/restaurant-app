import axios from "axios";

export default axios.create({
  baseURL: "https://api.yelp.com/v3/businesses",
  headers: {
    Authorization:
      "Bearer ok_uyPQl34r49u0WEYuAF2BRV2bLOv_cL5uAHxDdqdWdvdWhYV3DvLCD_Cpdk6Xow5j-91cXnjvpplLJ3JbbBqf7gIw5DGEYjyR82s7ZeS-GRlK8YQ0_PnekopfxZHYx",
  },
});
