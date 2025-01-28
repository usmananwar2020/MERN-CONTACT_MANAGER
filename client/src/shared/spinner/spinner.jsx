import React, { useEffect } from "react";

import { CircularProgress } from "@mui/material";

export const Spinner = ({ size, isLoading, classname }) => {
  var _size = 25;
  switch (size) {
    case "small":
      _size = 25;
      break;

    case "medium":
      _size = 50;
      break;

    case "large":
      _size = 80;
      break;

    default:
      _size = 15;
      break;
  }
  return isLoading ? (
    <CircularProgress
      className={`mx-auto ${classname}`}
      color="inherit"
      size={_size}
    />
  ) : (
    <div className="hidden"></div>
  );
};
