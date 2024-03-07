import React, { useState } from "react";
import _ from "lodash";
import { parseISO } from "date-fns";
import '../styles/upload.css'
import supabase from "../data/supabase";

function Upload() {
  const [isError, setIsError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();
    setSuccessMessage(null)
    const { link, name, date } = event.target;
    let errorMsg = null;

    if (_.isEmpty(link.value)) {
      errorMsg = "Please enter the link.";
    } else if (_.isEmpty(name.value)) {
      errorMsg = "Please enter the name.";
    } else if (_.isEmpty(date.value)) {
      errorMsg = "Please enter a valid date.";
    }

    if (errorMsg) {
      setIsError(errorMsg);
      return;
    } else {
      setIsLoading(true);
      try {
        // Parse the date input into a Date object
        const parsedDate = parseISO(date.value);

        // Format the date in ISO format
        const isoDate = parsedDate.toISOString();

        // Data to be inserted
        const newData = {
          name: name.value,
          src: link.value,
          date: isoDate,
        };

        // Insert data into the 'tb_images' table
        const { data, error } = await supabase
          .from("tb_images")
          .insert([newData]);

        if (error) {
          throw error;
        }
        setSuccessMessage("Data inserted successfully");
        const form = document.getElementById('image-data-form');
        form.reset()
      } catch (error) {
        console.error("Error inserting data:", error.message);
      }
      setIsLoading(false);
    }
  };
  return (
    <div className="form-container container">

    <form id="image-data-form" onSubmit={submitHandler}>
      <div className="mb-3">
        <label for="exampleInputEmail1" className="form-label">
          Link to the Picture:
        </label>
        <input
          type="text"
          name="link"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
      </div>
      <div className="mb-3">
        <label for="exampleInputPassword1" className="form-label">
          Name of Picture:
        </label>
        <input
          type="text"
          name="name"
          className="form-control"
          id="exampleInputPassword1"
        />
      </div>
      <div className="mb-3">
        <label className="form-check-label" for="exampleCheck1">
          Date:
        </label>
        <input
          type="date"
          name="date"
          className="form-control"
          id="exampleInputPassword1"
        />
      </div>
      <button type="submit" className="btn btn-primary w-100">
        {!isLoading ? "Submit" : "Saving..."}
      </button>

      {successMessage && (
        <div className="success-msg">
          {" "}
          <p className="msg">{successMessage}</p>
          <p onClick={() => setSuccessMessage(false)} className="close-btn">X</p>
        </div>
      )}
    </form>
    </div>
  );
}

export default Upload;
