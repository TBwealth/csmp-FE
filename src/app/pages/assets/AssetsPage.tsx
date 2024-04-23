import React from "react";
import { Navigate, Route, Routes, Outlet } from "react-router-dom";
import Assets from "./Assets";
import AssetDetails from "./AssetDetails";

const AssetsPage = () => {
  return (
    <Routes>
      <Route
        element={
          <>
            <Outlet />
          </>
        }
      >
        <Route path="assets-list" element={<Assets />} />
        <Route path="assets-list/:id" element={<AssetDetails />} />
        <Route index element={<Navigate to="/assets/assets-list" />} />
      </Route>
    </Routes>
  );
};

export default AssetsPage;
