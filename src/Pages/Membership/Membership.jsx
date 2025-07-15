import { Link, Navigate } from "react-router";
import Payment from "./Payment/Payment";
// import useAuth from "../../hooks/useAuth";

const Membership = () => {
  return (
    <div className="w-11/12 mx-auto my-10">
      <h2 className="text-2xl font-bold mb-4">Become a Member</h2>
      <p className="mb-6">Pay $10 to unlock member features.</p>

      <Link
        to="/payment"
        className="btn bg-blue-500 text-white hover:bg-blue-600"
      >
        payment
      </Link>
    </div>
  );
};

export default Membership;
