import { pb } from "../lib/pocketbase";

export  const getRooms= async()=> {
    try {

        const resultList = await pb.collection('rooms').getList(1, 50);
        return resultList.items;
        
    } catch (error) {
        console.error('Error getting slider images:', error);
        return [];
        
    }
    
}
export const getRoomDetail = async(recordId) => {
    try {
        const record = await pb.collection('rooms').getOne(recordId, {
            expand: 'relField1,relField2.subRelField',
        });
        return record
    } catch (error) {
        console.log(error)
    }
}
export const getHomeRooms = async() => {
    try {
        const resultList = await pb.collection('rooms').getList(1, 50);
        return resultList.items
    } catch (error) {
        console.log(error)
    }
}