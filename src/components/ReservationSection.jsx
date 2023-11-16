import Overlay from "./ui/Overlay";
import { Section, SectionTitle } from "./ui/Section";
import Button from "./ui/Button";
import { firestore } from "firebase";

const ReservationSection = () => {
  return (
    <Section sectionclassName="bg-reservation-section bg-cover bg-center leading-snug">
      <Overlay color="bg-black/80" />
      <div className="relative text-center max-w-2xl mx-auto">
        <SectionTitle label="Reserve a table" />
        <form>
          <div className="-mx-3 flex flex-wrap text-left">
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label className="mb-3 block text-base font-medium text-white">
                  First Name
                </label>
                <input
                  type="text"
                  name="fName"
                  id="fName"
                  placeholder="First Name"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label className="mb-3 block text-base font-medium text-white">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lName"
                  id="lName"
                  placeholder="Last Name"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
          </div>
          <div className="mb-5">
            <label className="mb-3 block text-base font-medium text-white text-left">
              How many guest are you bringing?
            </label>
            <input
              type="number"
              name="guest"
              id="guest"
              placeholder="5"
              min="0"
              className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>

          <div className="-mx-3 flex flex-wrap text-left">
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label className="mb-3 block text-base font-medium text-white">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label className="mb-3 block text-base font-medium text-white">
                  Time
                </label>
                <input
                  type="time"
                  name="time"
                  id="time"
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
                  name="radio1"
                  id="radioButton1"
                  className="h-5 w-5"
                />
                <label className="pl-3 text-base font-medium text-white">
                  Yes
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="radio1"
                  id="radioButton2"
                  className="h-5 w-5"
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
