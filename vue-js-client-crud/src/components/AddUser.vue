<template>
  <div class="submit-form mt-3 mx-auto">
    <p class="headline">Add User</p>

    <div v-if="!submitted">
      <v-form ref="form" lazy-validation>
        <v-text-field
          v-model="user.name"
          :rules="[(v) => !!v || 'Name is required']"
          label="Name"
          required
        ></v-text-field>
        <v-text-field
          v-model="user.username"
          :rules="[(v) => !!v || 'Username is required']"
          label="Username"
          required
        ></v-text-field>
        <v-text-field
          v-model="user.identification"
          :rules="[(v) => !!v || 'Identification is required']"
          label="Identification"
          required
        ></v-text-field>
        <v-text-field
          v-model="user.password"
          :rules="[(v) => !!v || 'Password is required']"
          label="Password"
          required
        ></v-text-field>
        <v-text-field
          v-model="user.photo"
          :rules="[(v) => !!v || 'Photo is required']"
          label="Photo"
          required
        ></v-text-field>
      </v-form>

      <v-btn color="primary" class="mt-3" @click="saveUser">Submit</v-btn>
    </div>

    <div v-else>
      <v-card class="mx-auto">
        <v-card-title>
          Submitted successfully!
        </v-card-title>

        <v-card-subtitle>
          Click the button to add new User.
        </v-card-subtitle>

        <v-card-actions>
          <v-btn color="success" @click="newUser">Add</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import UserDataService from "../services/UserDataService";

export default {
  name: "add-user",
  data() {
    return {
      user: {
        id: null,
        name: "",
        username: "",
        identification: null,
        password: "",
        photo: "",
        active: false
      },
      submitted: false,
    };
  },
  methods: {
    saveUser() {
      var data = {
        name: this.user.name,
        username: this.user.username,
        identification: this.user.identification,
        password: this.user.password,
        photo: this.user.photo,
        active: this.user.active         
      };

      UserDataService.create(data)
        .then((response) => {
          this.user.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    newUser() {
      this.submitted = false;
      this.user = {};
    },
  },
};
</script>

<style>
.submit-form {
  max-width: 300px;
}
</style>