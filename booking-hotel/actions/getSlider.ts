import { pb } from "../lib/pocketbase"

export async function getSlider() {
    try {
        const records = await pb.collection('sliders').getFullList({
            sort:"-created"
        })
        return records;
    } catch (error) {
        console.log(error)
        return [];
    }
}