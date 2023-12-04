import { useState } from "react";

import { Input, InputLabel } from "../ui/Input";
import Overlay from "../ui/Overlay";
import { Section } from "../ui/Section";

import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import Button from "../ui/Button";
import { POST } from "../../services/sendEmail";

const ReservationSection = () => {
  const [state, setState] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    guestCount: 1,
    reservationDate: "",
    reservationTime: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const clearState = () =>
    setState({
      firstname: "",
      lastname: "",
      email: "",
      phoneNumber: "",
      guestCount: 1,
      reservationDate: "",
      reservationTime: "",
    });
  const getCurrentDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // January is 0!
    let dd = today.getDate();

    if (mm < 10) {
      mm = `0${mm}`;
    }

    if (dd < 10) {
      dd = `0${dd}`;
    }

    return `${yyyy}-${mm}-${dd}`;
  };

  const handleInputChange = (event) =>
    setState({ ...state, [event.target.name]: event.target.value });

  const handleReservationSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const {
        firstname,
        lastname,
        email,
        phoneNumber,
        guestCount,
        reservationDate,
        reservationTime,
      } = state;
      const reservationCollection = collection(db, "Reservations");
      await addDoc(reservationCollection, {
        firstname,
        lastname,
        email,
        phoneNumber,
        guestCount,
        reservationDate,
        reservationTime,
      });
      const response = await POST("email/response", {
        useremail: "shresrthaasmita@gmail.com",
        username: "Kasthamandap",
        customerName: `${firstname} ${lastname}`,
        phoneNumber,
        guestCount,
        reservationDate,
        reservationTime,
      });

      if (response?.success) {
        await POST("email/response", {
          useremail: email,
          username: firstname,
          reservationDate,
          reservationTime,
          phoneNumber,
          guestCount,
        });
      }

      clearState();
    } catch (error) {
      console.error("Error submitting form:", { error });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Section sectionClass="bg-reservation-section">
      <Overlay color="bg-black/80" />
      <div className="relative max-w-md mx-auto p-6 rounded-2xl bg-white/20 shadow-lg shadow-[rgba(0,0,0,0.1)] backdrop-blur">
        {/* <SectionTitle label="Reserve a table" /> */}
        <h3 className="font-bold text-3xl mb-6 text-center">Reserve a table</h3>
        <form onSubmit={handleReservationSubmit}>
          <div className="flex items-center justify-between gap-4">
            <div>
              <InputLabel label="First name" />
              <Input
                placeholder="John"
                name="firstname"
                onChange={handleInputChange}
              />
            </div>
            <div>
              <InputLabel label="Last name" />
              <Input
                placeholder="Doe"
                name="lastname"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="mt-2">
            <InputLabel label="Email" />
            <Input
              type="email"
              placeholder="example@mail.com"
              name="email"
              onChange={handleInputChange}
            />
          </div>
          <div className="mt-2">
            <InputLabel label="Phone number" />
            <Input
              type="tel"
              placeholder="+358411103121"
              name="phoneNumber"
              onChange={handleInputChange}
            />
          </div>
          <div className="mt-2">
            <InputLabel label="Total number of guests" />
            <Input
              type="number"
              placeholder="1"
              min="1"
              max="14"
              name="guestCount"
              onChange={handleInputChange}
            />
          </div>
          <div className="mt-2 flex items-center justify-between gap-4">
            <div className="flex-1">
              <InputLabel label="Date" />
              <Input
                type="date"
                name="reservationDate"
                onChange={handleInputChange}
                min={getCurrentDate()}
              />
            </div>
            <div className="flex-1">
              <InputLabel label="Time" />
              <Input
                type="time"
                name="reservationTime"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <Button className="md:w-full w-full mt-8" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit Reservation"}
          </Button>
        </form>
      </div>
    </Section>
  );
};

export default ReservationSection;
