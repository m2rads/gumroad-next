// @/types/user.ts
export interface User {
    id: string;
    email: string;
    balance: number;
    number_of_links: number;
    reset_hash: string;
    on_links_page: boolean;
    // TODO: add other fields if necessary
  }
  