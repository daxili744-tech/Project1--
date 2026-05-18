import { supabase, supabaseUrl } from './supabase';
import { cabins as localCabins } from '../data/data-cabins';

let localStore = [...localCabins];
let nextId = localCabins.length + 1;

export async function getCabins() {
  const { data, error } = await supabase
    .from('cabins')
    .select('*');

  if (error || !data || data.length === 0) {
    console.warn("Supabase fetch failed, using local data");
    return localStore;
  }
  return data;
}

export async function createCabin(newCabin, id) {
  const hasImgPath = typeof newCabin.image === 'string' && newCabin.image.startsWith(supabaseUrl);

  let imagePath = newCabin.image;
  let imageName;

  if (!hasImgPath && newCabin.image) {
    imageName = `${Math.random()}-${newCabin.name}`.replaceAll("/", "");
    imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  }

  let query = supabase.from('cabins');
  if (id) {
    query = query.update({ ...newCabin, image: imagePath }).eq('id', id);
  } else {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.warn("Supabase operation failed, using local data");
    if (id) {
      localStore = localStore.map((c) => (c.id === id ? { ...c, ...newCabin, image: imagePath } : c));
      return localStore.find((c) => c.id === id);
    } else {
      const cabin = { id: nextId++, ...newCabin, image: imagePath };
      localStore.push(cabin);
      return cabin;
    }
  }
  if(hasImgPath) {
    return data;
  }
  if (imageName && newCabin.image instanceof File) {
    const { error: storageError } = await supabase.storage
      .from('cabin-images')
      .upload(imageName, newCabin.image);

    if (storageError) {
      console.warn("Supabase storage upload failed, image URL still stored");
    }
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase
    .from('cabins')
    .delete()
    .eq('id', id);

  if (error) {
    console.warn("Supabase delete failed, using local data");
    localStore = localStore.filter((c) => c.id !== id);
    return localStore;
  }
  return data;
}


