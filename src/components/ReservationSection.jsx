import { useState } from "react";
import Overlay from "./ui/Overlay";
import { Section, SectionTitle } from "./ui/Section";
import Button from "./ui/Button";
import { Input, InputLabel } from "./ui/Input";
import { db } from "../config/firebase";
import { addDoc, collection } from "firebase/firestore";

const ReservationSection = () => {
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [guestCount, setGuestCount] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isComing, setIsComing] = useState("false");

  const handleFNameChange = (event) => setFName(event.target.value);
  const handleLNameChange = (event) => setLName(event.target.value);
  const handleDateChange = (event) => setDate(event.target.value);
  const handleTimeChange = (event) => setTime(event.target.value);
  const handleGuestCountChange = (event) => setGuestCount(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePhoneNumberChange = (event) => setPhoneNumber(event.target.value);
  const handleYesChange = () => setIsComing(true);
  const handleNoChange = () => setIsComing(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const reservationCollection = collection(db, "Reservations");
      const reservationRef = await addDoc(reservationCollection, {
        fname,
        lname,
        guestCount,
        date,
        time,
        email,
        phoneNumber,
        isComing,
      });

      setFName("");
      setLName("");
      setGuestCount("");
      setDate("");
      setTime("");
      setEmail("");
      setPhoneNumber("");
      setIsComing(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  return (
    <Section sectionClassName="bg-reservation-section bg-cover bg-center leading-snug">
      <Overlay color="bg-black/80" />
      <div className="relative text-center max-w-2xl mx-auto">
        <SectionTitle label="Reserve a table" />
        <form onSubmit={handleSubmit}>
          <div className="-mx-3 flex flex-wrap text-left">
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <InputLabel
                  label="First Name"
                  className="mb-3 block text-base font-medium text-white"
                />
                <Input
                  type="text"
                  className="fName"
                  placeholder="First Name"
                  value={fname}
                  onChange={handleFNameChange}
                />
              </div>
            </div>
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <InputLabel
                  label="Last Name"
                  className="mb-3 block text-base font-medium text-white"
                />
                <Input
                  type="text"
                  className="lName"
                  placeholder="Last Name"
                  value={lname}
                  onChange={handleLNameChange}
                />
              </div>
            </div>
          </div>
          <div className="mb-5">
            <InputLabel label="How many guest are you bringing?" />
            <Input
              type="number"
              className="guestCount"
              placeholder="0"
              value={guestCount}
              min="0"
              max="14"
              onChange={handleGuestCountChange}
            />
          </div>

          <div className="-mx-3 flex flex-wrap text-left">
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <InputLabel
                  label="Date"
                  className="mb-3 block text-base font-medium text-white"
                />
                <Input
                  type="date"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  placeholder=""
                  value={date}
                  onChange={handleDateChange}
                />
              </div>
            </div>
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <InputLabel
                  label="Time"
                  className="mb-3 block text-base font-medium text-white"
                />
                <Input
                  type="time"
                  // className="time"
                  placeholder=""
                  value={time}
                  onChange={handleTimeChange}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
          </div>
          <div className="-mx-3 flex flex-wrap text-left">
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <InputLabel
                  label="Email"
                  className="mb-3 block text-base font-medium text-white"
                />

                <Input
                  type="email"
                  placeholder=""
                  value={email}
                  onChange={handleEmailChange}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <InputLabel
                  label="Phone Number"
                  className="mb-3 block text-base font-medium text-white"
                />
                <Input
                  type="tel"
                  value={phoneNumber}
                  placeholder=""
                  onChange={handlePhoneNumberChange}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
          </div>

          <div className="mb-5">
            <label className="mb-3 block text-base font-medium text-white text-left">
              Are you coming to the event?
            </label>
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="isComing"
                  id="radioButton1"
                  className="h-5 w-5"
                  checked={isComing}
                  onChange={handleYesChange}
                />
                <label className="pl-3 text-base font-medium text-white">
                  Yes
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="isComing"
                  id="radioButton2"
                  className="h-5 w-5"
                  checked={!isComing}
                  onChange={handleNoChange}
                />
                <label className="pl-3 text-base font-medium text-white ">
                  No
                </label>
              </div>
            </div>
          </div>

          <div>
            <Button className="w-48">Submit</Button>
          </div>
          <div className="mb-5"></div>

          <span>More than 14?</span>
          <a href="">Contact us</a>
        </form>
      </div>
    </Section>
  );
};
export default ReservationSection;
