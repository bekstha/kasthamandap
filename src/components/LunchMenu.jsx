import React, { useEffect, useState } from 'react';

export function LunchMenu({selectedDay}) {
    const [lunchItems, setLunchItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://tassa.fi/resources/search/nearest?k=kasthamandap&lat=60.17124761&lon=24.94102048&page=0&size=12&u=lownk201&uit=mobi-web-prod&l=fi');
                const data = await response.json();

                // Extract data from the response similar to your previous implementation
                const bodyContent = data.items[0].ads[0].ad.body;
                const divClasses = bodyContent.match(/<div class="lunchHeader day\d+">(.*?)<\/div><div class="lunchDesc">(.*?)<\/div>/gs);

                const lunchItemsData = divClasses.map((divClass, index) => {
                    const [, headerContent, descContent] = divClass.match(/<div class="lunchHeader day\d+">(.*?)<\/div><div class="lunchDesc">(.*?)<\/div>/);
                    const cleanedDescContent = descContent.replace(/\d+\)/g, '');
                    const publishContent = cleanedDescContent.replace(/<br>lounas tarjolla klo 11 am - 16pm<br>/g, '<br>');

                    return {
                        header: headerContent,
                        desc: publishContent,
                    };
                });

                setLunchItems(lunchItemsData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures that useEffect runs only once on mount

    const filteredLunchItems = lunchItems.filter(item => item.header.includes(selectedDay));


    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                filteredLunchItems.map((item, index) => (
                    <div key={index} className="item-container">
                        <div dangerouslySetInnerHTML={{ __html: item.desc }} />
                    </div>
                ))
            )}
        </div>
    );
}
