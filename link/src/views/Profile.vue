<template>   
    <div>
        <v-row class="text-left">
            <v-col cols="10">
                <h1 class="green--text text--darken-2">
                    <v-icon large color="green darken-2">mdi-account-outline</v-icon>
                    {{Name}}
                </h1>
            </v-col>
        </v-row>
        <v-row class="text-left">
            <v-col cols="2">
                <img :src="Picture()" style="max-width: 100%">
            </v-col>
            <v-col cols="10" class="text-left">
                <p>
                    Веб-сайт: <a href="" target="_blank">{{WebSite}}</a>
                </p>
                <p>
                    E-mail: <a href="mailto:...">{{Email}}</a>
                </p>
                <p>
                    Город: {{Home}}
                </p>
                <p>
                    Место работы: {{WorkingPlace}}
                </p>
            </v-col>
        </v-row>
        <v-list class="text-left">
            <v-divider class="mb-3"/>
            <h2 class="ml-3">Публикации</h2>
                <v-card v-for="post in Posts"   :key="post.id" class="mb-3 ml-3 mt-3" width="1000px">
                    <v-list-item>
                        <v-list-item-avatar class="tile">
                            <img :src="Picture()">
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-title>
                                {{post.title}}
                            </v-list-title>
                            <v-list-item-subtitle>
                                автор {{Name}}
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-card-text>
                        {{post.body}}
                    </v-card-text>
                    <v-flex xs12 offset-xs10>   
                        <v-btn text icon class="ml-2 mb-2 text-xs-right">
                            <v-icon>mdi-heart</v-icon>
                        </v-btn>    
                        <v-btn text icon class="ml-2 mb-2 text-xs-right">   
                            <v-icon>mdi-bookmark</v-icon> 
                        </v-btn>
                        <v-btn text icon class="ml-2 mb-2 text-xs-right">
                            <v-icon>mdi-share-variant</v-icon>       
                        </v-btn>
                    </v-flex>
                </v-card>
        </v-list>
    </div>
</template>

<script>
export default {
    data(){
        return{
            userID: this.$route.params.id,
            WebSite: '',
            Name: '',
            Email: '',
            WorkingPlace: '',
            Home: '',
            Posts: [],
        }
    },
    mounted(){
        this.Initializing();
    },
    watch:{
        $route(){
            this.Initializing();
        },
        immediate: true,
    },
    methods: {
        Initializing(){
            this.$axios.get(`http://jsonplaceholder.typicode.com/users/${this.$route.params.id}`).then((response) =>{  
                this.WebSite = response.data.website;
                this.Name = response.data.name;
                this.Email = response.data.email;
                this.WorkingPlace = response.data.company.name;
                this.Home = response.data.address.city;
            })
            this.$axios.get(`http://jsonplaceholder.typicode.com/posts?userId=${this.$route.params.id}`).then((response) =>{  
                console.log("loading posts")
                this.Posts = response.data;
            })
        },
        Picture(){
            return "https://randomuser.me/api/portraits/men/" + this.userID + ".jpg";
        }
    }
}
</script>