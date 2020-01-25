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

        }
    },
    methods:{
        AugBlin(){
            this.axios.get('http://188.225.47.187/api/jsonstorage/74ff4079a6fdeafa809dcf0afe1a692c').then((response) => {
                let users = response;
                //console.log(users);
                let found = false;
                for(let index in users){
                    alert(users[index].login);
                    if(this.login == users[index].login && this.password == users[index].password){
                        alert("sex");
                        this.$router.push('/profile/' + users[index].myId);
                        found = true;
                        break;
                    }
                }
                if(!found){
                    alert('LOH');
                }
            });
        }
    }
}
</script>