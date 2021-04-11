import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import "../assets/css/loading.css";

export default function LoadingIndicator() {
  return (
    <div class="box">
      <div class="loading-indicator">
        <CircularProgress />
      </div>
    </div>
  );
}
