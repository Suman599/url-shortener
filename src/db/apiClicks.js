import supabase from "./supabase";

export async function getClicksForUrls(urlIds){
    const {data,error}=await supabase.from("urls").select("*").in("urlIds",urlIds)
    if(!session.session) return null;
    if(error){
        console.error(error.message);
        throw new Error("Unable to load clicks");
    }
    return data;
}