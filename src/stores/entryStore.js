import { writable } from 'svelte/store';
import {supabase} from "../supabase.js";
export const entries = writable([]);

// export const count = async () => {
//     const {data, error, count} = await supabase
//         .from('entry')
//         .select({count: 'exact'})
//     if(error) {
//         return console.error(error);
//     }
//     return count;
// }
// count();

export const loadEntries = async () => {
    const {data, error} = await supabase.from('entry').select();
    if(error) {
        return console.error(error);
    }
    entries.set(data);
}
loadEntries();


export const addEntry = async (minutes, user_id) => {
    const {data, error} = await supabase.from('entry').insert([{minutes, user_id}]);
    
    if(error) {
        return console.error(error);
    }

    entries.update(cur => [...cur, data[0]]);
};

export const deleteEntry = async (id) => {
    const {error} = await supabase.from('entry').delete().match({id});
    
    if(error) {
        return console.error(error);
    }

	entries.update((entries) => entries.filter((entry) => entry.id !== id));
};

export const toggleEntryCompleted = async (id, currentState) => {
    const {error} = await supabase.from('entry').update({completed: !currentState}).match({id})

    if(error) {
        return console.error(error);
    }

	entries.update((entries) => {
		let index = -1;
		for (let i = 0; i < entries.length; i++) {
			if (entries[i].id === id) {
				index = i;
				break;
			}
		}
		if (index !== -1) {
			entries[index].completed = !entries[index].completed;
		}
		return entries;
	});
};