from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from common.json import ModelEncoder
from .models import Salesperson, Customer, AutomobileVO, Sale
from django.http import JsonResponse
import json

class SalespersonListEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "first_name",
        "last_name",
        "employee_id",
        "id",
        
    ]

class CustomerListEncoder(ModelEncoder):
    model = Customer
    properties = [
        "first_name",
        "last_name",
        "address",
        "phone_number",
        "id",
    ]

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "sold",
    ]

class SaleListEncoder(ModelEncoder):
    model = Sale
    properties = [
        "price",
        "customer",
        "salesperson",
        "automobile",
        "id",
    ]

    encoders = {
        "customer": CustomerListEncoder(),
        "salesperson": SalespersonListEncoder(),
        "automobile": AutomobileVOEncoder(),
    }
    # def get_extra_data(self, o):
    #     return {
    #         "automobile": o.automobile.vin
    #             }

@require_http_methods(["POST", "GET"])
def salesperson_list(request):
    if request.method == "GET":
        salespeople = Salesperson.objects.all()
        return JsonResponse(
            {"salespeople": salespeople},
            encoder=SalespersonListEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            salesperson = Salesperson.objects.create(**content)
            return JsonResponse(
                salesperson,
                encoder=SalespersonListEncoder,
                safe=False,
            )
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Salesperson Information"},
                status=400,
            )
        
@require_http_methods(["GET", "POST"])
def customer_list(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerListEncoder
        )
    else:
        content = json.loads(request.body)
        try:
            customer = Customer.objects.create(**content)
            return JsonResponse(
                customer,
                encoder=CustomerListEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Customer Information"},
                status=400,
            )

@require_http_methods(["GET", "POST"])
def sale_list(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse (
            {"sales": sales},
            encoder=SaleListEncoder
        )
    else:
        content = json.loads(request.body)
        try:
            automobile_vin = content["automobile"]
            automobile = AutomobileVO.objects.get(vin=automobile_vin)
            content["automobile"] = automobile

            salesperson_id = content["salesperson"]
            salesperson = Salesperson.objects.get(employee_id=salesperson_id)
            content["salesperson"] = salesperson

            customer_id = content["customer"]
            customer = Customer.objects.get(id=customer_id)
            content["customer"] = customer

            automobile.sold = True
            automobile.save()
            
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Automobile Vin"},
                status=400,
            )
        sale = Sale.objects.create(**content)
        
        return JsonResponse(
            sale,
            encoder=SaleListEncoder,
            safe=False,
        )
    

@require_http_methods(["DELETE"])
def salesperson_delete(request, id):
    if request.method == "DELETE":
        try:
            salesperson = Salesperson.objects.get(id=id)
            salesperson.delete()
            return JsonResponse (
                salesperson,
                encoder=SalespersonListEncoder,
                safe=False
            )
        except Salesperson.DoesNotExist:
            response = JsonResponse(
                {"message": "This Salesperson Does Not Exist"},
                status=400,
                )
            return response

@require_http_methods(["DELETE"])
def customer_delete(request, id):
    if request.method == "DELETE":
        try:
            customer = Customer.objects.get(id=id)
            customer.delete()
            return JsonResponse (
                customer,
                encoder=CustomerListEncoder,
                safe=False
            )
        except Customer.DoesNotExist:
            response = JsonResponse(
                {"message": "This Customer Does Not Exist"},
                status=400,
                )
            return response

@require_http_methods(["DELETE"])
def sale_delete(request, id):
    if request.method == "DELETE":
        try:
            sale = Sale.objects.get(id=id)
            sale.delete()
            return JsonResponse (
                sale,
                encoder=SaleListEncoder,
                safe=False
            )
        except Sale.DoesNotExist:
            response = JsonResponse(
                {"message": "This Sale Does Not Exist"},
                status=400,
                )
            return response
