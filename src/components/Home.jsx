import React, { useState } from "react";
import AuthWrapper from "./shared/AuthWrapper";
import UploadForm from "./upload/UploadForm";
import Table from "./Table";

const Home = () => {
  const [fileDefaultState, setFileDefaultState] = useState([]);

  return (
    <>
      <AuthWrapper>
        <UploadForm
          fileDefaultState={fileDefaultState}
          setFileDefaultState={setFileDefaultState}
        />
      </AuthWrapper>
      <Table />
    </>
  );
};

export default Home;
