import { useEffect, useState } from "react";

const useLunchItems = () => {
  const [weeklyLunch, setWeeklyLunch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://tassa.fi/resources/shop/2039004/allads?l=fi&im=true&page=0&limit=18&city=Helsinki&u=lomm6pq9&uit=mobi-web-prod"
        );
        const data = await response.json();

        console.log("Data from API:", data);

        if (data.ads && data.ads.length > 0) {
          const weeklyLunchAd = data.ads.find(
            (item) =>
              item.ad.weeklyLunch &&
              item.ad.weeklyLunch.trim().toLowerCase() === "true"
          );

          if (weeklyLunchAd) {
            setWeeklyLunch({
              header: weeklyLunchAd.ad.header,
              desc: weeklyLunchAd.ad.body,
            });
          } else {
            console.log("No ad with weeklyLunch available.");
          }
        } else {
          console.log("Invalid data structure in the API response.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { weeklyLunch, loading };
};

export default useLunchItems;
