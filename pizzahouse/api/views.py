import re
from django.http import response
from rest_framework.response import Response
from rest_framework import views,viewsets,generics,mixins
from .models import *
from .serializers import *
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User


class ProductView(generics.GenericAPIView,mixins.ListModelMixin,mixins.RetrieveModelMixin):
    queryset = Product.objects.all().order_by("-id")
    serializer_class=ProductsSerializer
    lookup_field = "id"

    def get(self,request,id=None):
        if id:
            return self.retrieve(request)
        else:
            return self.list(request)

class CatagoryView(viewsets.ViewSet):
    def list(self,request):
        query = Category.objects.all().order_by("-id")
        serializer = CatagorySerializer(query,many=True)
        return Response(serializer.data)

    def retrieve(self,request,pk=None):
        query = Category.objects.get(id=pk)
        serializers = CatagorySerializer(query)
        serializers_data = serializers.data
        all_data = []
        category_products = Product.objects.filter(category_id=serializers_data['id'])
        category_products_serializer = ProductsSerializer(category_products,many=True)
        serializers_data['category_products'] = category_products_serializer.data
        all_data.append(serializers_data)
        return Response(all_data)


class ProfileView(views.APIView):
    authentication_classes=[TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]
    def get(self,request):
        try:
            query = Profile.objects.get(prouser=request.user)
            serializers = ProfileSerializer(query)
            response_msg = {"error":False,"data":serializers.data}
        except:
            response_msg = {"error":True,"message":"Somthing is Wrong!"}
        return Response(response_msg)

class Updateuser(views.APIView):
    permission_classes=[IsAuthenticated, ]
    authentication_classes=[TokenAuthentication, ]
    def post(self,request):
        try:
            user = request.user
            data = request.data
            user_obj = User.objects.get(username=user)
            user_obj.first_name = data["first_name"]
            user_obj.last_name = data["last_name"]
            user_obj.email = data["email"]
            user_obj.save()
            response_msg = {"error":False,"message":"User Data is Updated"}
        except:
            response_msg = {"error":True,"message":"User Data is not Updated! Try again !"}
        return Response(response_msg)

class Updateprofile(views.APIView):
    permission_classes=[IsAuthenticated, ]
    authentication_classes=[TokenAuthentication, ]
    def post(self,request):
        try:
            user = request.user
            query = Profile.objects.get(prouser=user)
            data = request.data
            serializers = ProfileSerializer(query,data=data,context={"request":request})
            serializers.is_valid(raise_exception=True)
            serializers.save()
            return_res = {"message":"Profile is Updated"}
        except:
            return_res = {"message":"Profile is not Updated! Try again!"}
        return Response(return_res)


class MyCart(viewsets.ViewSet):
    authentication_classes=[TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]
    
    def list(self,request):
        query = Cart.objects.filter(customer=request.user.profile)
        serializers = CartSerializer(query,many=True)
        all_data=[]
        for cart in serializers.data:
            cart_product = CartProduct.objects.filter(cart=cart["id"])
            cart_product_serializer = CartProductSerializer(cart_product,many=True)
            cart["cartproduct"] = cart_product_serializer.data
            all_data.append(cart)
        return Response(all_data)

