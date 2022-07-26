<script>
  import { supabase } from "../supabase";
  import Auth from "../components/Auth.svelte";
  import { user } from "../stores/authStore";
  import "../app.css";
import { loadEntries } from "../stores/entrystore";
import Navbar from "../components/Navbar.svelte"

console.log(supabase.auth.user());  
user.set(supabase.auth.user());

  supabase.auth.onAuthStateChange((_, session) => {
    user.set(session?.user)
    if(session?.user) {
      loadEntries();
    }
  })
  
</script>

<div class ="container mx-auto my-6 max-w-2xl">
  {#if $user}
  <Navbar/>
  <slot></slot>
  {:else}
  <Auth/>
  {/if}
</div>