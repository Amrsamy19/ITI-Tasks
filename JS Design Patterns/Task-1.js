class Notifier {
  send(_) {
    throw new Error("Method not implemented.");
  }
}

class EmailNotification extends Notifier {
  send(message) {
    console.log(`Sending email with message: ${message}`);
  }
}

class SMSNotification extends Notifier {
  send(message) {
    console.log(`Sending SMS with message: ${message}`);
  }
}

const Notiyfiers = {
  EMAIL: () => {
    return new EmailNotification();
  },
  SMS: () => {
    return new SMSNotification();
  },
};

const emailNotifier = Notiyfiers.EMAIL();
emailNotifier.send("Hello via Email!");

const smsNotifier = Notiyfiers.SMS();
smsNotifier.send("Hello via SMS!");
