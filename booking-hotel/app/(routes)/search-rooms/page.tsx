'use client'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { pb } from '../../../lib/pocketbase'
import RoomItem from '../_components/RoomItem'

const SearchPageRooms = () => {
    const searchParams = useSearchParams()
    const [rooms, setRooms] = useState([])

    const arrivalDate = searchParams.get('arrivalDate')
    const departureDate = searchParams.get('departureDate')
    const adults = searchParams.get('adults')
    const children = searchParams.get('children')

  useEffect(() => {
  const fetchAvailableRooms = async () =>{
   try {
    const reservations = await pb.collection('reservations').getFullList({
        filter:`arrival_date <= "${departureDate}" && departure_date >= ${arrivalDate}`,
        sort:'-created'
       })
       const reserveRoomIds = reservations.map(reservation=>reservation.room)
       let filters = '';
       if(reservations.length>0)
       {
        filters = reservations.map(id => `id != ${JSON.stringify(id)}`).join(' && ')
       }
       else
       {
        filters=''
       }
    
       const resultList = await pb.collection('rooms').getList(1, 50, {
        filter: `created >= "2022-01-01 00:00:00" ${filters ? `&& (${filters})` : ''}`,
    });
      
       setRooms(resultList.items) 
   } catch (error) {
    console.log(error)
   }
 

  }
  fetchAvailableRooms()
  }, [arrivalDate, departureDate, adults, children])
  
   if(rooms.length===0)
   {
    return <div className='pt-44 container'>NULL</div>
   }

  return (
    <div className='container mb-44 pt-44'>
        <h1 className='text-3xl font-bold mb-4'>Available Rooms</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {rooms.map(room=>(
                <RoomItem room={room} key={room.id}/>
            ))}
        </div>
    </div>
  )
}

export default SearchPageRooms