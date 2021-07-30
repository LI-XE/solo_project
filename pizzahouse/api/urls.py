from django.urls import path,include
from rest_framework import routers

from .views import *

route = routers.DefaultRouter()
route.register('cart',MyCart,basename="MyCart")
route.register('orders',OldOrders,basename="orders")
route.register('category',CatagoryView,basename="CatagoryViewset")

urlpatterns = [
    path("",include(route.urls)),
    path("profile/",ProfileView.as_view(),name="profile"),
    path("register/",RegisterView.as_view(),name="register"),
    path("product/",ProductView.as_view(),name="product"),
    path("product/<int:id>/",ProductView.as_view(),name="productdetals"),
    path("addtocart/",AddtoCart.as_view(),name="addtocart"),
    path("updatecart/",Updatecart.as_view(),name="updatecart"),
    path("editcart/",Editcart.as_view(),name="editcart"),
    path("deletecartproduct/",Deletecartproduct.as_view(),name="deletecartproduct"),
    path("deletecart/",Deletecart.as_view(),name="deletecart"),
    path("updateuser/",Updateuser.as_view(),name="updateuser"),
    path("updateprofile/",Updateprofile.as_view(),name="updateprofile"),
]