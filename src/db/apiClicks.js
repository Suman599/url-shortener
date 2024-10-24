import supabase from "./supabase";

export async function getClicksForUrls(urlIds) {
    if (!urlIds || urlIds.length === 0) {
        throw new Error("No URL IDs provided.");
    }

    const { data, error } = await supabase.from("urls").select("*").in("id", urlIds); // Ensure "id" is the correct column for filtering

    // Assuming you have a session management system, replace the following line accordingly
    const session = supabase.auth.session(); // Or however you're managing sessions

    if (!session) return null; // Check if session exists

    if (error) {
        console.error(error.message);
        throw new Error("Unable to load clicks");
    }

    return data;
}
