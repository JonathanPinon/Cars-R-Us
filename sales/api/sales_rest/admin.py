from django.contrib import admin
from .models import AutomobileVO, Salesperson, Customer, Sale
# Register your models here.

@admin.register(AutomobileVO)
class AutomobileAdmin(admin.ModelAdmin):
    pass

@admin.register(Salesperson)
class SalespersomAdmin(admin.ModelAdmin):
    pass

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    pass

@admin.register(Sale)
class SaleAdmin(admin.ModelAdmin):
    pass