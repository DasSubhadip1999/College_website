import React, { useEffect, useRef, useState } from "react";
import Button from "../shared/Button";
import Form from "../shared/Form";
import * as xlsx from "xlsx";
import { toast } from "react-toastify";
import checkObjectKeys from "../../functions/checkObjectKeys";
import {
  resetState,
  uploadStudentData,
} from "../../redux/features/upload/uploadSlice";
import { useDispatch, useSelector } from "react-redux";

const UploadForm = ({ fileDefaultState, setFileDefaultState }) => {
  const [formData, setFormData] = useState([]);
  const fileRef = useRef(null);

  const { studentData, isError, isSuccess } = useSelector(
    (state) => state.upload
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (isError && type === "studentdata/add") {
      dispatch(resetState());
      fileRef.current.files = fileDefaultState;
    }

    if (isSuccess && type === "studentdata/add") {
      toast.success("Student data uploaded");
      dispatch(resetState());
      fileRef.current.files = fileDefaultState;
    }
  }, []);

  useEffect(() => {
    setFileDefaultState(fileRef.current.files);
    // eslint-disable-next-line
  }, []);

  const onSubmitPreCheck = (data) => {
    if (!Array.isArray(data)) return toast.error("Reading a non array data");

    const allKeys = Object.keys(data[0]);

    const makeObject = (arr) => {
      let result = {};
      arr.forEach((data, idx) => (result[data] = idx + 1));
      return result;
    };
    const allKeysObj = makeObject(allKeys);

    const { status, message } = checkObjectKeys(allKeysObj);

    if (!status) {
      return toast.error(message);
    }

    dispatch(uploadStudentData(data));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!formData.length) return toast.error("Please select file");

    onSubmitPreCheck(formData);
  };

  const readUploadFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = xlsx.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json(worksheet);
        setFormData(json);
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };

  return (
    <div className="my-12">
      <Form onSubmit={onSubmit}>
        <input
          type="file"
          className="file-input file-input-bordered file-input-success w-full max-w-xs"
          accept=".xls,.xlsx"
          onChange={readUploadFile}
          ref={fileRef}
        />
        <Button text={"Upload"} type={"submit"} />
      </Form>
    </div>
  );
};

export default UploadForm;
