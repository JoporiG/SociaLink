<template>
    <div class="d-flex justify-center">
        <v-card width="600px" class="mt-12 pa-10">

            <v-text-field
                label="Введите логин"
                v-model="login"
                outlined
            ></v-text-field>

            <v-text-field
                label="Введите пароль"
                v-model="password"
                outlined
            ></v-text-field>
            <v-text-field
                label="Повторите пароль"
                v-model="confPass"
                outlined
            ></v-text-field>

            <v-btn @click="register()">
                Зарегистрироваться
            </v-btn>
        </v-card>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return {
            login: '',
            password: '',
            confPass: '',
        }
    },
    methods:{
        register(){
            if(this.password == this.confPass){
                let users = [];
                axios.get('http://188.225.47.187/api/jsonstorage/5aa4845713d4be4dfbbcd435684157d0').then((response) => {
                    console.log(response.data.users)
                    users = response.data.users;
                });
                let user = {
                    "myId": users.length + 1,
                    "login": this.login,
                    "password":this.password,
                    "name": this.login,
                    "website":this.login + ".pro",
                    "email": this.login + "@mail.com",
                    "city":"Москва",
                    "company":"Social Link",
                    "photo":"https://mskvienna.ru/files/news_imgs/1567890413.jpg"
                }
                users[users.length] = user;
                this.putter(users);
            } else{
                alert("Пароли не совпадают!");
            }
        },
        putter(users){
            axios.put('http://188.225.47.187/api/jsonstorage/5aa4845713d4be4dfbbcd435684157d0', { "users": users }).then(() => {
            });
            this.$router.push('/login');
        }
    }
}
</script>