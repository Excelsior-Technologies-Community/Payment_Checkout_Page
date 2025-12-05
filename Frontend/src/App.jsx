import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../Pages/CheckoutForm";


const stripePromise = loadStripe("pk_test_51Sac6LIRqM91NTozugPjvD6ybzmFSg4bucznDfwyarQx9N2VvzFsXrx6pXQfQaj72ls7SDWpKT3BbsG921gN5NPT007RnQOxGD");

function App() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm/>
    </Elements>
  );
}

export default App;
