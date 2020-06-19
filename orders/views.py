from django.http import HttpResponse
from django.shortcuts import render

from .models import Topping

# Create your views here.
def index(request):

    context={
        "toppings":Topping.objects.all()
    }
    return render(request, "orders/index.html", context)
