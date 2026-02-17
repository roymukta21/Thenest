import MyBookingsPage from "@/app/my-bookings/page";
import PrivateRoute from "@/components/PrivateRoute";

export default function BookingWrapper(props) {
  return (
    <PrivateRoute>
      <MyBookingsPage {...props} />
    </PrivateRoute>
  );
}
