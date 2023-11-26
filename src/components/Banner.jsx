import React, { useEffect, useState } from 'react'
import { Alert } from 'antd';
import useSpecialMenu from '../hooks/useSpecialMenu';

const Banner = () => {
    const [isToday, setIsToday] = useState(false);
    const [description, setDescription] = useState("");
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const { specialMenu } = useSpecialMenu();

    useEffect(() => {
        for (let i = 0; i < specialMenu.length; i++) {
          const fetchedDateObject = new Date(specialMenu[i].day);
          fetchedDateObject.setHours(0, 0, 0, 0);
    
          if (fetchedDateObject > today) {
            console.log("Fetched date is in the future");
          } else if (fetchedDateObject < today) {
            console.log("Fetched date is in the past");
          } else {
            setIsToday(true)
            setDescription(specialMenu[i].message)
          }
        }
      }, [today]);

    return (
        <div>
            {isToday && (
                <Alert
                style={{textAlign: 'center', fontWeight: 'bold' }}
                message="Information to the customers"
                description={description}
                type="info"
                banner
                showIcon
                closable
            />
            )}
        </div>
    )
};

export default Banner