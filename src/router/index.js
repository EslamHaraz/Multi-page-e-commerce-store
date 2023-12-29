import Vue from "vue";
import VueRouter from "vue-router";
import LoginView from "../views/DashboardViews/SigninAdminView.vue";
import SignupVew from "../views/SignupUserVew.vue";
import SigninUserView from "../views/SigninUserView.vue";
import BaseLayout from "@/layouts/BaseLayout.vue";
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import EndUserLayout from "@/layouts/EndUserLayout.vue";
import HomeComponent from "@/components/DashboardComponents/HomeComponent.vue";
import ProductsView from "../views/DashboardViews/ProductsView.vue";
import AddProductComponent from "@/components/DashboardComponents/AddProductComponent.vue";
import DeleteProductCopmonent from "@/components/DashboardComponents/DeleteProductCopmonent.vue";
import AddEmployeeComponent from "@/components/DashboardComponents/AddEmployeeComponent.vue";
import DeleteEmployeeComponent from "@/components/DashboardComponents/DeleteEmployeeComponent.vue";
import AddCategoryComponent from "@/components/DashboardComponents/AddCategoryComponent.vue";
import DeleteCategoryComponent from "@/components/DashboardComponents/DeleteCategoryComponent.vue";
import AddOfferComponent from "@/components/DashboardComponents/AddOfferComponent.vue";
import DeleteOfferComponent from "@/components/DashboardComponents/DeleteOfferComponent.vue";
import AddPageComponent from "@/components/DashboardComponents/AddPageComponent.vue";
import ClintsView from "../views/DashboardViews/ClintsView.vue";
import EmployeesView from "../views/DashboardViews/EmployeesView.vue";
import ReportesView from "../views/DashboardViews/ReportesView.vue";
import MessagesView from "../views/DashboardViews/MessagesView.vue";
import PagesView from "../views/DashboardViews/PagesView.vue";
import SettingsView from "../views/DashboardViews/SettingsView.vue";
import OrdresView from "../views/DashboardViews/OrdresView.vue";
import CategoriesView from "../views/DashboardViews/CategoriesView.vue";
import OffersView from "../views/DashboardViews/OffersView.vue";
import AccountSettingView from "@/views/DashboardViews/AccountSettingView.vue";
import PersonalInformationComponent from "@/components/DashboardComponents/PersonalInformationComponent.vue";
import SecuritySettingComponent from "@/components/DashboardComponents/SecuritySettingComponent.vue";
import StyleSettingComponent from "@/components/DashboardComponents/StyleSettingComponent.vue";
import ForgetPasswordView from "@/views/ForgetPasswordView.vue";
import HomeView from "@/views/EndUserViews/HomeView.vue";
import ContactUsView from "@/views/EndUserViews/ContactUsView.vue";
import PageView from "@/views/EndUserViews/PageView.vue";
import DeletePageComponent from "@/components/DashboardComponents/DeletePageComponent.vue";
import MyAccountView from "@/views/EndUserViews/MyAccountView.vue";
import InformationPresonalComponent from "@/components/EndUserComponents/InformationPresonalComponent.vue";
import SettingSecurityComponent from "@/components/EndUserComponents/SettingSecurityComponent.vue";
import SettingStyleComponent from "@/components/EndUserComponents/SettingStyleComponent.vue";
import PurchasesComponent from "@/components/EndUserComponents/PurchasesComponent.vue";
import AddProductUserComponent from "@/components/EndUserComponents/AddProductUserComponent.vue";
import ProductView from "@/views/EndUserViews/ProductView.vue";
import SellerProductsView from "@/views/EndUserViews/SellerProductsView.vue";
import CheckoutView from "@/views/EndUserViews/CheckoutView.vue";
import EditOrderView from "@/views/DashboardViews/EditOrderView.vue";
import userMessages from "@/views/EndUserViews/userMessages.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/Dashboard",
    name: "DashboardLayout",
    component: DashboardLayout,
    children: [
      {
        path: "Home",
        name: "Home",
        component: HomeComponent,
      },
      {
        path: "Products",
        name: "Products",
        component: ProductsView,
      },
      {
        path: "AddProduct",
        name: "AddProduct",
        component: AddProductComponent,
      },
      {
        path: "DeleteProduct",
        name: "DeleteProduct",
        component: DeleteProductCopmonent,
      },
      {
        path: "Clints",
        name: "Clints",
        component: ClintsView,
      },
      {
        path: "Employees",
        name: "Employees",
        component: EmployeesView,
      },
      {
        path: "AddEmployee",
        name: "AddEmployee",
        component: AddEmployeeComponent,
      },
      {
        path: "DeleteEmployee",
        name: "DeleteEmployee",
        component: DeleteEmployeeComponent,
      },
      {
        path: "Offers",
        name: "Offers",
        component: OffersView,
      },
      {
        path: "AddOffer",
        name: "AddOffer",
        component: AddOfferComponent,
      },
      {
        path: "DeleteOffer",
        name: "DeleteOffer",
        component: DeleteOfferComponent,
      },
      {
        path: "Reportes",
        name: "Reportes",
        component: ReportesView,
      },
      {
        path: "Messages",
        name: "Messages",
        component: MessagesView,
      },
      {
        path: "Pages",
        name: "Pages",
        component: PagesView,
      },
      {
        path: "AddPage",
        name: "AddPage",
        component: AddPageComponent,
      },
      {
        path: "DeletePage",
        name: "DeletePage",
        component: DeletePageComponent,
      },
      {
        path: "Settings",
        name: "Settings",
        component: SettingsView,
      },
      {
        path: "Ordres",
        name: "Ordres",
        component: OrdresView,
      },
      {
        path: "Categories",
        name: "Categories",
        component: CategoriesView,
      },
      {
        path: "AddCategory",
        name: "AddCategory",
        component: AddCategoryComponent,
      },
      {
        path: "DeleteCategory",
        name: "DeleteCategory",
        component: DeleteCategoryComponent,
      },

      {
        path: "AccountSetting",
        name: "AccountSetting",
        component: AccountSettingView,
        children: [
          {
            path: "PersonalInformation",
            name: "PersonalInformation",
            component: PersonalInformationComponent,
          },
          {
            path: "SecuritySetting",
            name: "SecuritySetting",
            component: SecuritySettingComponent,
          },
          {
            path: "StyleSetting",
            name: "StyleSetting",
            component: StyleSettingComponent,
          },
        ],
      },
      ,
    ],
  },
  {
    path: "/EditOrder/order/:OrderId",
    name: "EditOrder",
    component: EditOrderView,
  },
  {
    path: "/authentication",
    name: "authentication",
    component: BaseLayout,
    children: [
      {
        path: "SignInAdmin",
        name: "LoginView",
        component: LoginView,
      },
      {
        path: "Signupuser",
        name: "SignupView",
        component: SignupVew,
      },
      {
        path: "SigninUser",
        name: "SigninUserView",
        component: SigninUserView,
      },
      {
        path: "ForgetPassword",
        name: "ForgetPassword",
        component: ForgetPasswordView,
      },
    ],
  },
  {
    path: "/",
    name: "EndUserLayout",
    component: EndUserLayout,
    children: [
      {
        path: "home",
        name: "HomeView",
        component: HomeView,
      },
      {
        path: "contactUs",
        name: "ContactUsView",
        component: ContactUsView,
      },
      {
        path: "Page/:pageId",
        name: "Page",
        component: PageView,
      },
      {
        path: "Product/:productId/:CategoryId/:productName",
        name: "Product",
        component: ProductView,
      },
      {
        path: "MyAccount",
        name: "MyAccount",
        component: MyAccountView,
        children: [
          {
            path: "InformationPresonal",
            name: "InformationPresonal",
            component: InformationPresonalComponent,
          },
          {
            path: "SettingSecurity",
            name: "SettingSecurity",
            component: SettingSecurityComponent,
          },
          {
            path: "SettingStyle",
            name: "SettingStyle",
            component: SettingStyleComponent,
          },
          {
            path: "Your-Purchases",
            name: "Purchases",
            component: PurchasesComponent,
          },
          {
            path: "Your-Products",
            name: "SellerProducts",
            component: SellerProductsView,
          },
          {
            path: "AddProduct-User",
            name: "AddProductUser",
            component: AddProductUserComponent,
          },
          {
            path: "Your-Messages",
            name: "userMessages",
            component: userMessages,
          },
        ],
      },
    ],
  },
  {
    path: "/Checkout",
    name: "Checkout",
    component: CheckoutView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
