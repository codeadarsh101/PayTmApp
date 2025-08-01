import { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users = () => {
  // Replace with backend call
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("https://paytmapp-jora.onrender.com/api/v1/user/bulk?filter=" + filter)

      .then((res) => {
        setUsers(res.data.user);
      });
  }, [filter]);

  return (
    <>
      <div className="font-bold mt-6 text-lg">Users List</div>
      <div className="my-2">
        <input
          onChange={(e) => {
            setFilter(e.target.value);
          }}
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-200"
        ></input>
      </div>
      <div>
        {users.map((user) => (
          <User user={user} />
        ))}
      </div>
      <Logout />
    </>
  );
};

function User({ user }) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.firstName[0]}
          </div>
        </div>
        <div className="flex flex-col justify-center h-ful">
          <div>
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center h-ful ">
        <Button
          onPress={(e) => {
            navigate("/send?id=" + user._id + "&name=" + user.firstName);
          }}
          label={"Send Money"}
        />
      </div>
    </div>
  );
}

function Logout() {
  const navigate = useNavigate();

  return (
    <div className="mt-8 flex justify-center">
     
        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/signin");
          }}
          className="w-20 bg-blue-600 hover:bg-red-700 text-white px-3 py-2 rounded"
        >
          Logout
        </button>
     
    </div>
  );
}
