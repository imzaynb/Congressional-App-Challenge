import { Account, Address, Business } from "@/types/database_types";
import { Database } from "@/types/supabase";
import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { Printwap } from "./places";

export const supabaseClient = async (
  supabaseAccessToken: string
) => {
  const supabase = createClient<Database>(
    (process.env.NEXT_PUBLIC_SUPABASE_URL as string),
    (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string),
    {
      global: { headers: { Authorization: `Bearer ${supabaseAccessToken}` } },
    }
  );

  return supabase;
}

export const getAccount = async (
  supabase: SupabaseClient<Database>,
  userId: string
): Promise<Account | null> => {
  try {
    const { data, error, status } = await supabase
      .from("accounts")
      .select("*")
      .eq('user_id', userId);

    if (error && status !== 406) {
      throw error;
    }

    const account: Account | null = data ? data[0] : null;
    return account;
  } catch (error) {
    alert(`${error} in getAccount()`);
  }
  return null;
}

export const createAccount = async (
  supabase: SupabaseClient<Database>,
  userId: string
): Promise<Account | null> => {
  try {
    const { data, error, status } = await supabase
      .from("accounts")
      .insert({ user_id: userId });

    if (error && status !== 406) {
      throw error;
    }

    if (data) {
      return data;
    }
  } catch (error) {
    alert(`${error} in createAccount()`);
  }
  return null;
}

export const createAddress = async (
  supabase: SupabaseClient<Database>,
  lat: number,
  lng: number,
  address: string,
  iconURL: string | undefined,
  placeId: string | undefined,
): Promise<Address | null> => {
  try {
    const { data, error, status } = await supabase
      .from("addresses")
      .insert({ lat: lat, lng: lng, address: address, icon_url: iconURL, placeId: placeId });

    if (error && status !== 406) {
      throw error;
    }

    if (data) {
      return data;
    }
  } catch (error) {
    alert(`${error} in createAddress()`);
  }
  return null;
}

export const matchAddress = async (
  supabase: SupabaseClient<Database>,
  addressString: string,
): Promise<Address | null> => {
  try {
    const { data, error, status } = await supabase
      .from("addresses")
      .select("*")
      .eq("address", addressString);

    if (error && status !== 406) {
      throw error;
    }

    const address = data ? data[0] : null;
    return address;
  } catch (error) {
    alert(`${error} in matchAddress()`);
  }
  return null;
}

export const updateAccount = async (
  supabase: SupabaseClient<Database>,
  userId: string,
  addressId: number,
) => {
  try {
    const { error, status } = await supabase
      .from("accounts")
      .update({ address_id: addressId })
      .eq("user_id", userId);

    if (error && status !== 406) {
      throw error;
    }

    console.log(`updated ${userId} to have address_id ${addressId}`)

    // no data is returned here.
  } catch (error) {
    alert(`{error} in updateAccount`);
  }
}


export const getAddress = async (
  supabase: SupabaseClient<Database>,
  addressId: number,
): Promise<Address | null> => {
  try {
    const { data, error, status } = await supabase
      .from("addresses")
      .select("*")
      .eq("id", addressId);

    if (error && status !== 406) {
      throw error;
    }

    const address = data ? data[0] : null;
    return address;
  } catch (error) {
    alert(`${error} in matchAddress()`);
  }
  return null;
}

export const getAllBusinesses = async (
  supabase: SupabaseClient<Database>
): Promise<Business[] | null> => {
  try {
    const { data, error, status } = await supabase
      .from("business")
      .select("*");

    if (error && status !== 406) {
      throw error;
    }

    return data;
  } catch (error) {
    alert(`${error} in matchAddress()`);
  }
  return null;
}

export const createBusiness = async (
  supabase: SupabaseClient<Database>,
  printwap: Printwap,
  addressId: number,
  placeId: string
) => {
  try {
    const { data, error, status } = await supabase
      .from("business")
      .insert({
        address_id: addressId,
        name: printwap.name,
        phone_number: printwap.phone_number,
        picture: printwap.photo,
        rating: printwap.rating,
        type: printwap.type,
        website: printwap.website,
        placeId: placeId
      })

    if (error && status !== 406) {
      throw error;
    }

    console.log("AJAJAJ");

    return data;

  } catch (error) {
    alert(`${error} in insertBusiness()`);
  }
}