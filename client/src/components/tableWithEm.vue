<template>
    <div>
        <vs-table
        v-model="selected"
        >
        <template #thead>
          <vs-tr>
            <vs-th class="check">
              <vs-checkbox
                :indeterminate="selected.length == users.length" v-model="allCheck"
                @change="selected = $vs.checkAll(selected, users)"
              />
            </vs-th>
            <vs-th>
              ID
            </vs-th>
            <vs-th>
              Full name
            </vs-th>
            <vs-th>
              Role
            </vs-th>
            <vs-th>
              Business location
            </vs-th>
            <vs-th>
              Email
            </vs-th>
            <vs-th>
              Phone
            </vs-th>
            <vs-th>
              Hourly rate
            </vs-th>
          </vs-tr>
        </template>
        <template #tbody>
          <vs-tr
            :key="i"
            v-for="(tr, i) in users"
            :data="tr"
            :is-selected="!!selected.includes(tr)"
          >
            <vs-td checkbox>
            <vs-checkbox :val="tr" v-model="selected" />
            </vs-td>
            <vs-td>
              {{ i }}
            </vs-td>
            <vs-td>
            {{ tr.firstName }}
            </vs-td>
            <vs-td>
            {{ tr.role }}
            </vs-td>
            <vs-td>
            {{ tr.location }}
            </vs-td>
            <vs-td>
            {{ tr.workEmail }}
            </vs-td>
            <vs-td>
            {{ tr.workPhone }}
            </vs-td>
            <vs-td>
            {{ tr.rate }}/h
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
            <!-- <span class="data">
        <pre>
            {{ selected }}
        </pre>
        </span> -->
    </div>
</template>

<script>
export default {
    data:() => ({
        allCheck: false,
    }),
    computed: {
        users() {
            return this.$store.state.users
        },
        selected: {
            get() {
                return this.$store.state.selected
            },
            set(val) {
                this.$store.commit('addSelected', val);
            }
        }
    },
    mounted() {
        this.getTable()
    },
    methods: {
        getTable() {
            this.$store.dispatch('getUsers');
        }
    }
    }
  </script>


<style scoped>
.vs-checkbox-content >>> .vs-icon-check span .line1 {
    width: 6px;
    bottom: -2px;
    height: 3px;
}
.vs-checkbox-content >>> .vs-icon-check span {
    width: 7px;
    height: 12px;
    margin-top: -3px;
}
.vs-checkbox-content >>> .vs-icon-check.indeterminate span {
    width: 10px;
    height: 2px;
    margin-top: 0px;
}
.vs-table__td {
    text-align: left;
}
.vs-table__tr >>> .vs-table__th.check {
    width: 40px !important;
}
</style>