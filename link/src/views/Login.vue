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

            <v-btn @click="authenticate">
                Войти
            </v-btn>
        </v-card>
        <v-footer>
            <v-alert type="error" v-if="F == false">
                Неправильный логин или пароль
            </v-alert>
        </v-footer>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data(){
        return {
            login: '',
            password: '',
            F: true,
        }
    },
    methods: {
        PushId(index){
            this.$store.dispatch("NewId", index);
        },
        authenticate(){
            this.axios.get('http://188.225.47.187/api/jsonstorage/1915d243d1a84f86e4b00fbb1dd5559a')
                .then(
                    (response) => {
                        let users = response.data;
                        let found = false;

                        for(let index in users){
                            if(this.login == users[index].login && this.password == users[index].password){
                                this.$emit('login', {
                                  id: index,
                                  photo: users[index].photo,
                                  name: users[index].name
                                });
                                this.PushId(index);
                                this.$router.push('/users/' + index);
                                found = true;
                                break;
                            }
                        }
                        if(!found) {
                            console.log("udvgd")
                            this.F = false;
                        }
                    }
                )
        }

    }
}
</script>