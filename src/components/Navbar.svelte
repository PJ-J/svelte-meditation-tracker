<script>
  import { supabase } from "../supabase";

  const logout = () => {
    console.log("log out");
    supabase.auth.signOut();
  }
</script>

<div class="my-4 flex justify-end">
  <button class="shadow-sm rounded bg-marble hover:bg-gradient-to-r from-cyan-500 to-blue-500 text-black py-2 px-4" on:click={logout}>Log Out</button>
  </div>