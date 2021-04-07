import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
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
