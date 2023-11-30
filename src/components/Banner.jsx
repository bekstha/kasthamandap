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
          const startDate = new Date(specialMenu[i].start_date);
          const endDate = new Date(specialMenu[i].end_date);

          startDate.setHours(0, 0, 0, 0);
          endDate.setHours(0,0,0,0);
          
          if (startDate <= today && today <= endDate) {
            setIsToday(true)
            setDescription(specialMenu[i].message)
          } else  {
            console.log("Fetched date is not within range");
          }
        }
      }, [today]);

    return (
        <div className='absolute fixed top-0 w-full lg:w-2/3 text-xl justify-center px-3'>
            {isToday && (
              <div className='text-center'>
                <Alert
                  className={'text-white bg-orange-500'}
                  style={{borderRadius: '0 0 20px 20px', fontSize: '18px'}}
                  message={
                    <Marquee pauseOnHover gradient={false}>
                      {description} 
                    </Marquee>
                  }
                  showIcon={false}
                  banner
                  closeIcon={true}
              />
              </div>
            )}
        </div>
    )
};

export default Banner