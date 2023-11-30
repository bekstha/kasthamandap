import useOpeningHours from "../hooks/useOpeningHours";
import useExceptionalHours from "../hooks/useExceptionalHours";

const HourList = ({ openingHour, closingHour, day }) => {
  return (
    <li>
      <span className="inline-block w-48 text-black">{day}</span>
      {openingHour || closingHour
        ? `${openingHour} - ${closingHour}`
        : "Closed"}
    </li>
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
  //console.log(exceptionalHours);

  return (
    <ul className="text-black">
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
          <h3 className="font-bold mt-8">Lunch Hour</h3>
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
    </ul>
  );
};

export default OpeningHours;
