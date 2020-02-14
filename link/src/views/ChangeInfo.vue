<template>
    <div class="d-flex justify-center">
        <v-card width="600px" class="mt-12 pa-10">
            <v-card-title>
                Изменение данных
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

            <v-text-field
                label="Введите полное имя"
                v-model="name"
                outlined
            ></v-text-field>

            <v-text-field
                label="Введите email"
                v-model="email"
                outlined
            ></v-text-field>

            <v-text-field
                label="Введите веб-сайт"
                v-model="website"
                outlined
            ></v-text-field>

            <v-text-field
                label="Введите город"
                v-model="city"
                outlined
            ></v-text-field>

            <v-text-field
                label="Где Вы работаете"
                v-model="company"
                outlined
            ></v-text-field>

            <v-text-field
                label="Введите ссылку на фото"
                v-model="photo"
                outlined
            ></v-text-field>

            <v-btn @click="Saving">
                Сохранить
            </v-btn>
        </v-card>
    </div>
</template>

<script>
export default {
    name: 'ChangeInfo',
    data(){
        return {
            // Свойства для реактивной привязки текстовых полей
            login: '',
            password: '',
            name: '',
            website: '',
            email: '',
            city: '',
            company: '',
            photo: '',
            myId: '',
        }
    },

    methods: {

        Saving(){
            this.myId = this.$store.getters.getId
            this.axios.get('http://188.225.47.187/api/jsonstorage/1915d243d1a84f86e4b00fbb1dd5559a')
                .then( (response)=>{
                    // Это список всех зарегистрированных пользователей
                    let userList = response.data;
                    // Создаем нового пользователя в том же формате, что остальные
                    let newUser = {
                        login: this.login,
                        password: this.password,
                        name: this.name,
                        website: this.website,
                        email: this.email,
                        city: this.city,
                        company: this.company,
                        photo: this.photo
                    }
                    userList.splice(this.myId, 1, newUser);
                    // Отправим обновленный массив пользователей на сервер
                    this.axios.put('http://188.225.47.187/api/jsonstorage/1915d243d1a84f86e4b00fbb1dd5559a', userList)
                        .then( 
                            (response)=>{
                                // Если получилось, переводим на страницу входа
                                if(response.data == "ok"){
                                    this.$store.dispatch("NewId", '');
                                    this.$router.push("/login");
                                }
                                else
                                    window.alert('Что-то пошло не так!');
                            } 
                        );
                } )
        }
    }
}
</script>