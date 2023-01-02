import{useEffect, useState,useContext} from 'react'
import { useQuery, useMutation, useQueryClient, QueryClient } from '@tanstack/react-query'
import {axiosInstance,axios_two} from "../../axiosInstance/axiosInstance";
import { useNavigate } from "react-router-dom";
import { IoPersonCircleOutline, IoCameraOutline, IoEllipsisVerticalSharp } from "react-icons/io5";
import {NotificationCountContext} from "../../contex/appContext";



function NotificationSm() {

    const PATH = process.env.REACT_APP_PUBLIC_FOLDER

    const [notification, setNotification] = useState([])
    const [notificationCount, setNotificationCount] =useContext(NotificationCountContext)

    let userId = localStorage.getItem('user')

    useEffect(() => {
        return () => {
            axiosInstance.get(`user/readNotification?user=${userId}`)
            setNotificationCount(0)
        };
    }, []);


    const { isLoading, error, data, refetch } = useQuery({
        queryKey: ['notification'],
        queryFn: () =>
        axiosInstance.get(`user/getNotification?user=${userId}`)
    })

    
  return (
    <div className='bg-white h-[90vh]'>
    <div className='flex flex-col pt-8  p-4 h-full bg-no-repeat' style={{ backgroundImage: `url(../images/wave.png)` }}>
        <div className='bg-[#ffffffd9] p-4'>
        <div>
                {isLoading && <div >Loading...</div>}
                <p>{notification?.data}</p>
                <p className='font-semibold mb-3'>Notifications</p>
                {
                    data?.data.length < 1 && <p className='text-center text-gray-400 py-5'>You have 0 notifications</p>
                }
                {
                    data?.data.length > 0    &&
                    data.data.map((item, index) => {
                        return (
                            item.type === 'like' ?
                                <div className='flex items-center justify-between py-1'>
                                    <div className='flex'>
                                        <div className='w-[30px] h-[30px]'>
                                            {
                                                item.userProfil === "null" ?
                                                    <IoPersonCircleOutline className='w-full  text-gray-500 text-[80px]'></IoPersonCircleOutline>
                                                    : item.userProfil != null ?

                                                        <img className='w-full h-full object-cover  rounded-full' src={PATH + item.userProfil} alt="User Profile " />

                                                        : <IoPersonCircleOutline className='w-full text-gray-500 text-[80px]'></IoPersonCircleOutline>
                                            }
                                        </div>
                                        <div className='ml-3'>
                                            <p>{item.username} {item.type} your post</p>
                                        </div>
                                    </div>
                                        <div className='h-[40px] w-[40px]'>
                                            <img className='w-full h-full object-cover rounded-lg ml-2' src={PATH + item.post} alt="User Profile " />
                                        </div>

                                </div>
                                : item.type === 'comment' ?
                                    <div className='flex items-center justify-between py-1'>
                                        <div className='flex'>
                                        <div className='w-[30px] h-[30px]'>
                                            { 
                                                item.userProfil === "null" ?
                                                    <IoPersonCircleOutline className='w-full  text-gray-500 text-[80px]'></IoPersonCircleOutline>
                                                    : item.userProfil != null ?

                                                        <img className='w-full h-full object-cover rounded-full' src={PATH + item.userProfil} alt="User Profile " />

                                                        : <IoPersonCircleOutline className='w-full text-gray-500 text-[80px]'></IoPersonCircleOutline>
                                            }
                                        </div>
                                        <div className='ml-3'>
                                            <p>{item.username} {item.type}ed on your post</p>
                                        </div>
                                        </div>
                                        <div className='h-[40px] w-[40px]'>
                                            <img className='w-full h-full object-cover rounded-lg ml-2' src={PATH + item.post} alt="User Profile " />
                                        </div>
                                    </div>
                                    :
                                    <div className='flex py-2 items-center'>
                                        <div className='w-[30px] h-[30px]'>
                                            {
                                                item.userProfil === "null" ?
                                                    <IoPersonCircleOutline className='w-full  text-gray-500 text-[80px]'></IoPersonCircleOutline>
                                                    : item.userProfil != null ?

                                                        <img className='w-full h-full object-cover rounded-full' src={PATH + item.userProfil} alt="User Profile " />

                                                        : <IoPersonCircleOutline className='w-full text-gray-500 text-[80px]'></IoPersonCircleOutline>
                                            }
                                        </div>
                                        <div className='ml-3'>
                                            <p>{item.username} started {item.type}ing you</p>
                                        </div>

                                    </div>
                        )
                    })
                }
            </div>
        </div>
        </div>
</div>
  )
}

export default NotificationSm