import React, { useEffect, useState } from 'react'
import { Alert } from 'antd';
import Marquee from 'react-fast-marquee';
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
        <div className='absolute fixed top-0 w-full lg:w-2/3 text-xl justify-center px-3'>
            {isToday && (
              <div className='text-center'>
                <Alert
                  style={{borderRadius: '0 0 20px 20px', backgroundColor: '#ea580c', fontSize: '18px'}}
                  message={
                    <Marquee pauseOnHover gradient={false}>
                      {description}
                    </Marquee>
                  }
                  type="info"
                  banner
                  showIcon
                  closable
              />
              </div>
            )}
        </div>
    )
};

export default Banner