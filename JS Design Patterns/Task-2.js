class UserBuilder {
  constructor() {
    this.user = {};
  }

  setName(name) {
    this.user.name = name;
    return this;
  }

  setEmail(email) {
    this.user.email = email;
    return this;
  }

  setRole(role) {
    this.user.role = role;
    return this;
  }

  build() {
    return this.user;
  }
}

const user = new UserBuilder()
  .setName("John Doe")
  .setEmail("John.Doe@ex.com")
  .setRole("admin")
  .build();

console.log(user);
