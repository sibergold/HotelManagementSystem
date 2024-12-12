'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Reservation } from '../../../types/types'
import { pb } from '../../../lib/pocketbase'
import { Loader2 } from 'lucide-react'
import { format } from 'date-fns';

const MyReservationPage = () => {
    const [user,setUser] = useState(null)
    const router = useRouter()
    const [isUserLoaded,setIsUserLoaded] = useState(false)
    const [reservations,setReservations] = useState<Reservation[]>([])
    useEffect(()=>{
         const fetchUser = async()=>{
           try {
            const authData = localStorage.getItem("pocketbase_auth");
           if(authData){
             const {token, record} = JSON.parse(authData);
             setUser(record)
           }
           } catch (error) {
            console.log(error)
           }
           finally{
            setIsUserLoaded(true)
           }
         }
         fetchUser();
       },[])

   useEffect(() => {
     const fetchReservation = async () => {
       if(!user) return;

       try {
        const resultList = await pb.collection('reservation').getList(1, 50);
        console.log(resultList.items)
        setReservations(resultList.items)
       } catch (error) {
        console.log(error)
       }
     }
     fetchReservation()
   }, [user])
   
 
    useEffect(() => {
      if(isUserLoaded && !user)
      {
        router.push('/')
      }
    }, [])
    
    if(!isUserLoaded)
    {
        return (
            <div className='flex items-center justify-center h-screen'>
                <Loader2 size={48} className='animate-spin'/>
            </div>
        )
    }

    if(!user)
    {
        return null;
    }

  return (
    <div className='pt-44 p-6 container'>
        <h1 className='text-2xl font-bold mb-4'>Reservations</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
        {reservations.map(reservation=>(
            <div key={reservation.id} className='border p-4 rounded-lg shadow-sm'>
            <p><strong>Guest Name: </strong>{reservation.guest_fullname}</p>
            <p><strong>Guest Email: </strong>{reservation.guest_email}</p>
            <p><strong>Guest Room: </strong>{reservation.room}</p>
            <p><strong>Arrival Date:</strong> {format(new Date(reservation.arrival_date), 'PPP')}</p>
            <p><strong>Departure Date:</strong> {format(new Date(reservation.departure_date), 'PPP')}</p>
            <p><strong>Adults: </strong>{reservation.adults}</p>
            <p><strong>Children: </strong>{reservation.children}</p>
            </div>
        ))}
        </div>
    </div>
  )
}

export default MyReservationPage