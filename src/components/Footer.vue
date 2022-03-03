<template lang="">
  <footer>
    <div class="footer">
      <div v-if="footerCategories" class="footer-categories">
        <h3 class="title">categories</h3>
        <ul>
          <li v-for="category in footerCategories"><a href="">{{category.name}}</a></li>
        </ul>
      </div>
      <div class="footer-contact">
        <h3 class="title">contact us</h3>
        <p class="contact-details">
          Bashoura 1526, Fouad Chehab Avenue<br />
          Beirut Central Building<br />
          Blocs B and C<br /><br />

          Beirut. P.O. Box 175051<br />
          T: +961 3 800111<br />
          info@touch.com.lb
        </p>
      </div>
    </div>
    <div class="copy-right">Copyright &copy; 2021 Kingdomac. All Rights Reserved</div>
  </footer>
</template>
<script>
import { computed } from "@vue/reactivity";
import { useStore } from "vuex";
export default {
  setup() {
    const { state } = useStore();
    const footerCategories = computed(() => state.category.categories);
    return { footerCategories };
  },
};
</script>
<style lang="scss" scoped>
.footer {
  margin-top: 30px;
  border-top: 2px solid var(--clr-blue);
  padding: 20px 10px;
  display: flex;
  gap: 2rem;

  .footer-categories {
    max-width: 50%;
    .title {
      text-transform: uppercase;
      background-color: var(--clr-blue-light);
      padding: 0.5em;
      color: white;
    }
    ul {
      padding-left: 10px;
      padding-top: 10px;
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      justify-content: flex-start;

      li {
        flex-basis: 30%;
        width: 35%;
        min-width: 220px;
        &::before {
          content: "- ";
        }
      }
    }
  }

  .footer-contact {
    width: 50%;
    h3 {
      border-bottom: 1px solid var(--clr-blue-light);
      padding-bottom: 10px;
      margin-top: 5px;
      text-transform: uppercase;
      font-weight: bold;
    }
    .contact-details {
      font-size: var(--f-300);
      margin-top: 5px;
    }
  }
}

@media screen and (max-width: 40rem) {
  .footer {
    flex-direction: column;
    gap: 1rem;
    .footer-categories {
      max-width: 100%;
      ul {
        display: flex;
        gap: 0.3rem;
        li {
          flex-basis: 40%;
        }
      }
    }
  }
  .footer-contact {
    width: 100% !important;
    margin-top: 0px;
  }
}
.copy-right {
  text-align: center;
  color: var(--clr-gray);
  font-size: 12px;
  padding-bottom: 10px;
  padding-top: 10px;
}
</style>
