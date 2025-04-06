/**
 * Represents an item entity in the application.
 */
export interface Item {
  /** Unique identifier for the item */
  id: number;

  /** Name of the item */
  name: string;

  /** Description of the item */
  description: string;

  /** The user who created the item */
  createdBy: string;

  /** The date and time the item was created (ISO string) */
  created_at: string;

  /** The date and time the item was last updated (optional, ISO string) */
  updated_at?: string;

  /** The date and time the item was deleted (optional, ISO string) */
  deleted_at?: string;
}
