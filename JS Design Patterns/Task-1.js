class Notifier {
  send(message) {
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

const createNotifier = (type) => {
  switch (type) {
    case "email":
      return new EmailNotifier();
    case "sms":
      return new SMSNotifier();
    default:
      throw new Error("Invalid notifier type.");
  }
};

const emailNotifier = createNotifier("email");
emailNotifier.send("Hello via Email!");

const smsNotifier = createNotifier("sms");
smsNotifier.send("Hello via SMS!");
