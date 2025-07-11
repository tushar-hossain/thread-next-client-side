import { Link, Navigate } from "react-router";
import Payment from "./Payment/Payment";
// import useAuth from "../../hooks/useAuth";

const Membership = () => {
  return (
    <div className="my-10">
      <h2 className="text-2xl font-bold mb-4">Become a Member</h2>
      <p className="mb-6">Pay $10 to unlock member features.</p>

      <Link to="/payment" className="btn">
        payment
      </Link>
    </div>
  );
};

export default Membership;
