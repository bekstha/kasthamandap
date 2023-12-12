import useOpeningHours from "../../hooks/useOpeningHours";
import useExceptionalHours from "../../hooks/useExceptionalHours";

const HourList = ({ openingHour, closingHour, day }) => {
  return (
    <span className="flex text-gray-600">
      <span className="w-48 text-gray-600">{day}</span>
      {openingHour || closingHour
        ? `${openingHour} - ${closingHour}`
        : "Closed"}
    </span>
  );
};

const OpeningHours = () => {
  const {
    weekdayOpeningHours,
    saturdayOpeningHours,
    sundayOpeningHours,
    lunchHours,
  } = useOpeningHours();
  const { exceptionalHours } = useExceptionalHours();

  return (
    <>
      {weekdayOpeningHours && (
        <HourList
          day="Monday - Friday"
          openingHour={weekdayOpeningHours.opens}
          closingHour={weekdayOpeningHours.closes}
        />
      )}
      {saturdayOpeningHours && (
        <HourList
          day="Saturday"
          openingHour={saturdayOpeningHours.opens}
          closingHour={saturdayOpeningHours.closes}
        />
      )}
      {sundayOpeningHours && <HourList day="Sunday" />}

      {lunchHours && (
        <>
          <h3 className="font-bold mt-10 mb-3 text-black">Lunch Hour</h3>
          <HourList
            day="Monday - Friday"
            openingHour={lunchHours.opens}
            closingHour={lunchHours.closes}
          />
        </>
      )}

      {exceptionalHours && exceptionalHours[0]?.status === "active" && (
        <li>{exceptionalHours[0]?.exceptionMessage}</li>
      )}
    </>
  );
};

export default OpeningHours;
