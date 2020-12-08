<template>
  <div v-if="currentUser" class="edit-form py-3">
    <p class="headline">Edit User</p>

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
          :rules="[(v) => !!v || 'Photo url is required']"
          label="Photo url"
          required
        ></v-text-field>

      <label><strong>Status:</strong></label>
      {{ currentUser.active ? "Active" : "Pending" }}

      <v-divider class="my-5"></v-divider>

      <v-btn v-if="currentUser.active"
        @click="updateActive(false)"
        color="primary" small class="mr-2"
      >
        UnActive
      </v-btn>

      <v-btn v-else
        @click="updateActive(true)"
        color="primary" small class="mr-2"
      >
        Activate
      </v-btn>

      <v-btn color="error" small class="mr-2" @click="deleteUser">
        Delete
      </v-btn>

      <v-btn color="success" small @click="updateUser">
        Update
      </v-btn>
    </v-form>

    <p class="mt-3">{{ message }}</p>
  </div>

  <div v-else>
    <p>Please click on a User...</p>
  </div>
</template>

<script>
import UserDataService from "../services/UserDataService";

export default {
  name: "user",
  data() {
    return {
      currentUser: null,
      message: "",
    };
  },
  methods: {
    getUser(id) {
      UserDataService.get(id)
        .then((response) => {
          this.currentUser = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updateActive(status) {
      var data = {
        id: this.currentUser.id,
        title: this.currentUser.title,
        description: this.currentUser.description,
        active: status,
      };

      UserDataService.update(this.currentUser.id, data)
        .then((response) => {
          this.currentUser.active = status;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updateUser() {
      UserDataService.update(this.currentUser.id, this.currentUser)
        .then((response) => {
          console.log(response.data);
          this.message = "The user was updated successfully!";
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deleteUser() {
      UserDataService.delete(this.currentUser.id)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: "users" });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = "";
    this.getUser(this.$route.params.id);
  },
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>