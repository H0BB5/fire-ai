interface IReminder {
  customerName?: string;
  address?: string;
  title: string;
  body?: string;
  status?: string;
  expirationDate?: Date;
}

export async function sendEmail(reminder: IReminder) {
  // log the data for the email reminder
  console.log("sending email reminder", reminder);

  return { response: "[API_NOTIFICATIONS] Notifications sent!" };
}
