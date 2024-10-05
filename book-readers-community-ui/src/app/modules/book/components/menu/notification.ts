export  interface Notification {
  status?: 'BORROWED' |'RETURNED' | 'RETURN_APPROVED'
  message?: string;
  title?: string;
}
