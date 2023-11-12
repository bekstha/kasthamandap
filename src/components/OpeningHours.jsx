import useOpeningHours from "../hooks/useOpeningHours";
import useExceptionalHours from "../hooks/useExceptionalHours";

const HourList = ({ openingHour, closingHour, day }) => {
  return (
    <li>
      <span className="inline-block w-48">{day}</span>
      {openingHour || closingHour
        ? `${openingHour}:00 - ${closingHour}:00`
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
    <ul>
      {weekdayOpeningHours && (
        <HourList
          day="Monday - Friday"
          openingHour={weekdayOpeningHours.openingHour}
          closingHour={weekdayOpeningHours.closingHour}
        />
      )}
      {saturdayOpeningHours && (
        <HourList
          day="Saturday"
          openingHour={saturdayOpeningHours.openingHour}
          closingHour={saturdayOpeningHours.closingHour}
        />
      )}
      {sundayOpeningHours && <HourList day="Sunday" />}

      {lunchHours && (
        <>
          <h3 className="font-bold mt-8">Lunch Hour</h3>
          <HourList
            day="Monday - Friday"
            openingHour={lunchHours.openingHour}
            closingHour={lunchHours.closingHour}
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
