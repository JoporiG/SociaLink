<template>
    <div>
        <v-row>
            <v-col cols="12" sm="5" v-for="(user, index) in users" :key="index">
                <v-card class="pa-3">
                    <v-list-item>
                        <v-list-item-avatar color="grey" size="80">
                            <img :src="user.photo">
                        </v-list-item-avatar>
                        <v-divider vertical class="mr-4"></v-divider>
                        <v-list-item-content class="text-left">
                            <v-list-item-title class="font-weight-bold">{{user.name}}</v-list-item-title>
                            <v-list-item-subtitle>{{user.city}}</v-list-item-subtitle>

                            <v-btn color="green" outlined class="mt-3" :to="'/users/' + index" >
                                <v-icon class="mr-3">mdi-account-badge-horizontal-outline</v-icon> Перейти в профиль
                            </v-btn>
                        </v-list-item-content>
                    </v-list-item>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    name: 'Users',
    data(){
        return {
            users: []
        }
    },
    methods: {
        getUsers(){
            this.axios.get('http://188.225.47.187/api/jsonstorage/1915d243d1a84f86e4b00fbb1dd5559a')
                .then(
                    (response)=>{
                        this.users = response.data;
                    }
                )
        }
    },
    mounted(){
        this.getUsers();
    }
}
</script>