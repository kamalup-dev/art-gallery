import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://irfzjowoxktrxrthxdqc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlyZnpqb3dveGt0cnhydGh4ZHFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4MDYwMjYsImV4cCI6MjAyNTM4MjAyNn0.8IDMst-h7mFIS0DcgfB0-Ry2l2rlRVmmedUdAGrlhDU"
);

function getData() {
  const [data, setData] = useState([]);

  useEffect(() => {
   

    getImageData();
  }, []);
  async function getImageData() {
    const { data } = await supabase.from("tb_images").select();
    setData(data);
  }
}

export default getData;
