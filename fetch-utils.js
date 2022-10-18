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

export async function getCategories() {
    return await client.from('categories').select('name');
}

export async function updateProfile(profile) {
    return await client.from('profiles').upsert(profile).single();
}

export async function getProfile(id) {
    return await client.from('profiles').select('*').eq('id', id).maybeSingle();
}

export async function uploadImage(bucketName, imagePath, imageFile) {
    const bucket = client.storage.from(bucketName);

    const response = await bucket.upload(imagePath, imageFile, {
        cacheControl: '3600',
        upsert: true,
    });

    if (response.error) {
        // eslint-disable-next-line no-console
        console.log(response.error);
        return null;
    }

    const url = `${SUPABASE_URL}/storage/v1/object/public/${response.data.Key}`;

    return url;
}

export async function createQuestion(question) {
    return await client.from('questions').insert(question).single();
}

export async function getQuestions(name) {
    let query = client
        .from('questions')
        .select('*', { count: 'exact' })
        .order('created_at')
        .limit(50);
    if (name) {
        query = query.ilike('title', `%${name}`);
    }
    const response = await query;
    return response;
}

//TODO: add fetch comments/answers and order
export async function getQuestion(id) {
    return await client
        .from('questions')
        .select(`*,comments(*, profiles(*))`)
        .eq('id', id)
        .single();
}

export async function createComment(comment) {
    return await client.from('comments').insert(comment).single();
}

export async function getComment(id) {
    return await client
        .from('comments')
        .select(`*, profiles(id, user_name, avatar_url)`)
        .eq('id', id)
        .single();
}

// export async function createAnswer(answer) {
//     return await client.from('answers').insert(answer).single();
// }
