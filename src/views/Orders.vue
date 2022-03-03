<template lang="">
  <div class="container">
    <h3 class="title">
      <span class="material-icons-outlined" v-pre>
      list_alt
      </span>
      <div>
        orders list
      </div>
    </h3>
    <div v-if="orders.length" v-for="order in orders" :key="order.id" class="order-items">
      <div class="order-status">
        <div :class="order.status === statuses.TO_BE_SHIPPED ? 'active' : ''">
          <div>
            <span class="material-icons-outlined" v-pre>
            local_convenience_store
            </span>
          </div>
          <div>
            To be shipped
          </div>
        </div>
        <div :class="order.status === statuses.SHIPPED ? 'active' : ''">
          <div>
            <span class="material-icons-outlined" v-pre>
            local_shipping
            </span>
          </div>
          <div>
            Shipped
          </div>
        </div>
      </div>
      <div>
        <table class="order-tbl">
          <tr>
            <th colspan="4">
              <div class="order-header">
                <div>
                  <router-link :to="{name: 'order', params: {orderNumber : order.number} }">
                   #{{ order.number }}
                   </router-link>
                </div>
                <div>
                   {{ formatDate(order.created_at) }}
                </div>
              </div>
            </th>
          </tr>
          <tr>
            <th>item</th>
            <th>qty</th>
            <th>price</th>
            <th>subtotal</th>
          </tr>
          <tr v-for="item in order.products" :key="item.id">
            <td>{{ item.name }}</td>
            <td>{{ item.quantity }}</td>
            <td>${{ item.purchased_price }}</td>
            <td>${{ item.quantity *  item.purchased_price }}</td>
          </tr>
          <tr>
            <td colspan="4" class="order-total">
              total: <span>${{ order.total  }}</span>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div v-else-if="!orders.length && !isLoading" class="no-orders">
      There are no orders to show.
    </div>
  </div>
</template>
<script>
import { reactive, ref, onMounted, computed } from "vue";
import { getOrders } from "@/services/orderService";
import { useStore } from "vuex";
import useStr from "@/composables/useStr";
export default {
  setup() {
    const orders = ref([]);
    const { state, commit } = useStore();
    const { getPrice, formatDate } = useStr();
    const statuses = reactive({
      TO_BE_SHIPPED: 3,
      SHIPPED: 4,
    });

    async function getAllOrders() {
      try {
        commit("SET_IS_LOADING", true);
        const res = await getOrders();
        const result = res.data;
        orders.value = result.data;
      } catch (error) {
      } finally {
        commit("SET_IS_LOADING", false);
      }
    }

    onMounted(() => {
      getAllOrders();
    });

    return {
      orders,
      getPrice,
      formatDate,
      statuses,
      isLoading: computed(() => state.isLoading),
    };
  },
};
</script>
<style lang="scss" scoped>
.title {
  display: flex;
  align-items: center;
  gap: 0.2rem;
  text-transform: uppercase;
  font-size: var(--f-400);
  color: var(--clr-blue-light);
}
.order-items {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid var(--clr-blue);
  line-height: 20px;
}

.order-tbl {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  tr:nth-of-type(odd) {
    background: #eee;
  }

  th {
    background: #333;
    color: white;
    font-weight: 500;
  }

  td,
  th {
    padding: 6px;
    text-align: left;
    border: 1px solid #ccc;
    text-transform: uppercase;
    font-size: var(--f-200);
  }

  .order-total {
    text-transform: uppercase;
    font-weight: bold;
    padding: 10px;
  }

  .order-header {
    display: flex;
    justify-content: space-between;
    padding: 5px 10px;
    background-color: var(--clr-blue-light);
  }
}

.order-status {
  display: flex;
  font-size: var(--f-200);
  gap: 1rem;
  color: var(--clr-blue-light);
  div {
    text-align: center;
  }

  .active {
    color: var(--clr-green);
  }
}
.no-orders {
  padding-top: 2rem;
}
</style>
