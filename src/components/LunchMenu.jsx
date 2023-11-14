import useLunchItems from "../hooks/useLunchItems";

const LunchMenu = ({ day }) => {
  const { weeklyLunch, loading } = useLunchItems();

  const filterDescription = (desc) => {
    const startIndex = desc.indexOf(day); // Find the index of the day
    const endIndex = desc.indexOf('<div class="lunchHeader', startIndex); // Find the index of the next day header
    let filteredDesc = desc.slice(startIndex, endIndex).trim(); // Extract the portion between the day and the next header

    // Remove numbers like 1), 2), etc.
    filteredDesc = filteredDesc.replace(/\d+\)/g, "").trim();

    // Filter out any lines that contain "lounaan Hinta" and "lounas tarjolla"
    const lines = filteredDesc.split("<br>");
    const filteredLines = lines
      .filter(
        (line) =>
          !line.includes("lounaan Hinta") &&
          !line.includes("lounas tarjolla") &&
          !line.includes("kello")
      )
      .join("<br>")
      .trim();

    return filteredLines;
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : weeklyLunch ? (
        <div className="item-container">
          <div
            dangerouslySetInnerHTML={{
              __html: filterDescription(weeklyLunch.desc),
            }}
          />
        </div>
      ) : (
        <p>No weekly lunch available.</p>
      )}
    </div>
  );
};

export default LunchMenu;
