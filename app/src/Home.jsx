import { supabase } from "./.server/db"

export default function Home(){

  // supabase.auth.signOut();

  async function getAllUsers() {
    const { data, error } = await supabase
      .from('users')
      .select('*');

    if (error) {
      console.error('Error fetching users:', error);
      return [];
    }
    console.log(data);
  }

  getAllUsers()
  
  return (
    <h1>Ciao Home</h1>
  )
}