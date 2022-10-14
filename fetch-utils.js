const SUPABASE_URL = 'https://crnnmnapmmetoqehutpd.supabase.co/';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNybm5tbmFwbW1ldG9xZWh1dHBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjU3Njg4NDcsImV4cCI6MTk4MTM0NDg0N30.fo1G97TgzcXaUZCbWMKmGQUMITR-uzpb73uwp7N4UaU';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */

export function getUser() {
    return client.auth.user();
}

export async function signUpUser(email, password) {
    return await client.auth.signUp({
        email,
        password,
    });
}

export async function signInUser(email, password) {
    return await client.auth.signIn({
        email,
        password,
    });
}

export async function signOutUser() {
    return await client.auth.signOut();
}

/* Data functions */
