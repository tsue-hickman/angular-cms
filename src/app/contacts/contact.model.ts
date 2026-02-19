export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  imageUrl: string;
  group: Contact[] | null;
}
