import React, { useEffect, useState } from "react";
import axiosI from "../../Axios";

const Problems = () => {
  const [reps, setReps] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const { data } = await axiosI.get("/reportProblem/repProblems", {
          headers: { authorization: `Bearer ${token}` },
        });
        setReps(data);
        console.log(data);
      } catch (e) {
        alert(e?.response?.data || "Something went wrong");
      }
    };
    fetchRatings();
  }, [token]);

  return (
    <div className="flex flex-col w-full gap-2 p-2">
      {reps.length > 0 && (
        <span className="text-xl text-left mt-4 font-bold">
          Problem Reports
        </span>
      )}
      <div className="grid grid-cols-3 gap-2 w-full h-max">
        {reps.map((rep) => (
          <div
            key={rep?._id}
            className="w-full h-min flex flex-col justify-between p-3 border-2 border-black"
          >
            <span className="text-lg">
              ReportedBy:
              <b>
                {rep.ratedBy?.username
                  ? rep.ratedBy?.username
                  : rep.ratedBy?.dealershipName}
              </b>
            </span>
            <b>{rep?.problem}</b>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Problems;
