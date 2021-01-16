<template>
  <b-form @submit="onSubmit" @reset="onReset"  >
    <b-form-group
      label="Email address:"
    >
      <b-form-input
        v-model="emailInfo.email"
        type="email"
        placeholder="Enter email"
        required
      ></b-form-input>
    </b-form-group>

    <b-form-group label="Name:" >
      <b-form-input
        v-model="emailInfo.name"
        placeholder="Enter name"
        required
      ></b-form-input>
    </b-form-group>

    <b-form-group  label="Surname:" >
      <b-form-input
        v-model="emailInfo.surname"
        placeholder="Enter surname"
        required
      ></b-form-input>
    </b-form-group>

    <b-form-group  label="Patronymic:" description="Optional field">
      <b-form-input
        v-model="emailInfo.patronymic"
        placeholder="Enter patronymic"

      ></b-form-input>
    </b-form-group>
    <b-button type="submit" variant="success" class="m-1">Submit</b-button>
    <b-button type="reset" variant="warning" class="m-1">Reset</b-button>
    <b-button @click="onRemove" variant="danger" class="m-1" v-if="listVal">Delete</b-button>
  </b-form>
</template>

<script>
    import $ from "jquery";

    export default {
        name: "EmailForm",
        props: ['info', 'removeId', 'addNew'],
        data(){
            let resetInfo = JSON.parse(JSON.stringify(this.info));
            let emailInfo;
            let listVal = true;
            if(this.info != null) emailInfo = JSON.parse(JSON.stringify(this.info));
            else {
                emailInfo = {
                    name: '',
                    surname: '',
                    patronymic: '',
                    email: ''
                };
                listVal = false;
            }
            return {
                resetInfo: resetInfo, emailInfo: emailInfo, listVal: listVal
            }
        },
        methods: {
            onSubmit(event) {
                event.preventDefault();
                if(this.emailInfo._id == null) { this.onSubmitNew(); return; }
                $.ajax({
                    type: 'PUT',
                    url: 'http://localhost:4000/emails/set',
                    data: this.emailInfo,
                    success: (data) => {
                        this.emailInfo = data;
                        this.resetInfo = JSON.parse(JSON.stringify(data));
                    },
                    error: (xhr, status, err) =>
                        console.error(xhr.responseText)
                });
            },
            onSubmitNew(){
                $.ajax({
                    type: 'POST',
                    url: 'http://localhost:4000/emails/add',
                    data: this.emailInfo,
                    success: (data) => {
                        this.emailInfo.name = '';
                        this.emailInfo.surname = '';
                        this.emailInfo.email = '';
                        this.emailInfo.patronymic = '';
                        this.addNew(data);
                    },
                    error: (xhr, status, err) =>
                        console.error(xhr.responseText)
                });
            },
            onReset(event) {
                event.preventDefault();
                this.emailInfo.name = this.resetInfo.name;
                this.emailInfo.surname = this.resetInfo.surname;
                this.emailInfo.patronymic = this.resetInfo.patronymic;
                this.emailInfo.email = this.resetInfo.email;
            },
            onRemove(){
                const id = this.emailInfo._id;
                $.ajax({
                    type: 'DELETE',
                    url: `http://localhost:4000/emails/delete/${id}`,
                    success: (data) => {
                        this.removeId(id);
                    },
                    error: (xhr, status, err) =>
                        console.error(xhr.responseText)
                });
            }
        }
    }
</script>

<style scoped>

</style>
