import { pb } from "../lib/pocketbase"

export async function getHotel() {
    try {
        const record = await pb.collection('hotel').getOne('83c456o03a4loo7', {
            expand: 'relField1,relField2.subRelField',
        });
        return record;
    } catch (error) {
        console.log(error)
        return [];
    }
}