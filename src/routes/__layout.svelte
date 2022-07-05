<script>
  import { supabase } from "../supabase";
  import Auth from "../components/Auth.svelte";
  import "../app.css";
  
</script>

<div class ="container mx-auto my-6 max-w-lg">
  <Auth/>
  <slot></slot>
</div>