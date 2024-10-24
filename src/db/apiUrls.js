import supabase, { supabaseUrl } from "./supabase";

// Function to get URLs for a specific user
export async function getUrls(user_id) {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !session) {
        console.error("Session Error:", sessionError?.message || "No session found");
        return null; // Return null if no session exists
    }

    const { data, error } = await supabase
        .from("urls")
        .select("*")
        .eq("user_id", user_id);

    if (error) {
        console.error("Error loading URLs:", error.message);
        throw new Error("Unable to load URLs");
    }

    return data;
}

// Function to delete a URL by ID
export async function deleteUrl(id) {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !session) {
        console.error("Session Error:", sessionError?.message || "No session found");
        return null; // Return null if no session exists
    }

    const { data, error } = await supabase
        .from("urls")
        .delete()
        .eq("id", id);

    if (error) {
        console.error("Error deleting URL:", error.message);
        throw new Error("Unable to delete URL");
    }

    return data;
}

// Function to create a new URL entry
export async function createUrl({ title, longUrl, customUrl, user_id }, qrcode) {
    const short_url = Math.random().toString(36).substring(2, 6);
    const fileName = `qr-${short_url}`;

    // Upload QR code to storage
    const { error: storageError } = await supabase.storage.from("qrs").upload(fileName, qrcode);

    if (storageError) {
        console.error("Storage Error:", storageError.message);
        throw new Error(storageError.message);
    }

    const qr = `${supabaseUrl}/storage/v1/object/public/qrs/${fileName}`;

    // Retrieve the current session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !session) {
        console.error("Session Error:", sessionError?.message || "No session found");
        return null; // Return null if no session exists
    }

    // Use user_id from the session if not provided
    user_id = user_id || session.user.id;

    // Prepare data for insertion
    const insertData = {
        title,
        original_url: longUrl,  // Ensure this value is correctly assigned
        custom_url: customUrl || null,
        user_id,
        short_url,
        qr,
    };

    console.log("Insert Data:", insertData); // Log the data to be inserted

    // Insert into database
    const { data, error } = await supabase.from("urls").insert([insertData]).select();

    if (error) {
        console.error("Error creating short URL:", error.message);
        throw new Error("Unable to create short URL");
    }

    return data;
}
