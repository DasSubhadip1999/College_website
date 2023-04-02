import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudentData } from "../redux/features/upload/uploadSlice";

const Table = () => {
  const { studentData } = useSelector((state) => state.upload);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStudentData());
  }, []);

  return (
    <div className="overflow-x-auto mx-20 mt-12">
      <table className="table w-full">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Email</th>
            <th>age</th>
            <th>Id</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {studentData.length !== 0 &&
            studentData.map((student, idx) => (
              <tr key={student.id}>
                <th>{idx + 1}</th>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.age}</td>
                <td>{student.id}</td>
              </tr>
            ))}
          {/* row 2 */}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
