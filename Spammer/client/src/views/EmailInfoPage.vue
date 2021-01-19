<template>
  <b-container>
    <b-container class="mb-3 mt-3">
      <b-button v-b-toggle.collapse-2 class="mb-1" >Add new email info</b-button>
      <b-collapse id="collapse-2">
        <email-form v-bind:info="null" v-bind:add-new="addNew"></email-form>
      </b-collapse>
    </b-container>
  <b-container>
  <b-list-group >
    <div v-for="emailInfo in emails" class="list-group-item mb-3">
        <email-form v-bind:info="emailInfo" v-bind:remove-id="removeId"></email-form>
    </div>
  </b-list-group>
  </b-container>
  </b-container>
</template>

<script>
  import EmailForm from "./EmailForm.vue";
  import $ from "jquery";

export default {
    name: 'EmailInfoPage',
    components: { EmailForm },
    data(){
        return { emails: [] }
    },
    async mounted(){
        $.ajax({
            type: 'GET',
            url: 'http://localhost:4000/emails',
            success: (data) => {
                this.emails = data;

            },
            error: (xhr, status, err) =>
                console.error(xhr.responseText)
        })
    },
    methods: {
        removeId(id) {
            let aid = this.emails.find(x => x._id == id );
            console.log(this.emails);
            this.emails.splice(aid, 1);
            console.log(this.emails)
        },
        addNew(data){
            this.emails.push(data)
        }
    }
};

</script>
