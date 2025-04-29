"use client";
import React, { useEffect, useState } from "react";

const PageDashboard = () => {
  const [idEmployee, setIdEmployee] = useState("");
  useEffect(() => {
    const currentIdEmployee = localStorage.getItem("idEmployee");
    if (currentIdEmployee) {
      setIdEmployee(currentIdEmployee);
    }
  }, []);
  return <div>{idEmployee}</div>;
};

export default PageDashboard;
