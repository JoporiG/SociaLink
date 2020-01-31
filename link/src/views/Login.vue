<template>
    <div class="d-flex justify-center">
        <v-card width="600px" class="mt-12 pa-10">
            <v-card-title>
                Войдите в аккаунт
            </v-card-title>

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

            <v-btn @click="AugBlin()">
                Войти
            </v-btn>
        </v-card>
    </div>
</template>

<script>
export default {
    data(){
        return {
            password: '',
            login: '',
        }
    },
    methods:{
        AugBlin(){
            this.axios.get('http://188.225.47.187/api/jsonstorage/5aa4845713d4be4dfbbcd435684157d0').then((response) => {
                let users = response.data.users;
                let found = false;
                for(let index in users){
                    if(this.login == users[index].login && this.password == users[index].password){
                        this.$emit('login', index);
                        this.$router.push('/profile/' + users[index].myId);
                        found = true;
                        break;
                    }
                }
                if(!found){
                    alert('Такого пользователя нет!');
                }
            });
        }
    }
}
</script>