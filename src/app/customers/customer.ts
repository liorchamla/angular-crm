/**
 * CE FICHIER DECRIT UNE INTERFACE QUI REPRESENTE CE QU'EST UN CUSTOMER
 * -----------------
 * Le but est que partout dans notre projet, quand on parle d'un Customer, on sache exactement ce que c'est
 * On pourra ainsi compter sur TypeScript non seulement pour nous confirmer qu'un objet
 * que l'on créé est véritablement conforme à ce qu'est un customer
 * mais aussi compter sur VSCode ou n'importe quel éditeur pour nous aider lorsque l'on travaille avec un
 * customer au niveau de l'auto complétion
 */

export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  invoices?: any[];
  user?: any;
  totalAmount: number;
  paidAmount: number;
  unpaidAmount: number;
}
