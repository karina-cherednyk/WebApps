<template>
  <b-container id="app" style="max-width: 100%">
    <b-row class="m-3">
      <p>Write email to addresses: </p>
    </b-row>

    <b-list-group class="m-3">
        <div href="#" v-for="emailInfo in emails" class="list-group-item" >
          <b-row align-h="between">
          <b-col>{{emailInfo.email}}</b-col>
          <b-col><b-form-checkbox v-model="emailInfo.use"   ></b-form-checkbox> </b-col>
          </b-row>
        </div>
    </b-list-group>


    <b-row class="m-3">
      <p>Choose from options: </p>
    </b-row>
    <b-list-group class="m-3">
    <b-list-group-item href="#"
                       v-for="message in messages"
                       @click="setMessage(message.text)"
                       class="messages">
      {{message.text}}
    </b-list-group-item>
    </b-list-group>

    <b-form-input class="m-3" id="userText" v-model="customMessage" v-on:input="setMessage(customMessage)" placeholder="Enter your own message"></b-form-input>

    <b-button  @click="send" variant="primary" class="m-3 col-3">Submit</b-button>

  </b-container>
</template>

<script>
  import $ from "jquery";
  $('.messages').click(function(e) {
      e.preventDefault();
      $(this).addClass('active').siblings().removeClass('active');
  });
  $(".messages").click(function() {
      console.log("i am clicked 2");
  });
    // $(function(){
    //     $('.messages').click(function(e) {
    //         console.log('here')
    //         $(".messages").removeClass("active");
    //         e.preventDefault();
    //         $(e.target).addClass("active");
    //     });
    //     $('#userText').click(function (e) {
    //         console.log('cl');
    //         $(".messages").removeClass("active");
    //
    //     });
    //     $(document).on('click','.delete-order',function() {
    //         alert("YAY");
    //     });
    // });

export default {
  name: 'SendEmailsPage',
    data(){
      return {
          messages: [ ],
          emails: [],
          selectedMessage: null,
          customMessage: ''
      }
    },
    async mounted(){
        $.ajax({
            type: 'GET',
            url: 'http://localhost:4000/emails',
            success: (data) => {
                this.emails = data.map(x => { return  { email: x.email, use: true }; } );
            },
            error: (xhr, status, err) =>
                console.error(xhr.responseText)
        });
        $.ajax({
            type: 'GET',
            url: 'http://localhost:4000/messages',
            success: (data) => {
                this.messages = data;
            },
            error: (xhr, status, err) =>
                console.error(xhr.responseText)
        });
    },
    methods: {
      send(){
          let selectedEmails = this.emails.filter(x => x.use).map(x => x.email);
          $.ajax({
              type: 'POST',
              url: 'http://localhost:4000/messages/send',
              data: {
                  emails: selectedEmails,
                  message: this.selectedMessage
              },
              success: (data) => {
                  alert('Emails sent');
              },
              error: (xhr, status, err) =>
                  console.error(xhr.responseText)
          });
          if(  this.selectedMessage == this.customMessage &&
              !this.messages.map(x => x.text).includes(this.customMessage)) {

              this.customMessage = '';
              $.ajax({
                  type: 'POST',
                  url: 'http://localhost:4000/emails/add',
                  data: {
                      text: this.selectedMessage
                  },
                  success: (data) => {
                     this.messages.push(data);
                  },
                  error: (xhr, status, err) =>
                      console.error(xhr.responseText)
              });
          }
      },
      setMessage(msg){
        this.selectedMessage = msg;
      },

    }
};
</script>
