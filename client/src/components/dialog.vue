<template>
    <div>
        <vs-dialog v-model="on">
        <template #header>
          <h4 class="not-margin">
            Add <b>Employee</b>
          </h4>
        </template>
        <div class="con-form">
          <h5>Personal</h5>
          <vs-input type="text" border v-model="first" placeholder="First name">
            <template v-if="!first && add" #message-danger>
                Required
            </template>
          </vs-input>
          <vs-input type="text" border v-model="last" placeholder="Last name">
            <template v-if="!last && add" #message-danger>
                Required
            </template>
          </vs-input>
          <vs-input type="text" border v-model="login" placeholder="Login">
            <template v-if="!login && add" #message-danger>
                Required
            </template>
          </vs-input>
          <h5>Contact</h5>
          <vs-input type="tel" border v-model="workPhone" placeholder="Work phone">
             <template v-if="!workPhone && add" #message-danger>
                Required
            </template>
          </vs-input>
          <vs-input type="tel" border v-model="personalPhone" placeholder="Personal phone">
          </vs-input>
           <vs-input type="email" border v-model="workEmail" placeholder="Work Email">
                 <template v-if="validWorkEmail" #message-success>
                Email Valid
                </template>
                <template v-if="!validWorkEmail && workEmail !== ''" #message-danger>
                Email Invalid
                </template>
                <template v-if="!workEmail && add" #message-danger>
                    Required
                </template>
          </vs-input>
           <vs-input type="email" border v-model="personalEmail" placeholder="Personal Email">
                <template v-if="validEmail" #message-success>
                Email Valid
                </template>
                <template v-if="!validEmail && personalEmail !== ''" #message-danger>
                Email Invalid
                </template>
          </vs-input>
          <h5>Employment</h5>
        </div>
        <vs-select
                filter
                placeholder="Business location"
                v-model="location"
                >
                <vs-option label="San Francisco" value="San Francisco">
                San Francisco
                </vs-option>
                <vs-option label="New York" value="New York">
                New York
                </vs-option>
                <vs-option label="Kiev" value="Kiev">
                Kiev
                </vs-option>
                <vs-option label="Dubai" value="Dubai">
                Dubai
                </vs-option>
                <vs-option label="Portland" value="Portland">
                Portland
                </vs-option>
                <vs-option label="Miami" value="Miami">
                Miami
                </vs-option>
                <vs-option label="Sacramento" value="Sacramento">
                Sacramento
                </vs-option>
            </vs-select>
            <vs-select
                filter
                placeholder="Company"
                v-model="Company"
                >
                <vs-option label="SS Sacker" value="SS Sacker">
                SS Sacker
                </vs-option>
                <vs-option label="DT Tersd" value="DT Tersd">
                DT Tersd
                </vs-option>
                <vs-option label="Microsoft Suck" value="Microsoft Suck">
                Microsoft Suck
                </vs-option>
                <vs-option label="Doodle" value="Doodle">
                Doodle
                </vs-option>
                <vs-option label="Doors company" value="Doors company">
                Doors company
                </vs-option>
                <vs-option label="Weracrose DT" value="Weracrose DT">
                Weracrose DT
                </vs-option>
                <vs-option label="Caramento FR" value="Caramento FR">
                Caramento FR
                </vs-option>
            </vs-select>
                <vs-select
                filter
                placeholder="Role"
                v-model="Role"
                >
                <vs-option label="Helper" value="Helper">
                Helper
                </vs-option>
                <vs-option label="Needer" value="Needer">
                Needer
                </vs-option>
                <vs-option label="Vuewier" value="Vuewier">
                Vuewier
                </vs-option>
                <vs-option label="Shower" value="Shower">
                Shower
                </vs-option>
                <vs-option label="Macer" value="Macer">
                Macer
                </vs-option>
                <vs-option label="Boss" value="Boss">
                Boss
                </vs-option>
                <vs-option label="Admin" value="Admin">
                Admin
                </vs-option>
            </vs-select>
                  <vs-input
                type="number"
                v-model="Rate"
                placeholder="Hourly rate"
                />
        <template #footer>
          <div class="footer-dialog">
            <vs-button v-if="!edit" block @click="addUser">
              ADD NEW
            </vs-button>
            <vs-button v-if="edit" block @click="editUser">
              EDIT
            </vs-button>
          </div>
        </template>
      </vs-dialog>
    </div>
