import { GetUserSubmissionsType } from "../util/supabase";

interface CombinedDataType {
  loggedInUser: GetUserSubmissionsType;
  selectedUser: GetUserSubmissionsType;
}

export type { CombinedDataType };
