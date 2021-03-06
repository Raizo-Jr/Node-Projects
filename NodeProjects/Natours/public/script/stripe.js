import axios from "axios";
import { showAlert } from "./alerts";

const stripe = Stripe(
  "pk_test_51J2xdVSD2N7voyjiPC6uLUrMxxINQBSZoCUy2m4An8mf7sjQFOvFTHjMTxEOSqkSoHfxyXOry95kDLtTFonMEucq00lM89ftho"
);

export const bookTour = async (tourId) => {
  try {
    // i) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    // ii) Create checkout form + process
    await stripe.redirectToCheckout({ sessionId: session.data.session.id });
  } catch (err) {
    console.log(err);
    showAlert("error", err);
  }
};
