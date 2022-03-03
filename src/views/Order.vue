<template lang="">
  <div v-if="orderState.order.number">
    <div class="order-summary">
      <h3 class="greeting">thanks for your order</h3>
      <p v-if="orderState.order.created_at" class="order-date">
        purchased at: {{ formatDate(orderState.order.created_at) }}
      </p>
      <div class="order-status">
        <div :class="orderState.order.status === orderState.statuses.TO_BE_SHIPPED ? 'active' : ''">
          <div>
            <span class="material-icons-outlined">
            local_convenience_store
            </span>
          </div>
          <div>
            To be shipped
          </div>
        </div>
        <div :class="orderState.order.status === orderState.statuses.SHIPPED ? 'active' : ''">
          <div>
            <span class="material-icons-outlined">
            local_shipping
            </span>
          </div>
          <div>
            Shipped
          </div>
        </div>
      </div>
      <p class="p1" v-if="orderState.order.status === orderState.statuses.TO_BE_SHIPPED">Your item(s) will be shipped soon!</p>
      <p class="p2">
        Your order ID is <span class="order-number">#{{ orderState.order.number }}</span>.
         <p>An email was sent to <span class="order-email">{{ orderState.order.buyer_email }}</span>
          with your order details.</p>
      </p>
      <p class="important noprint">
        <span class="material-icons-outlined">label_important</span>Please save your order ID as a reference to follow up the status of your order
      </p>
    </div>

    <div class="order-items">
      <h3 class="greeting">Order Details</h3>
      <div class="buyer-info">

          <div class="row-info">
            <div class="label">Full Name:</div>
            <div class="label-value">{{ orderState.order.buyer_name }}</div>
          </div>
          <div class="row-info">
            <div class="label">Email:</div>
            <div class="label-value">{{ orderState.order.buyer_email }}</div>
          </div>
          <div class="row-info">
            <div class="label">Phone:</div>
            <div class="label-value">{{ orderState.order.buyer_phone }}</div>
          </div>
          <div class="row-info">
            <div class="label">Shipping Address:</div>
            <div class="label-value">{{ orderState.order.buyer_address }}</div>
          </div>
      </div>
      <div>
        <table class="order-tbl">
          <tr>
            <th>item</th>
            <th>qty</th>
            <th>price</th>
            <th>subtotal</th>
          </tr>
          <tr v-for="item in orderState.order.products" :key="item.id">
            <td>{{ item.name }}</td>
            <td>{{ item.quantity }}</td>
            <td>${{ item.purchased_price }}</td>
            <td>${{ item.quantity *  item.purchased_price }}</td>
          </tr>
          <tr>
            <td colspan="4" class="order-total">
              total: <span>${{ orderState.order.total  }}</span>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, toRefs, onMounted } from "vue";
import { showOrder } from "@/services/orderService";
import useStr from "@/composables/useStr";
import { useStore } from "vuex";
import { onBeforeRouteUpdate, useRouter } from "vue-router";
export default {
  props: {
    orderNumber: {
      type: String,
    },
  },
  setup(props) {
    const { orderNumber } = toRefs(props);
    const { commit } = useStore();
    const router = useRouter();
    const orderState = reactive({
      order: {},
      statuses: {
        TO_BE_SHIPPED: 3,
        SHIPPED: 4,
      },
    });
    const { getPrice, formatDate } = useStr();

    const getOrder = async () => {
      try {
        commit("SET_IS_LOADING", true);
        const res = await showOrder(orderNumber.value);
        const result = await res.data;
        orderState.order = result.data;
        console.log(result.data);
      } catch (error) {
      } finally {
        commit("SET_IS_LOADING", false);
      }
    };

    onMounted(async () => {
      await getOrder();
    });

    return { orderState, getPrice, formatDate };
  },
};
</script>
<style lang="scss" scoped>
.order-summary {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid var(--clr-blue);
  line-height: 20px;
  .greeting {
    text-transform: uppercase;
    font-size: var(--f-500);
    color: var(--clr-green);
  }
  .p1 {
    margin-top: 10px;
    font-size: var(--f-400);
  }
  .p2 {
    margin-top: 10px;
    line-height: 30px;
  }
  .order-email {
    color: var(--clr-green);
  }

  .order-number {
    color: var(--clr-blue-light);
    text-transform: none;
    font-weight: bold;
  }
  .important {
    display: flex;
    align-items: center;
    color: var(--clr-red);
    margin-top: 5px;
    font-size: var(--f-200);
  }

  .order-date {
    text-transform: uppercase;
    color: gray;
    font-size: var(--f-200);
    margin-top: 10px;
  }
}

.order-items {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid var(--clr-blue);
  line-height: 20px;
  .greeting {
    text-transform: uppercase;
    font-size: var(--f-500);
    color: var(--clr-blue-light);
  }
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
  }

  .order-total {
    text-transform: uppercase;
    font-weight: bold;
    padding: 10px;
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

.buyer-info {
  background-color: var(--clr-gray);
  padding: 10px 10px;
  margin-top: 10px;
}
.row-info {
  display: flex;
  flex-wrap: wrap;
  gap: 0.2rem;
  .label {
    font-weight: bold;
    font-size: var(--f-200);
  }
  .label-value {
    font-size: var(--f-200);
  }
}
</style>
