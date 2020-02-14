<template>
    <div>
        <v-row>
            <v-col cols="10" class="text-left">
                <h1 class="green--text text--darken-2">
                    <v-icon large color="green darken-2">mdi-account-outline</v-icon>
                    {{userData.name}}
                    <v-btn color="green" @click="ChangeInfo">Редактировать</v-btn>
                </h1>
            </v-col>
        </v-row>
        <v-row class="text-left">
            <v-col cols="2">
                <img :src="userData.photo" style="max-width: 100%">
            </v-col>
            <v-col cols="10" class="text-left">
                <p>
                    Веб-сайт: <a :href="'http://'+ userData.website" target="_blank">{{userData.website}}</a>
                </p>
                <p>
                    E-mail: <a :href="'mailto:' + userData.email">{{userData.email}}</a>
                </p>
                <p>
                    Город: {{userData.city}}
                </p>
                <p>
                    Место работы: {{userData.company}}
                </p>
            </v-col>
        </v-row>
        <v-divider></v-divider>
        <div class="mt-5">
            <h2 class="text-left mb-7">Публикации</h2>
            <v-row v-if="$route.params.id == myId" class="text-left mb-10">
                <v-col cols="12" sm="10">
                    <v-text-field outlined label="Заголовок" v-model="newPostTitle"></v-text-field>
                    <v-text-field outlined label="Текст" v-model="newPostBody"></v-text-field>
                    <v-btn @click="send">Опубликовать</v-btn>
                </v-col>
            </v-row>


            <v-row>

                <v-col cols="12" sm="10" v-for="post in posts" :key="post.body">
                    <v-card max-width="1000px" class="text-left pa-3 mb-8">
                        <v-list-item>
                            <v-list-item-avatar>
                                <img :src="userData.photo">
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title class="font-weight-bold">{{post.title}}</v-list-item-title>
                                <v-list-item-subtitle>автор {{userData.name}}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>

                        <v-card-text class="pl-12 body-1">
                            <pre style="white-space: pre-wrap; "> {{post.body}} </pre>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
        
                            <v-btn icon>
                                <v-icon>mdi-heart</v-icon>
                            </v-btn>
                            <v-btn icon>
                                <v-icon>mdi-bookmark</v-icon>
                            </v-btn>
                            <v-btn icon>
                                <v-icon>mdi-share-variant</v-icon>
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>

            </v-row>

        </div>
    </div>
</template>




<script>
export default {
    name: 'Profile',
    props: ["myId"],

    data(){
        return {
            posts: [],
            userData: {},
            newPostTitle: '',
            newPostBody: ''
        } 
    },
    methods: {
        // Получить все посты
        ChangeInfo(){
            console.log("pushing")
            this.$router.push('/chInf');
        },
        getPosts(){
            this.axios.get('http://188.225.47.187/api/jsonstorage/b743b81f04b63051664ff752616e146e')
                .then((response)=>{
                    // Цикл для фильтрации. 
                    for(let post of response.data){
                        // Берем только те посты, у которых userId совпадает с текущим Id
                        if(post.userId == this.$route.params.id)
                            // unshift - это добавление в начало
                            // для того, чтобы более новые посты были вверху списка
                            this.posts.unshift(post);
                    }
                })
        },
        getUserData(){
            this.axios.get('http://188.225.47.187/api/jsonstorage/1915d243d1a84f86e4b00fbb1dd5559a')
                .then((response)=>{
                    let userList = response.data;
                    this.userData = userList[this.$route.params.id]
                })
        },

        // Отправляем новый пост
        send(){
            // Для начала получим весь актуальный JSON постов
            this.axios.get('http://188.225.47.187/api/jsonstorage/b743b81f04b63051664ff752616e146e')
                .then((response)=>{
                    // тут у нас будет массив всех постов на текущий момент
                    let posts = response.data;

                    // Создаем объект для нового поста, его будем добавлять в массив,
                    // чтобы опубликовать пост
                    let newPost = {
                        userId: this.myId,
                        title: this.newPostTitle,
                        body: this.newPostBody
                    }

                    // добавим в полученный массив новый пост
                    posts.push(newPost);

                    // отправим обновленный массив всех постов на сервер для хранения
                    this.axios.put('http://188.225.47.187/api/jsonstorage/b743b81f04b63051664ff752616e146e', posts);

                    // добавим пост в массив постов, отображаемых на странице
                    // unshift добавляет в начало массива
                    this.posts.unshift(newPost);
                    
                    // сбросим поля ввода поста
                    this.newPostTitle = '';
                    this.newPostBody = '';
                })
        },
    },

    mounted(){
        this.getPosts();
        this.getUserData();
    },
    watch: {
        $route() {
            this.getPosts();
            this.getUserData();
        }
    }
}
</script>