class OldOrders(viewsets.ViewSet):
    authentication_classes=[TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def list(self,request):
        query = Order.objects.filter(cart__customer = request.user.profile)
        serializers = OrderSerializer(query,many=True)
        all_data = []
        for order in serializers.data:
            cart_product = CartProduct.objects.filter(cart_id=order['cart']['id'])
            cart_product_serializer = CartProductSerializer(cart_product,many=True)
            order['cartproduct'] = cart_product_serializer.data
            all_data.append(order)
        return Response(all_data)
    def retrieve(self,request,pk=None):
        try:
            queryset = Order.objects.get(id=pk)
            serializers = OrderSerializer(queryset)
            data = serializers.data
            all_date=[]
            cartproduct = CartProduct.objects.filter(cart_id=data['cart']['id'])
            cartproduct_serializer = CartProductSerializer(cartproduct,many=True)
            data['cartproduct'] = cartproduct_serializer.data
            all_date.append(data)
            response_msg = {"error":False,"data":all_date}
        except:
            response_msg = {"error":True,"message":"No data Found for This id"}

        return Response(response_msg)

    def destroy(self,request,pk=None):
        try:
            order_obj=Order.objects.get(id=pk)
            cart_obj = Cart.objects.get(id=order_obj.cart.id)
            order_obj.delete()
            cart_obj.delete()
            response_msg = {"erroe":False,"message":"Order delated","order id":pk}
        except:
            response_msg = {"erroe":True,"message":"Order Not Found"}
        return Response(response_msg)

    def create(self,request):
        try:
            cart_id = request.data["cartId"]
            address = request.data["address"]
            mobile = request.data["mobile"]
            email = request.data["email"]
            cart_obj = Cart.objects.get(id=cart_id)
            cart_obj.complit=True
            cart_obj.save()
            created_order = Order.objects.create(
                cart=cart_obj,
                address=address,
                mobile=mobile,
                email=email,
                total=cart_obj.total,
                discount=3,
                # order_status="Order Received"
            )
            response_msg = {"error":"False", "message":"Your order is complit!"}
        except:
            response_msg = {"error":"True", "message":"Something went wrong!"}
        return Response(response_msg)


class RegisterView(views.APIView):
    def post(self,request):
        serializers =UserSerializer(data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response({"error":False,"message":f"user is created for '{serializers.data['username']}, Go to login!' ","data":serializers.data})
        return Response({"error":True,"message":"Something went wrong! Try gain!"})

class AddtoCart(views.APIView):
    permission_classes=[IsAuthenticated, ]
    authentication_classes=[TokenAuthentication, ]
    
    def post(self,request):
        product_id = request.data['id']
        product_obj = Product.objects.get(id=product_id)
        print(product_obj,"product_obj")        
        cart_cart = Cart.objects.filter(customer=request.user.profile).filter(complit=False).first()
        cart_product_obj = CartProduct.objects.filter(product__id=product_id).first()
        
        try:
            if cart_cart:
                # print(cart_cart)
                # print("OLD CART")
                this_product_in_cart = cart_cart.cartproduct_set .filter(product=product_obj)
                if this_product_in_cart.exists():
                    # print("OLD CART PRODUCT--OLD CART")
                    cartprod_uct = CartProduct.objects.filter(product=product_obj).filter(cart__complit=False).first()
                    cartprod_uct.quantity +=1
                    cartprod_uct.subtotal +=product_obj.selling_price
                    cartprod_uct.save()
                    cart_cart.total +=product_obj.selling_price
                    cart_cart.save()
                else:
                    # print("NEW CART PRODUCT CREATED--OLD CART")
                    cart_product_new=CartProduct.objects.create(
                        cart = cart_cart,
                        price  =product_obj.selling_price,
                        quantity = 1,
                        subtotal = product_obj.selling_price
                    )
                    cart_product_new.product.add(product_obj)
                    cart_cart.total +=product_obj.selling_price
                    cart_cart.save()
            else:
                print(cart_cart)
                print("NEW CART CREATED")
                Cart.objects.create(customer=request.user.profile,total=0,complit=False)
                new_cart = Cart.objects.filter(customer=request.user.profile).filter(complit=False).first()
                cart_product_new=CartProduct.objects.create(
                        cart = new_cart,
                        price  =product_obj.selling_price,
                        quantity = 1,
                        subtotal = product_obj.selling_price
                    )
                cart_product_new.product.add(product_obj)
                # print("NEW CART PRODUCT CREATED")    
                new_cart.total +=product_obj.selling_price
                new_cart.save()

            response_msg = {'error':False,'message':"Product add to card successfully","productid":product_id}
        
        except:
            response_msg = {'error':True,'message':"Product  is Not added to Cart! Try again!"}

        return Response(response_msg)

class Updatecart(views.APIView):
    permission_classes=[IsAuthenticated, ]
    authentication_classes=[TokenAuthentication, ]
    def post(self,request):
        cart_product = CartProduct.objects.get(id=request.data["id"])
        cart_obj = cart_product.cart

        cart_product.quantity +=1
        cart_product.subtotal += cart_product.price
        cart_product.save()

        cart_obj.total += cart_product.price
        cart_obj.save()
        return Response({"message":"CartProduct is updated","product":request.data['id']})

class Editcart(views.APIView):
    permission_classes=[IsAuthenticated, ]
    authentication_classes=[TokenAuthentication, ]
    def post(self,request):
        cart_product = CartProduct.objects.get(id=request.data["id"])
        cart_obj = cart_product.cart

        cart_product.quantity -=1
        cart_product.subtotal -= cart_product.price
        cart_product.save()

        cart_obj.total -=cart_product.price
        cart_obj.save()
        if(cart_product.quantity==0):
            cart_product.delete()   
        return Response({"message":"CartProduct is edited.","product":request.data['id']})



class Deletecartproduct(views.APIView):
    permission_classes=[IsAuthenticated, ]
    authentication_classes=[TokenAuthentication, ]
    def post(self,request):
        cart_product = CartProduct.objects.get(id=request.data['id'])
        cart_product.delete() 
        return Response({"message":"CartProduct Delated","product":request.data['id']})

class Deletecart(views.APIView):
    permission_classes=[IsAuthenticated, ]
    authentication_classes=[TokenAuthentication, ]
    def post(self,request):
        try:
            cart_obj = Cart.objects.get(id=request.data['id'])
            cart_obj.delete()
            response_msg = {"message":"Cart Deleted"}
        except:
            response_msg = {"message":"Cart is not deleted!"}
        return Response(response_msg)