</template>

<script>

export default {
  props: [
    'active',
    'edit'
  ],
  data() {
      return {
          workEmail: '',
          personalEmail: '',
          first: '',
          last: '',
          login: '',
          workPhone: '',
          personalPhone: '',
          location: '',
          Company: '',
          Role: '',
          Rate: '',
          add: false

      }
  },
  computed: {
        validWorkEmail() {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.workEmail)
        },
        validEmail() {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.personalEmail)
        },
      on: {
          get() {
              return this.active
          },
          set(val) {
            this.setClosed(val)
          }
          
      },
      validForm() {
          if(this.workEmail && this.validWorkEmail && this.first && this.last && this.login && this.workPhone) return true
          else return false
      },
      dataForm() {
          return {
            workEmail: this.workEmail,
            personalEmail: this.personalEmail,
            firstName: this.first,
            lastName: this.last,
            loginName: this.login,
            workPhone: this.workPhone,
            personalPhone: this.personalPhone,
            location: this.location,
            company: this.Company,
            role: this.Role,
            rate: this.Rate,
          }
      },
      selectEdit() {
        return this.$store.state.selected[0]
      }
  },
  watch:{
      edit(data) {
        if(data) {
            this.workEmail = this.selectEdit.workEmail
            this.personalEmail = this.selectEdit.personalEmail
            this.first = this.selectEdit.firstName
            this.last = this.selectEdit.lastName
            this.login = this.selectEdit.loginName
            this.workPhone = this.selectEdit.workPhone
            this.personalPhone = this.selectEdit.personalPhone
            this.location = this.selectEdit.location
            this.Company = this.selectEdit.company
            this.Role = this.selectEdit.role
            this.Rate = this.selectEdit.rate
        }else {
            this.clearForm()
        }
      }
  },  
  methods: {
    setClosed(val) {
      this.$emit('closed', val)
    },
    sendData() {
        this.axios.post('http://localhost:4000/user/create', this.dataForm)
        .then((response) => {
            this.$store.commit('addNewUser', response.data)
            if(response.data) {
              this.clearForm()
              this.setClosed(false)
            }
        }).catch(err => console.log(err))
    },
    editData() {
        this.axios.put('http://localhost:4000/user/update', 
            {id:this.selectEdit._id, data:{...this.dataForm}}
        )
        .then((response) => {
            this.$store.dispatch('getUsers', response.data)
            if(response.data) {
              this.clearForm()
              this.setClosed(false)
              this.$store.commit('addSelected', [])
              this.$emit('editChange', false)
            }
        }).catch(err => console.log(err))
    },
    addUser() {
        if(this.validForm) {
            this.sendData();
            this.setClosed(false);
        }else{
              this.add = true
        }
    },
    editUser() {
        if(this.validForm) {
            this.editData();
            this.setClosed(false);
        }else{
              this.add = true
        }
    },
    clearForm() {
        this.workEmail = ''
        this.personalEmail = ''
        this.first = ''
        this.last = ''
        this.login = ''
        this.workPhone = ''
        this.personalPhone = ''
        this.location = ''
        this.Company = ''
        this.Role = ''
        this.Rate = ''
        this.add = false
    }
  }
}
</script>
<style lang="stylus" scoped>
 .vs-select-content
    max-width: 100%
    margin-bottom 4px
 .vs-input-parent >>>
    .vs-input
      min-width: 100%
      margin-bottom 4px
 getColor(vsColor, alpha = 1)
        unquote("rgba(var(--vs-"+vsColor+"), "+alpha+")")
    getVar(var)
        unquote("var(--vs-"+var+")")
    .not-margin
      margin 0px
      font-weight normal
      padding 10px
    .con-form
      width 100%
      .flex
        display flex
        align-items center
        justify-content space-between
        a
          font-size .8rem
          opacity .7
          &:hover
            opacity 1
      .vs-checkbox-label
        font-size .8rem
      .vs-input-content
        margin 10px 0px
        width calc(100%)
        .vs-input
          width 100%
    .footer-dialog
      display flex
      align-items center
      justify-content center
      flex-direction column
      width calc(100%)
      .new
        margin 0px
        margin-top 20px
        padding: 0px
        font-size .7rem
        a
          color getColor('primary') !important
          margin-left 6px
          &:hover
            text-decoration underline
      .vs-button
        margin 0px
</style>