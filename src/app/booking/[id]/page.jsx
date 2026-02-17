import PrivateRoute from "@/components/PrivateRoute";

export default function BookingWrapper(props) {
  return (
    <PrivateRoute>
      <BookingPage {...props} />
    </PrivateRoute>
  );
}
