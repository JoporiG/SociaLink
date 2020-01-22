<template>
  <div>
      <v-card class="mb-3 ml-3 mt-3" width="500px" v-for="person in People" :key="person.id">
        <v-list-item>
            <v-list-item-avatar class="tile">
                <img :src="Img(person.id)">
            </v-list-item-avatar>
            <v-divider vertical="true"/>
            <v-list-item-content class="text-left ml-3">
                <v-list-title>
                  {{person.name}}
                </v-list-title>
                <v-list-item-subtitle>
                  {{person.address.city}}
                </v-list-item-subtitle>
                <v-list-item link :to="Link(person.id)">
                  <v-content>
                    <v-icon class="mr-3">mdi-account-badge-horizontal-outline</v-icon>
                    Pereyti
                  </v-content>
                </v-list-item>
            </v-list-item-content>
        </v-list-item>
      </v-card>
  </div>
</template>

<script>
export default {
  data(){
    return {
      People: [],
    }
  },
  methods:{
    Initializing(){
      this.$axios.get('http://jsonplaceholder.typicode.com/users').then((response)=>{
        this.People = response.data;
      })
    },
    Img(id){
      return "https://randomuser.me/api/portraits/men/" + id + ".jpg";
    },
    Link(id){
      return "profile/" + id + "/";
    }
  },
  mounted(){
    this.Initializing();
  },
  watch:{
    $route(){
        this.Initializing();
    }
  },
}
</script>