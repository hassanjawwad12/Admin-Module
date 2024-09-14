
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Auth/Login";
import Management from "./Manage/Management";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={Login()} />
            <Route path="manage" element={<Management />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
