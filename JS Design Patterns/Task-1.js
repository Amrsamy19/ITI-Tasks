class Notifier {
  send(_) {
    throw new Error("Method not implemented.");
  }
}

class EmailNotifier extends Notifier {
  send(message) {
    console.log(`Sending email with message: ${message}`);
  }
}

class SMSNotifier extends Notifier {
  send(message) {
    console.log(`Sending SMS with message: ${message}`);
  }
}

const Notiyfiers = {
  EMAIL: () => {
    return new EmailNotifier();
  },
  SMS: () => {
    return new SMSNotifier();
  },
};

const emailNotifier = Notiyfiers.EMAIL();
emailNotifier.send("Hello via Email!");

const smsNotifier = Notiyfiers.SMS();
smsNotifier.send("Hello via SMS!");
