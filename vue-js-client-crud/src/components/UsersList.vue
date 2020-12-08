<template>
  <v-row align="center" class="list px-3 mx-auto">
    <v-col cols="12" md="8">
      <v-text-field v-model="username" label="Search by Username"></v-text-field>
    </v-col>

    <v-col cols="12" md="4">
      <v-btn small @click="searchUsername">
        Search
      </v-btn>
    </v-col>

    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title>Users</v-card-title>

        <v-data-table
          :headers="headers"
          :items="users"
          disable-pagination
          :hide-default-footer="true"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editUser(item.id)">mdi-pencil</v-icon>
            <v-icon small @click="deleteUser(item.id)">mdi-delete</v-icon>
          </template>
        </v-data-table>

        <v-card-actions v-if="users.length > 0">
          <v-btn small color="error" @click="removeAllUsers">
            Remove All
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import UserDataService from "../services/UserDataService";
export default {
  name: "users-list",
  data() {
    return {
      users: [],
      title: "",
      headers: [
        { text: "Name", align: "start", sortable: false, value: "name" },
        { text: "Username", value: "username", sortable: false },
        { text: "Identification", value: "identification", sortable: false },
        { text: "Password", value: "password", sortable: false },
        { text: "Photo", value: "photo", sortable: false },
        { text: "Status", value: "active", sortable: false },
      ],
    };
  },
  methods: {
    retrieveUsers() {
      UserDataService.getAll()
        .then((response) => {
          this.users = response.data.map(this.getDisplayUser);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveUsers();
    },

    removeAllUsers() {
      UserDataService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    searchUsername() {
      UserDataService.findByUsername(this.username)
        .then((response) => {
          this.users = response.data.map(this.getDisplayUser);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    editUser(id) {
      this.$router.push({ name: "user-details", params: { id: id } });
    },

    deleteUser(id) {
      UserDataService.delete(id)
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    getDisplayUser(user) {
      return {
        id: user.id,
        name: user.name,
        username: user.username,
        identification: user.identification,
        password: user.password,
        photo: user.photo,
        active: user.active? "Active" : "Pending",
      };
    },
  },
  mounted() {
    this.retrieveUsers();
  },
};
</script>

<style>
.list {
  max-width: 750px;
}
</style>